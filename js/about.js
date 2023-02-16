//

const accordions = Array.from(document.querySelectorAll('.about__listItem'))
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

      accordionHeader.classList.toggle('rotated')
    }
    const accordion = accordionHeader.parentElement
    const height = getContentHeight(accordion)
    updateAccordion(accordion, height)
  }
})

window.addEventListener('load', (event) => {
  const accordionItem = Array.from(document.querySelectorAll('.about__listItem'))

  accordionItem.forEach((element) => {
    if (element.classList.contains('is-open')) {
      const getContentHeight = (accordion) => {
        const accordionInner = element.querySelector('.about__listItemText')
        if (accordion.classList.contains('is-open')) return 0
        return accordionInner.getBoundingClientRect().height
      }
      const updateAccordion = (accordion, height) => {
        const accordionContent = accordion.querySelector('.accordion__content')
        accordionContent.style.height = `${height}px`
      }
      const accordion = element.parentElement
      const height = getContentHeight(accordion)
      updateAccordion(element, height)

      const heading = element.querySelector('.about__listItemHeading')
      heading.classList.add('rotated')
    }
  })
})
