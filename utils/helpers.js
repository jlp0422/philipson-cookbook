export const formDataToQueryInput = ({
  author,
  title,
  description,
  ingredients,
  steps,
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
      create: ingredients.map(({ amount, ...rest }) => ({
        ...rest,
        amount: Number(amount)
      }))
    },
    steps,
    imageUrl: imageData.url,
    source,
    tags,
    notes
  }
}

export const getImageDivisor = ({ height, width }) => {
  const max = height > width ? height : width
  return max / 300
}

export const isLink = source =>
  source.includes('https') || source.includes('www.')

export const getRandomId = array => {
  const randomNum = Math.floor(Math.random() * array.length)
  return array[randomNum]._id
}

export const upper = string => string.toUpperCase()

export const isEqualArray = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.every((el, index) => el === arr2[index])
