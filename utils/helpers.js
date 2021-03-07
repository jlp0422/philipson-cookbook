export const formDataToQueryInput = ({
  author,
  title,
  description,
  ingredients,
  steps,
  totalTime,
  servings,
  imageData,
  source,
  tags,
  notes
}) => {
  return {
    author,
    title,
    description,
    ingredients: {
      create: ingredients.map(({ amount, item, measurement }) => ({
        item,
        measurement: measurement.split(' ').join('_'),
        amount: Number(amount)
      }))
    },
    steps,
    totalTime,
    servings,
    imageUrl: imageData.url,
    source,
    tags,
    notes
  }
}

export const getImageDivisor = ({ height, width }) => {
  if (height < 500 && width < 500) {
    return Math.max(height, width)
  }
  const max = height > width ? height : width
  return max / 500
}

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
