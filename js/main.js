// Elements Selectors
const fullName = document.querySelector('#fname')
const mail = document.querySelector('#mail')
const pass = document.querySelector('#pass')
const repeatPass = document.querySelector('#repeat-pass')
const age = document.querySelector('#age')
const phone = document.querySelector('#phone')
const address = document.querySelector('#address')
const city = document.querySelector('#city')
const zip = document.querySelector('#zip')
const id = document.querySelector('#id')
const submit = document.querySelector('#submit-btn')
const allMsg = document.querySelectorAll('.msg')
const modal = document.querySelector('#modal')
const modalLabel = document.querySelector('#modal-label')
const modalContent = document.querySelector('#modal-content')
const modalButton = document.querySelector('#modal-close-btn')
const nameKey = document.querySelector('#name-key')
const mailKey = document.querySelector('#mail-key')
const subscriptionExpectedContainer = document.querySelector('.subs-expected-state')
const subscriptionExpectedLabel = document.querySelector('#subs-expected-label')

// Aux Variables
let fieldValueKeys = {}
let nameMailKeys = ['name', 'email']

// Regex Declarations
const alphanumericRegEx = /^[a-z0-9]+$/i
const numericRegEx = /^\d+$/
const mailRegEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

// Validations
const fullNameValidator = (fullNameContent) => /^[a-záéíóúñ]+( +[a-záéíóúñ]+)+$/i.test(fullNameContent) && fullNameContent.replace(/\s+/g, '').length > 5
const mailValidator = (mailContent) => mailRegEx.test(mailContent)
const passValidator = (passContent) => alphanumericRegEx.test(passContent) && passContent.length > 7
const repeatPassValidator = (repeatPassContent) => pass.value === repeatPassContent
const ageValidator = (ageContent) => numericRegEx.test(ageContent) && Number(ageContent) > 17
const phoneValidator = (phoneContent) => numericRegEx.test(phoneContent) && phoneContent.length > 6
const addressValidator = (addressContent) => /^[a-z0-9áéíóúñ]+( +[a-z0-9áéíóúñ]+)+$/i.test(addressContent) && /\d/.test(addressContent) && /[a-z]/i.test(addressContent) && addressContent.replace(/\s+/g, '').length > 4
const cityValidator = (cityContent) => cityContent.length > 2
const zipValidator = (zipContent) => zipContent.length > 2
const idValidator = (IDContent) => IDContent.length === 7 || IDContent.length === 8 && numericRegEx.test(IDContent)

// ############ Elements Manipulation ############

// Blur
const elBlurManipulation = (e, validator, validatorMsg) => {
  const elMsg = e.target.parentElement.nextElementSibling
  const el = e.target

  if (validator(el.value)) {
    el.classList.remove('warning-border')
    el.classList.add('succeed-border')
    elMsg.classList.remove('warning')
    elMsg.classList.add('succeed')
    elMsg.textContent = 'Correct Input'
  } else {
    el.classList.add('warning-border')
    el.classList.remove('succeed-border')
    elMsg.classList.add('warning')
    elMsg.classList.remove('succeed')
    elMsg.textContent = validatorMsg
  }
}

// Focus
const elFocusManipulation = e => e.target.parentElement.nextElementSibling.textContent = ''

// ############ Event Listeners ############

//  Blur Event Listeners
fullName.addEventListener('blur', (e) => elBlurManipulation(e, fullNameValidator, 'At least 6 letters and space in between'))
mail.addEventListener('blur', (e) => elBlurManipulation(e, mailValidator, 'Should be a valid email address'))
pass.addEventListener('blur', (e) => elBlurManipulation(e, passValidator, 'At least 8 alphanumeric characters'))
repeatPass.addEventListener('blur', (e) => elBlurManipulation(e, repeatPassValidator, 'Should be the same as password'))
age.addEventListener('blur', (e) => elBlurManipulation(e, ageValidator, 'Should be over 18'))
phone.addEventListener('blur', (e) => elBlurManipulation(e, phoneValidator, 'At least 7 digits'))
address.addEventListener('blur', (e) => elBlurManipulation(e, addressValidator, 'At least 5 letters and space in between'))
city.addEventListener('blur', (e) => elBlurManipulation(e, cityValidator, 'At least 3 letters'))
zip.addEventListener('blur', (e) => elBlurManipulation(e, zipValidator, 'At least 3 letters'))
id.addEventListener('blur', (e) => elBlurManipulation(e, idValidator, '7 or 8 digits'))

