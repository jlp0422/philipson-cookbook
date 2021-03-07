import * as ERRORS from './formErrors'

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

  return formErrors
}

export default recipeFormValidator
