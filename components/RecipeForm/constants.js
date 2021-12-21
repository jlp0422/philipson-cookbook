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
  long: 'Please add how many servings this dish makes.'
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

export const imageData = {
  short: 'No image provided',
  long: 'Please provide an image.'
}

export const ERRORS = {
  author,
  title,
  servings,
  steps,
  ingredients,
  totalTime,
  imageData
}

const BOX = 'BOX'
const CUP = 'CUP'
const EACH = 'EACH'
const GALLON = 'GALLON'
const GRAM = 'GRAM'
const JAR = 'JAR'
const KILOGRAM = 'KILOGRAM'
const LITER = 'LITER'
const MILLILITER = 'MILLILITER'
const OUNCE = 'OUNCE'
const PACKAGE = 'PACKAGE'
const PINCH = 'PINCH'
const PINT = 'PINT'
const POUND = 'POUND'
const QUART = 'QUART'
const TABLESPOON = 'TABLESPOON'
const TEASPOON = 'TEASPOON'
const WHOLE = 'WHOLE'
export const NOT_APPLICABLE = 'NOT_APPLICABLE'

export const MEASUREMENTS = [
  BOX,
  CUP,
  EACH,
  GALLON,
  GRAM,
  JAR,
  KILOGRAM,
  LITER,
  MILLILITER,
  OUNCE,
  PACKAGE,
  PINCH,
  PINT,
  POUND,
  QUART,
  TABLESPOON,
  TEASPOON,
  WHOLE
]

export const STATUSES = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
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
      measurement: NOT_APPLICABLE
    }
  ],
  steps: [''],
  imageData: {},
  source: '',
  tags: [],
  notes: '',
  errors: {},
  status: STATUSES.IDLE
}
