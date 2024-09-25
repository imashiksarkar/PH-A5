const accordionBtns = document.querySelectorAll('.accordion-btn')


const closeAll = () => {
  accordionBtns.forEach((accordionBtn) => {
    const currentElem = accordionBtn.nextElementSibling
    currentElem.classList.remove('p-4', 'h-auto')
    currentElem.classList.add('p-0', 'h-0')
  })
}

accordionBtns.forEach((accordionBtn) => {
  accordionBtn.addEventListener('click', (event) => {
    const currentElem = event.currentTarget.nextElementSibling

    // close all other accordion
    closeAll()

    // open current
    currentElem.classList.remove('p-0', 'h-0')
    currentElem.classList.add('p-4', 'h-auto')
  })
})
