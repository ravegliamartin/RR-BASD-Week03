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
const modalButton = document.querySelector('#modal-close-btn')

// Regex Declarations
const alphanumericRegEx = /^[a-z0-9]+$/i
const numericRegEx = /^\d+$/
const mailRegEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

// Validations
const fullNameValidator = (fullNameContent) => /^[a-z]+( +[a-z]+)+$/i.test(fullNameContent) && fullNameContent.length > 6
const mailValidator = (mailContent) => mailRegEx.test(mailContent)
const passValidator = (passContent) => alphanumericRegEx.test(passContent) && passContent.length > 7
const repeatPassValidator = (repeatPassContent) => pass.value === repeatPassContent
const ageValidator = (ageContent) => numericRegEx.test(ageContent) && Number(ageContent) > 17
const phoneValidator = (phoneContent) => numericRegEx.test(phoneContent) && phoneContent.length > 6
const addressValidator = (addressContent) => /^[a-z0-9]+ [a-z0-9]+$/i.test(addressContent) && /\d/.test(addressContent) && /[a-z]/i.test(addressContent) && addressContent.length > 4
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
  let alertString = ''
  allMsg.forEach(el => {
    el.previousElementSibling.children[1].dispatchEvent(new Event('blur'))
    const label = el.previousElementSibling.children[0].textContent
    const input = el.previousElementSibling.children[1].value
    alertString += `${label} ${input}${el.textContent === 'Correct Input' ?'':` | ${el.textContent}`}\n`
    allValidationsOk = allValidationsOk && el.textContent === 'Correct Input'
  })
  if (allValidationsOk) {
    alertString += '\nValidation Succesful!'
    postForm()
  } else {
    alertString += '\nValidation Unsuccesful!'
  }
  // alert(alertString)
  modal.showModal()
})

// ############ BONUS ############
const formTitle = document.querySelector('form h2.form-title')
fullName.addEventListener('keydown', () => setTimeout(() => formTitle.textContent = `Hola ${fullName.value}`, 0))
fullName.addEventListener('focus', () => formTitle.textContent = `Hola ${fullName.value}`)

// ############ Fetch Form Data (GET) ############
const FetchGetURL = new URL('http://curso-dev-2021.herokuapp.com/newsletter')

const getForm = async (keysObj) => {
  try {
    Object.entries(keysObj).forEach((key) => FetchGetURL.searchParams.set(key[0], key[1]))
    const res = await fetch(FetchGetURL)
    const data = await res.json()
    modal.textContent = data
    modal.showModal()
  } catch (err) {
    modal.textContent = err
    modal.showModal()
  }
}

// ############ Modal Close Button ############
modalButton.addEventListener('click', () => modal.close())