// Focus Event Listeners
fullName.addEventListener('focus', elFocusManipulation)
mail.addEventListener('focus', elFocusManipulation)
pass.addEventListener('focus', elFocusManipulation)
repeatPass.addEventListener('focus', elFocusManipulation)
age.addEventListener('focus', elFocusManipulation)
phone.addEventListener('focus', elFocusManipulation)
address.addEventListener('focus', elFocusManipulation)
city.addEventListener('focus', elFocusManipulation)
zip.addEventListener('focus', elFocusManipulation)
id.addEventListener('focus', elFocusManipulation)

// Submit Event Listener
submit.addEventListener('click', (e) => {
  e.preventDefault()
  let allValidationsOk = true
  let obj = {}
  allMsg.forEach(el => {
    el.previousElementSibling.children[1].dispatchEvent(new Event('blur'))
    const label = el.previousElementSibling.children[0].textContent.replace(':', '')
    const input = el.previousElementSibling.children[1].value
    obj[label] = `${input}${el.textContent === 'Correct Input' ?'':` | ${el.textContent}`}`
    allValidationsOk = allValidationsOk && el.textContent === 'Correct Input'
  })
  if (allValidationsOk) {
    fieldValueKeysGenerator()
    getForm(fieldValueKeys)
  } else {
    liGenerator(obj, modalContent)
    modalUnsuccessStyle('JS Validation Unsuccessful!')
    modal.showModal()
  }
})

// ############ BONUS Week05 ############
const formTitle = document.querySelector('form h2.form-title')
fullName.addEventListener('keydown', () => setTimeout(() => formTitle.textContent = `Hola ${fullName.value}`, 0))
fullName.addEventListener('focus', () => formTitle.textContent = `Hola ${fullName.value}`)

// ############ Decide Successful/Unsuccessfull Request ############
subscriptionExpectedContainer.title = 'With these checkboxes you can willingly provoke a valid or invalid request to the server, by actually changing the name and mail key sent in the query params.'
const subscriptionExpectedState = () => {
  if (nameKey.checked && mailKey.checked) {
    subscriptionExpectedLabel.textContent = 'Subscription should be Successful'
    subscriptionExpectedLabel.classList.add('succeed')
    subscriptionExpectedLabel.classList.remove('warning')
  } else {
    subscriptionExpectedLabel.textContent = 'Subscription should be Unsuccessful'
    subscriptionExpectedLabel.classList.remove('succeed')
    subscriptionExpectedLabel.classList.add('warning')
  }
}

nameKey.addEventListener('click', () => nameKey.checked ? nameMailKeys[0] = 'name' : nameMailKeys[0] = 'fullName')
nameKey.addEventListener('click', subscriptionExpectedState)
mailKey.addEventListener('click', () => mailKey.checked ? nameMailKeys[1] = 'email' : nameMailKeys[1] = 'mail')
mailKey.addEventListener('click', subscriptionExpectedState)
window.addEventListener('load', subscriptionExpectedState)

// ############ Fetch Form Data (GET) ############
const fieldValueKeysGenerator = () => {
  fieldValueKeys = {
    [nameMailKeys[0]]: fullName.value || ' ',
    [nameMailKeys[1]]: mail.value || ' ',
    pass: pass.value || ' ',
    repeatPass: repeatPass.value || ' ',
    age: age.value || ' ',
    phone: phone.value || ' ',
    address: address.value || ' ',
    city: city.value || ' ',
    zip: zip.value || ' ',
    id: id.value || ' ',
  }
}

/**
 * Creates the server URL and populates its query params with the key/value pairs of keysObj.
 * 
 * Calls the fetch method and handles the resolve/reject responses
 * @param {object} keysObj Each key/value pair of the object is going to be appended as a key/value query param of the URL.
 */
