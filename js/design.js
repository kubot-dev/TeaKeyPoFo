// design js
const design = document.querySelector('.design');
const tabs = document.querySelector('.design__tabs').children;
const tabsArray = Array.from(tabs);
const tabContent = Array.from(document.querySelectorAll('.tab-content'));

tabsArray.forEach((tab) => {
  tab.addEventListener('click', (event) => {
    const target = tab.dataset.tab;
    const targetContent = design.querySelectorAll(`[data-tab=${target}]`)[1];

    tabsArray.forEach((t) => {
      t.classList.remove('is-selected');
    });
    tab.classList.add('is-selected');

    tabContent.forEach((c) => {
      c.classList.remove('is-selected');
    });
    targetContent.classList.add('is-selected');
  });
});

const modalOverlay = Array.from(document.querySelectorAll('.modal-overlay'));
// const lpr1 = document.querySelector('.lpr1')
// const lpr2 = document.querySelector('.lpr2')
// const lpr3 = document.querySelector('.lpr3')
const fd1 = document.querySelector('.fd1');
const fd2 = document.querySelector('.fd2');
const fd3 = document.querySelector('.fd3');
// const bp1 = document.querySelector('.bp1')
// const bp2 = document.querySelector('.bp2')
// const bp3 = document.querySelector('.bp3')

// lpr1.addEventListener('click', (event) => {
//   lpr1.classList.add('modal-is-open')
// })

// modalOverlay[0].addEventListener('click', (event) => {
//   event.stopPropagation()
//   if (event.target.parentElement.classList.contains('designProject')) {
//     lpr1.classList.remove('modal-is-open')
//   }
// })

// lpr2.addEventListener('click', (event) => {
//   lpr2.classList.add('modal-is-open')
// })

// modalOverlay[1].addEventListener('click', (event) => {
//   event.stopPropagation()
//   if (event.target.parentElement.classList.contains('designProject')) {
//     lpr2.classList.remove('modal-is-open')
//   }
// })

// lpr3.addEventListener('click', (event) => {
//   lpr3.classList.add('modal-is-open')
// })

// modalOverlay[2].addEventListener('click', (event) => {
//   event.stopPropagation()
//   if (event.target.parentElement.classList.contains('designProject')) {
//     lpr3.classList.remove('modal-is-open')
//   }
// })

fd1.addEventListener('click', (event) => {
  fd1.classList.add('modal-is-open');
});

modalOverlay[0].addEventListener('click', (event) => {
  event.stopPropagation();
  if (event.target.parentElement.classList.contains('designProject')) {
    fd1.classList.remove('modal-is-open');
  }
});

fd2.addEventListener('click', (event) => {
  fd2.classList.add('modal-is-open');
});

modalOverlay[1].addEventListener('click', (event) => {
  event.stopPropagation();
  if (event.target.parentElement.classList.contains('designProject')) {
    fd2.classList.remove('modal-is-open');
  }
});

// fd3.addEventListener('click', (event) => {
//   fd3.classList.add('modal-is-open');
// });

// modalOverlay[2].addEventListener('click', (event) => {
//   event.stopPropagation();
//   if (event.target.parentElement.classList.contains('designProject')) {
//     fd3.classList.remove('modal-is-open');
//   }
// });

// bp1.addEventListener('click', (event) => {
//   bp1.classList.add('modal-is-open');
// });

// modalOverlay[6].addEventListener('click', (event) => {
//   event.stopPropagation();
//   if (event.target.parentElement.classList.contains('designProject')) {
//     bp1.classList.remove('modal-is-open');
//   }
// });

// bp2.addEventListener('click', (event) => {
//   bp2.classList.add('modal-is-open');
// });

// modalOverlay[7].addEventListener('click', (event) => {
//   event.stopPropagation();
//   if (event.target.parentElement.classList.contains('designProject')) {
//     bp2.classList.remove('modal-is-open');
//   }
// });

// bp3.addEventListener('click', (event) => {
//   bp3.classList.add('modal-is-open');
// });

// modalOverlay[8].addEventListener('click', (event) => {
//   event.stopPropagation();
//   if (event.target.parentElement.classList.contains('designProject')) {
//     bp3.classList.remove('modal-is-open');
//   }
// });

document.body.addEventListener('keydown', (event) => {
  if (event.keyCode === 27) {
    fd1.classList.remove('modal-is-open');
  }
});

document.body.addEventListener('keydown', (event) => {
  if (event.keyCode === 27) {
    fd2.classList.remove('modal-is-open');
  }
});

document.body.addEventListener('keydown', (event) => {
  if (event.keyCode === 27) {
    fd3.classList.remove('modal-is-open');
  }
});

// Cocoen.create(document.querySelector('.cocoen'))

Cocoen.parse(document.body);
