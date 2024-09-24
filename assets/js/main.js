const ctaBtns = document.querySelector('.cta-btns .container')
const donationTab = document.getElementById('donation-tab')
const historyTab = document.getElementById('history-tab')
const availableBalanceElem = document.getElementById('available-balance')
const modalElem = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close')

const changeTab = (event) => {
  const clickedBtn = event.target
  const otherBtn =
    clickedBtn.nextElementSibling || clickedBtn.previousElementSibling

  otherBtn.classList.remove('bg-lime-300')
  otherBtn.classList.add('border-2', 'text-[#585858]')

  clickedBtn.classList.remove('border-2', 'text-[#585858]')
  clickedBtn.classList.add('bg-lime-300')

  const { name } = event.target
  if (name === 'donation') {
    donationTab.classList.remove('hidden')
    historyTab.classList.add('hidden')
  } else {
    historyTab.classList.remove('hidden')
    donationTab.classList.add('hidden')
  }
}
ctaBtns.addEventListener('click', changeTab)

const addToHistory = (donationAmount, title) => {
  const historyElements = historyTab.firstElementChild

  const newHistoryElement = document.createElement('div')
  newHistoryElement.classList.add('item', 'border-2', 'p-6', 'rounded-xl')
  newHistoryElement.innerHTML = `<h1 class="text-xl font-bold leading-8">${donationAmount} Taka is Donated for ${title}</h1>
            <p class="mt-3 text-[#585858] font-light leading-7">Date : ${new Date()}</p>`

  historyElements.prepend(newHistoryElement)
}

const openModal = () => {
  modalElem.show()
  modalElem.classList.add('flex')
  document.body.classList.add('overflow-hidden')
}
const closeModal = () => {
  modalElem.close()
  modalElem.classList.remove('flex')
  document.body.classList.remove('overflow-hidden')
}

donationTab.addEventListener('submit', (event) => {
  event.preventDefault()

  const currentContentElement = event.target.parentElement
  const availableBalance = parseInt(availableBalanceElem.innerText) || 0
  const currentItemAmountElem = currentContentElement.querySelector(
    '.badge .collected-amount'
  )
  const currentItemTitle =
    currentContentElement.querySelector('.item__title').innerText
  const currentItemAmount = parseInt(currentItemAmountElem.innerText) || 0

  const formData = new FormData(event.target)
  const donationAmount = parseInt(formData.get('donation-amount'))

  if (isNaN(donationAmount) || donationAmount > availableBalance)
    return window.alert('Enter valid amount!')

  const newBalance = availableBalance - donationAmount
  const newDonationAmount = currentItemAmount + donationAmount

  availableBalanceElem.innerText = newBalance
  currentItemAmountElem.innerText = newDonationAmount

  addToHistory(donationAmount, currentItemTitle)

  openModal()
})

window.addEventListener('keyup', (event) => {
  if (event.code === 'Escape') closeModal()
})

modalCloseBtn.addEventListener('click', closeModal)