const getForm = (keysObj) => {
  const FetchGetURL = new URL('https://curso-dev-2021.herokuapp.com/newsletter')
  Object.entries(keysObj).forEach((key) => FetchGetURL.searchParams.set(key[0], key[1]))
  fetch(FetchGetURL)
    .then((res) => {
      if (res.status !== 200) {
        return res.text().then((err) => {
          throw new Error(err)
        })
      }
      return res.json()
    })
    .then((data) => {
      liGenerator(data, modalContent)
      modalSuccessStyle('Subscription Successful!')
      modal.showModal()
      toLocalStorage(data)
    })
    .catch((err) => {
      liGenerator(err.toString(), modalContent)
      modalUnsuccessStyle('Subscription Unsuccessful!')
      modal.showModal()
    })
}

// ############ Modal Manipulation ############
modalButton.addEventListener('click', () => modal.close())
modal.style.borderWidth = '2px'


/**
 * Empties parentEl.
 * 
 * Creates a li element for each key of textContent or just one if textContent is a string.
 * 
 * Populates each li created with the key value of textContent or with the textContent value if it is a string.
 * 
 * Appends each li to the parentEl.
 * @param {object|string} textContent Content of the li elements.
 * @param {Element} parentEl Parent Element in which the li elements are going to be appended.
 */
const liGenerator = (textContent, parentEl) => {
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild)
  }
  if (typeof textContent === 'string') {
    const li = document.createElement('li')
    li.textContent = textContent
    parentEl.appendChild(li)
  } else if (typeof textContent === 'object') {
    Object.entries(textContent).forEach(key => {
      const li = document.createElement('li')
      li.textContent = `${key[0]}: ${key[1]}`
      parentEl.appendChild(li)
    })
  } else {
    throw new Error('textContent should be either an object or a string.')
  }
}

const modalSuccessStyle = (labelContent) => {
  modalLabel.textContent = labelContent
  modalLabel.style.borderBottomColor = 'green'
  modalLabel.classList.add('succeed')
  modalLabel.classList.remove('warning')
  modal.classList.add('succeed-border')
  modal.classList.remove('warning-border')
}

const modalUnsuccessStyle = (labelContent) => {
  modalLabel.textContent = labelContent
  modalLabel.style.borderBottomColor = 'red'
  modalLabel.classList.add('warning')
  modalLabel.classList.remove('succeed')
  modal.classList.add('warning-border')
  modal.classList.remove('succeed-border')
}

// ############ LocalStorage Manipulation ############
const fieldValueKeysRetrievedMethod = {
  name: (value) => fullName.value = value,
  email: (value) => mail.value = value,
  pass: (value) => pass.value = value,
  repeatPass: (value) => repeatPass.value = value,
  age: (value) => age.value = value,
  phone: (value) => phone.value = value,
  address: (value) => address.value = value,
  city: (value) => city.value = value,
  zip: (value) => zip.value = value,
  id: (value) => id.value = value,
}

/**
 * Saves each key/value pair of the data object in Local Storage
 * @param {object} data Each key/value pair of the object is saved in Local Storage
 */
const toLocalStorage = (data) => Object.entries(data).forEach(key => localStorage.setItem(key[0], key[1]))

/**
 * Looks for a value stored in Local Storage which is named as the key of the object.
 * 
 * If it is found, the method set in the object is used to manipulate and load the value stored in Local Storage
 * @param {object} toInputsObj The value of each key should be a method to manipulate the key stored value in Local Storage
 */
const retrieveFromLocalStorage = (toInputsObj) => {
  Object.entries(toInputsObj)
    .forEach(toInput => localStorage.hasOwnProperty(toInput[0]) ?
      toInput[1](localStorage.getItem(toInput[0])) :
      toInput[1](''))
}

window.addEventListener('load', () => retrieveFromLocalStorage(fieldValueKeysRetrievedMethod))
window.addEventListener('load', () => formTitle.textContent = `Hola ${fullName.value}`)
