import { ERRORS } from './constants'

const recipeFormValidator = formData => {
  const formErrors = {}
  if (!formData.author) {
    formErrors.author = ERRORS.author
  }

  if (!formData.title) {
    formErrors.title = ERRORS.title
  }

  if (!formData.servings) {
    formErrors.servings = ERRORS.servings
  }

  if (!formData.totalTime) {
    formErrors.totalTime = ERRORS.totalTime
  }

  if (formData.steps.every(step => !step.trim().length)) {
    formErrors.steps = ERRORS.steps
  }

  if (
    formData.ingredients.every(
      ing => !ing.amount || !ing.measurement || !ing.item
    )
  ) {
    formErrors.ingredients = ERRORS.ingredients
  }

  if (
    formData.ingredients.every(ing => {
      if (ing.amount.includes('/')) {
        return false
      }
      if (Number(ing.amount)) {
        return false
      }
      return true
    })
  ) {
    formErrors.ingredients = ERRORS.ingredients
  }

  if (!formData.imageData.url) {
    formErrors.imageData = ERRORS.imageData
  }

  return formErrors
}

export default recipeFormValidator
