import { STATUSES } from './constants'

export const formatAmount = amount => {
  if (amount.includes('/')) {
    if (amount.includes(' ')) {
      const [num, frac] = amount.split(' ')
      const [preDec, postDec] = frac.split('/')
      const fracValue = +preDec / +postDec
      return +num + fracValue
    }
    const [preDec, postDec] = amount.split('/')
    return +preDec / +postDec
  }
  return +amount
}

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
        measurement,
        amount: formatAmount(amount)
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

export const isPending = status => status === STATUSES.PENDING
export const isSuccess = status => status === STATUSES.SUCCESS
export const isError = status => status === STATUSES.ERROR
export const isIdle = status => status === STATUSES.IDLE
