import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { HorizontalBlurShader } from 'three/addons/shaders/HorizontalBlurShader.js';
import { VerticalBlurShader } from 'three/addons/shaders/VerticalBlurShader.js';

// Canvas
const canvas = document.querySelector('.hero__logo');
let canvasWidth = canvas.clientWidth;
let canvasHeight = canvas.clientHeight;

let camera, scene, renderer, stats, gui, controls;

let model, rotationGroup;

let shadowGroup, renderTarget, renderTargetBlur, shadowCamera, cameraHelper, depthMaterial, horizontalBlurMaterial, verticalBlurMaterial;

let plane, blurPlane, fillPlane;

const state = {
  shadow: {
    blur: 5,
    darkness: 5,
    opacity: 1,
  },
  plane: {
    color: '#ffffff',
    opacity: 0,
  },
  showWireframe: false,
};

init();
animate();

function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1f1f1f);

  camera = new THREE.PerspectiveCamera(50, canvasWidth / canvasHeight, 0.1, 1000);
  camera.position.z = 6;
  camera.position.x = 1;
  camera.position.y = 1;

  //debug stats
  // stats = new Stats();
  // document.body.appendChild(stats.dom);

  window.addEventListener('resize', onWindowResize);

  // Model
  const loader = new GLTFLoader();
  loader.load('assets/t-logo.gltf', function (gltf) {
    model = gltf.scene;
    model.rotation.x = Math.PI / 2;
    model.position.z = -0.1;
    model.position.y = 0;
    rotationGroup = new THREE.Group();
    rotationGroup.add(model);

    // const normalMaterial = new THREE.MeshNormalMaterial();
    const standardlMaterial = new THREE.MeshStandardMaterial({ emissive: 0xf1f1f1 });

    model.traverse((child) => {
      child.material = standardlMaterial;

      child.scale.x = 1.5;
      child.scale.y = 1.5;
      child.scale.z = 1.5;

      child.castShadow = true;
    });

    scene.add(rotationGroup);
  });

  // group to easily handle shadow plane
  shadowGroup = new THREE.Group();
  shadowGroup.position.y = -2.35;
  scene.add(shadowGroup);

  // render target to show the shadows on the plane
  renderTarget = new THREE.WebGLRenderTarget(512, 512);
  renderTarget.texture.generateMipmaps = false;

  // render target to blur the shadows
  renderTargetBlur = new THREE.WebGLRenderTarget(512, 512);
  renderTargetBlur.texture.generateMipmaps = false;

  // plane which will hold shadows
  const planeGeometry = new THREE.PlaneGeometry(5, 5).rotateX(Math.PI / 2);
  const planeMaterial = new THREE.MeshBasicMaterial({
    map: renderTarget.texture,
    opacity: state.shadow.opacity,
    transparent: true,
    depthWrite: false,
  });
  plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // make sure it's rendered after the fillPlane
  plane.renderOrder = 1;
  shadowGroup.add(plane);

  // the y from the texture is flipped!
  plane.scale.y = -1;

  // blur plane
  blurPlane = new THREE.Mesh(planeGeometry);
  blurPlane.visible = false;
  shadowGroup.add(blurPlane);

  // ground plane which can be any color
  const fillPlaneMaterial = new THREE.MeshBasicMaterial({
    color: state.plane.color,
    opacity: state.plane.opacity,
    transparent: true,
    depthWrite: false,
  });
  fillPlane = new THREE.Mesh(planeGeometry, fillPlaneMaterial);
  fillPlane.rotateX(Math.PI);
  shadowGroup.add(fillPlane);

  // camera to render depth material from
  shadowCamera = new THREE.OrthographicCamera(-5 / 2, 5 / 2, 5 / 2, -5 / 2, 0, 0.3);
  shadowCamera.rotation.x = Math.PI / 2; // get the camera to look up
  shadowGroup.add(shadowCamera);

  cameraHelper = new THREE.CameraHelper(shadowCamera);

  // depthMaterial, from black to transparent
  depthMaterial = new THREE.MeshDepthMaterial();
  depthMaterial.userData.darkness = { value: state.shadow.darkness };
  depthMaterial.onBeforeCompile = function (shader) {
    shader.uniforms.darkness = depthMaterial.userData.darkness;
    shader.fragmentShader = /* glsl */ `
      uniform float darkness;
      ${shader.fragmentShader.replace(
        'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );',
        'gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * darkness );',
      )}
    `;
  };

  depthMaterial.depthTest = false;
  depthMaterial.depthWrite = false;

  horizontalBlurMaterial = new THREE.ShaderMaterial(HorizontalBlurShader);
  horizontalBlurMaterial.depthTest = false;

  verticalBlurMaterial = new THREE.ShaderMaterial(VerticalBlurShader);
  verticalBlurMaterial.depthTest = false;

  // debug gui

  // gui = new GUI();
  // const shadowFolder = gui.addFolder('shadow');
  // shadowFolder.open();
  // const planeFolder = gui.addFolder('plane');
  // planeFolder.open();

  // shadowFolder.add(state.shadow, 'blur', 0, 15, 0.1);
  // shadowFolder.add(state.shadow, 'darkness', 1, 5, 0.1).onChange(function () {
  //   depthMaterial.userData.darkness.value = state.shadow.darkness;
  // });
  // shadowFolder.add(state.shadow, 'opacity', 0, 1, 0.01).onChange(function () {
  //   plane.material.opacity = state.shadow.opacity;
  // });
  // planeFolder.addColor(state.plane, 'color').onChange(function () {
  //   fillPlane.material.color = new THREE.Color(state.plane.color);
  // });
  // planeFolder.add(state.plane, 'opacity', 0, 1, 0.01).onChange(function () {
  //   fillPlane.material.opacity = state.plane.opacity;
  // });

  // gui.add(state, 'showWireframe', true).onChange(function () {
  //   if (state.showWireframe) {
  //     scene.add(cameraHelper);
  //   } else {
  //     scene.remove(cameraHelper);
  //   }
  // });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasWidth, canvasHeight);
  renderer.useLegacyLights = false;
  canvas.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 3;
  controls.maxDistance = 10;
}

