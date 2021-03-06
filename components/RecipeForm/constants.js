export const author = {
  short: 'Author missing',
  long: 'Please add a recipe author.'
}

export const title = {
  short: 'Title missing',
  long: 'Please add a recipe title.'
}

export const servings = {
  short: 'No servings',
  long: 'Please add a serving size.'
}

export const steps = {
  short: 'Steps missing',
  long: 'Please add at least one step for the recipe.'
}

export const ingredients = {
  short: 'Ingredient incorrect',
  long: 'Please ensure you have added all ingredient information.'
}

export const totalTime = {
  short: 'No estimated time',
  long: 'Please add how long it takes to make this recipe.'
}

export const ERRORS = {
  author,
  title,
  servings,
  steps,
  ingredients,
  totalTime
}

export const MEASUREMENTS = {
  CUP: 'CUP',
  EACH: 'EACH',
  GALLON: 'GAL',
  GRAM: 'GRAM',
  'FLUID OUNCE': 'FL OZ',
  KILOGRAM: 'KG',
  LITER: 'LITER',
  MILLILITER: 'ML',
  OUNCE: 'OZ',
  PACKAGE: 'PKG',
  PINCH: 'PINCH',
  PINT: 'PINT',
  POUND: 'LB',
  QUART: 'QT',
  TABLESPOON: 'TBSP',
  TEASPOON: 'TSP'
}

export const initialState = {
  author: '',
  title: '',
  description: '',
  totalTime: '',
  servings: '',
  ingredients: [
    {
      amount: '',
      item: '',
      measurement: ''
    }
  ],
  steps: [''],
  imageData: {},
  source: '',
  tags: [],
  notes: '',
  errors: {}
}
