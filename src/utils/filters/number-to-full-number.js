import snakeCase from 'lodash/snakeCase'

const numberToFullNumber = (value) => {
  value = value || 0
  value = value.toString()
  let teste = value.toString().match(/\d{1,3}(?=(\d{3})*$)/g)
  var qualifica = [
    '',
    'mil',
    'milh',
    'bilh',
    'trilh',
    'quadrilh',
    'quintilh',
    'sextilh',
    'setilh',
    'octilh',
    'nonilh',
    'decilh',
    'undecilh',
    'dodecilh',
    'tredecilh',
    'quatrodecilh',
    'quindecilh',
    'sedecilh',
    'septendecilh',
    'octencilh',
    'nonencilh',
  ]
  console.log(teste.length, teste[0])
  if (teste.length === 1) {
    return value
  } else if (teste.length === 2) {
    return `${teste[0]} ${qualifica[teste.length - 1]}`
  } else {
    return teste[0] == 1
      ? `${teste[0]} ${qualifica[teste.length - 1]}ão`
      : `${teste[0]} ${qualifica[teste.length - 1]}ões`
  }
}

export default numberToFullNumber
