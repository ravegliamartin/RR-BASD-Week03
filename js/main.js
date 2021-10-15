// const main = () => {
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
const validateAll = () => fullNameValidator(fullName.value) && mailValidator(mail.value) &&
  passValidator(pass.value) && repeatPassValidator(repeatPass.value) && ageValidator(age.value) &&
  phoneValidator(phone.value) && addressValidator(address.value) && cityValidator(city.value) &&
  zipValidator(zip.value) && idValidator(id.value)



// ############ Elements Manipulation ############

// Blur
const elBlurManipulation = (e, validator, validatorMsg) => {
  const elMsg = e.target.parentElement.nextElementSibling
  const el = e.target
  elMsg.classList.add('warning')
  el.classList.add('warning-border')
  if (validator(el.value)) {
    elMsg.classList.add('succeed')
    elMsg.textContent = 'Correct Input'
    el.classList.add('succeed-border')
  } else {
    elMsg.classList.remove('succeed')
    elMsg.textContent = validatorMsg
    el.classList.remove('succeed-border')
  }
}

// Focus
const elFocusManipulation = e => e.target.parentElement.nextElementSibling.textContent = ''

// ############ Event Listeners ############

//  Blur Event Listeners
fullName.addEventListener('blur', (e) => elBlurManipulation(e, fullNameValidator, 'At least 6 letters and space in between'))
mail.addEventListener('blur', (e) => elBlurManipulation(e, mailValidator, 'Should be a valid email address'))
pass.addEventListener('blur', (e) => elBlurManipulation(e, passValidator, 'At least 8 alphanumeric characters'))
repeatPass.addEventListener('blur', (e) => elBlurManipulation(e, repeatPassValidator, 'Shoul be the same as password'))
age.addEventListener('blur', (e) => elBlurManipulation(e, ageValidator, 'Should be over 18'))
phone.addEventListener('blur', (e) => elBlurManipulation(e, phoneValidator, 'At least 7 digits'))
address.addEventListener('blur', (e) => elBlurManipulation(e, addressValidator, 'At least 5 letters and space in between'))
city.addEventListener('blur', (e) => elBlurManipulation(e, cityValidator, 'At least 3 letters'))
zip.addEventListener('blur', (e) => elBlurManipulation(e, zipValidator, 'At least 3 letters'))
id.addEventListener('blur', (e) => elBlurManipulation(e, idValidator, '7 or 8 digits'))

// Focus Event Listeners
fullName.addEventListener('focus', (e) => elFocusManipulation(e))
mail.addEventListener('focus', (e) => elFocusManipulation(e))
pass.addEventListener('focus', (e) => elFocusManipulation(e))
repeatPass.addEventListener('focus', (e) => elFocusManipulation(e))
age.addEventListener('focus', (e) => elFocusManipulation(e))
phone.addEventListener('focus', (e) => elFocusManipulation(e))
address.addEventListener('focus', (e) => elFocusManipulation(e))
city.addEventListener('focus', (e) => elFocusManipulation(e))
zip.addEventListener('focus', (e) => elFocusManipulation(e))
id.addEventListener('focus', (e) => elFocusManipulation(e))

// Submit Event Listener
submit.addEventListener('click', (e) => {
  e.preventDefault()
  let alertString = ''
  allMsg.forEach(el => {
    const label = el.previousElementSibling.children[0].textContent
    const input = el.previousElementSibling.children[1].value
    alertString += `${label} ${input}${el.textContent === 'Correct Input' ?'':` | ${el.textContent}`}\n`
  })
  alert(alertString)
})

// ############ BONUS ############
const formTitle = document.querySelector('form h2.form-title')
fullName.addEventListener('keyup', () => formTitle.textContent = `Hola ${fullName.value}`)
fullName.addEventListener('focus', () => formTitle.textContent = `Hola ${fullName.value}`)
// }

// window.addEventListener('load', main)
