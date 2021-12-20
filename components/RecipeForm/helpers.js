import { STATUSES } from './constants'

const formatAmount = amount => {
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

const getServings = servings => {
  // do i even want to format this?
  // maybe i only do this on the filtering
  // to get the max value
  const cleanServings = servings.replace(/\s/g, '')
  let finalServings = null
  if (cleanServings.includes('to')) {
    finalServings = cleanServings.split('to')[1]
  } else if (cleanServings.includes('-')) {
    finalServings = cleanServings.split('-')[1]
  } else {
    finalServings = cleanServings
  }
  return finalServings
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
    servings: getServings(servings),
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