function onWindowResize() {
  canvasWidth = canvas.clientWidth;
  canvasHeight = canvas.clientHeight;

  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(canvasWidth, canvasHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function blurShadow(amount) {
  blurPlane.visible = true;

  // blur horizontally and draw in the renderTargetBlur
  blurPlane.material = horizontalBlurMaterial;
  blurPlane.material.uniforms.tDiffuse.value = renderTarget.texture;
  horizontalBlurMaterial.uniforms.h.value = (amount * 1) / 256;

  renderer.setRenderTarget(renderTargetBlur);
  renderer.render(blurPlane, shadowCamera);

  // blur vertically and draw in the main renderTarget
  blurPlane.material = verticalBlurMaterial;
  blurPlane.material.uniforms.tDiffuse.value = renderTargetBlur.texture;
  verticalBlurMaterial.uniforms.v.value = (amount * 1) / 256;

  renderer.setRenderTarget(renderTarget);
  renderer.render(blurPlane, shadowCamera);

  blurPlane.visible = false;
}

// animate

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  setTimeout(() => {
    rotationGroup.children[0].children[1].rotation.z += 0.001;
    rotationGroup.children[0].children[0].rotation.z += 0.005;
  }, 250);

  // remove the background
  const initialBackground = scene.background;
  scene.background = null;

  // force the depthMaterial to everything
  cameraHelper.visible = false;
  scene.overrideMaterial = depthMaterial;

  // set renderer clear alpha
  const initialClearAlpha = renderer.getClearAlpha();
  renderer.setClearAlpha(0);

  // render to the render target to get the depths
  renderer.setRenderTarget(renderTarget);
  renderer.render(scene, shadowCamera);

  // and reset the override material
  scene.overrideMaterial = null;
  cameraHelper.visible = true;

  blurShadow(state.shadow.blur);

  // a second pass to reduce the artifacts
  // (0.4 is the minimum blur amout so that the artifacts are gone)
  blurShadow(state.shadow.blur * 0.4);

  // reset and render the normal scene
  renderer.setRenderTarget(null);
  renderer.setClearAlpha(initialClearAlpha);
  scene.background = initialBackground;

  renderer.render(scene, camera);

  // debug stats
  // stats.update();
}
