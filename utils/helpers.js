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

export const isLink = source => source.includes('https') || source.includes('www.')
