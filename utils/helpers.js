export const isLink = source => source.match(/(^http(s?):\/\/|www\.)/)

export const getRandomId = array => {
  const randomNum = Math.floor(Math.random() * array.length)
  return array[randomNum]._id
}

export const upper = string => string.toUpperCase()
export const lower = string => string.toLowerCase()

export const isEqualArray = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.every((el, index) => el === arr2[index])

export const createPageTitle = title => `${title} | Philipson Cookbook`

export const getImageMin = (imageData, key) =>
  Math.min(imageData[key] / imageData.divisor)
