//

const accordions = Array.from(document.querySelectorAll('.accordion'))
const accContainer = document.querySelector('.about__aboutList')

accContainer.addEventListener('click', (event) => {
  const accordionHeader = event.target.closest('.about__listItemHeading')

  if (!accordionHeader) return
  {
    const getContentHeight = (accordion) => {
      const accordionInner = accordion.querySelector('.about__listItemText')
      if (accordion.classList.contains('is-open')) return 0
      return accordionInner.getBoundingClientRect().height
    }
    const updateAccordion = (accordion, height) => {
      const accordionContent = accordion.querySelector('.accordion__content')

      accordion.classList.toggle('is-open')
      accordionContent.style.height = `${height}px`
    }
    const accordion = accordionHeader.parentElement
    const height = getContentHeight(accordion)
    updateAccordion(accordion, height)
  }
})
