//
// Logo responsive aligment

const navbar = document.querySelectorAll('.navbar')
const navbar_logo = document.querySelectorAll('.navbar__logo')

function detectWrap(node) {
  for (const navbar of node) {
    for (const child of navbar.children) {
      if (child.offsetTop > navbar.offsetTop) {
        navbar_logo[0].classList.add('navbar__logo--align')
      } else {
        navbar_logo[0].classList.remove('navbar__logo--align')
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', (e) => {
  detectWrap(navbar)
})

window.addEventListener('resize', (e) => {
  detectWrap(navbar)
})
