export const isLink = source => source.match(/(^http(s?):\/\/|^www\.)/)

export const getRandomIndex = array => Math.floor(Math.random() * array.length)

export const getRandomId = array => {
  const randomNum = getRandomIndex(array)
  return array[randomNum]._id
}

export const getRandomAmount = (amount, array) => {
  const numItems = amount > array.length ? array.length : amount
  const indices = []
  const pushToArray = () => {
    const index = getRandomIndex(array)
    if (indices.includes(index)) {
      pushToArray()
    } else {
      indices.push(index)
    }
  }

  for (let i = 0; i < numItems; i++) {
    pushToArray()
  }

  return indices
}

export const upper = string => string.toUpperCase()
export const lower = string => string.toLowerCase()

export const isEqualArray = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.every((el, index) => el === arr2[index])

export const createPageTitle = title => `${title} | Philipson Cookbook`

export const getImageMin = (imageData, key) =>
  Math.min(imageData[key] / imageData.divisor)

export const isEmpty = obj => Object.keys(obj).length === 0
