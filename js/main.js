const main = () => {
  const fullName = document.querySelector('#fname')
  const fullNameMsg = document.querySelector('#fname-msg')
  const mail = document.querySelector('#mail')
  const mailMsg = document.querySelector('#mail-msg')
  const pass = document.querySelector('#pass')
  const passMsg = document.querySelector('#pass-msg')
  const repeatPass = document.querySelector('#repeat-pass')
  const repeatPassMsg = document.querySelector('#repeat-pass-msg')
  const age = document.querySelector('#age')
  const ageMsg = document.querySelector('#age-msg')
  const phone = document.querySelector('#phone')
  const phoneMsg = document.querySelector('#phone-msg')
  const address = document.querySelector('#address')
  const addressMsg = document.querySelector('#address-msg')
  const city = document.querySelector('#city')
  const cityMsg = document.querySelector('#city-msg')
  const zip = document.querySelector('#zip')
  const zipMsg = document.querySelector('#zip-msg')
  const id = document.querySelector('#id')
  const idMsg = document.querySelector('#id-msg')

  const alphanumericRegEx = /^[a-z0-9]+s$/i
  const numericRegEx = /^\d+$/

  const fullNameValidator = (fullNameContent) => /^[a-z]+ [a-z]+$/i.test(fullNameContent) && fullNameContent.length > 7
  const mailValidator = (mailContent) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailContent)
  const passValidator = (passContent) => alphanumericRegEx.test(passContent) && passContent.length > 8
  const repeatPassValidator = (repeatPassContent, passContent) => passContent === repeatPassContent
  const ageValidator = (ageContent) => numericRegEx.test(ageContent) && Number(ageContent) > 18
  const phoneValidator = (phoneContent) => numericRegEx.test(phoneContent) && phoneContent.length > 7
  const addressValidator = (addressContent) => /^[a-z0-9]+ [a-z0-9]+$/i.test(addressContent) && /\d+$/.test(addressContent) && /[a-z]+$/i.test(addressContent) && addressContent.length > 5
  const cityValidator = (cityContent) => cityContent.length > 3
  const zipValidator = (zipContent) => zipContent.length > 3
  const IDValidator = (IDContent) => IDContent.length === 7 || IDContent.length === 8 && numericRegEx.test(IDContent)

}

window.addEventListener('load', main)
