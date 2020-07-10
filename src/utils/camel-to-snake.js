import snakeCase from 'lodash/snakeCase'

const camelToSnake = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelToSnake(v))
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakeCase(key)]: camelToSnake(obj[key]),
      }),
      {}
    )
  }
  return obj
}

export default camelToSnake
