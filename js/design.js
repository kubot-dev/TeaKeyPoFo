// design js
const design = document.querySelector('.design')
const tabs = document.querySelector('.design__tabs').children
const tabsArray = Array.from(tabs)
const tabContent = Array.from(document.querySelectorAll('.tab-content'))

tabsArray.forEach((tab) => {
  tab.addEventListener('click', (event) => {
    const target = tab.dataset.tab
    const targetContent = design.querySelectorAll(`[data-tab=${target}]`)[1]

    tabsArray.forEach((t) => {
      t.classList.remove('is-selected')
    })
    tab.classList.add('is-selected')

    tabContent.forEach((c) => {
      c.classList.remove('is-selected')
    })
    targetContent.classList.add('is-selected')
  })
})
