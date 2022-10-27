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

const scrollbarCustom = document.querySelector('.scrollbar')
const scrollbarCustomHeight = scrollbarCustom.getBoundingClientRect().height

const workContent = document.querySelector('.work__content')
const workContentHeight = workContent.scrollHeight

const ratio = function (scrollbarCustomHeight, workContentHeight) {
  const ratioValue = scrollbarCustomHeight / workContentHeight
  console.log(ratioValue)
  return ratioValue
}

ratio(scrollbarCustomHeight, workContentHeight)

const button = document.querySelector('.scrollbar__button')

workContent.addEventListener('scroll', (e) => {
  button.style.top = `${e.target.scrollTop}px`
})

// ziskat
// zistit pomer v akom budem pohybovat gulickou
// zistit drahu po ktorej sa mozem hybat
