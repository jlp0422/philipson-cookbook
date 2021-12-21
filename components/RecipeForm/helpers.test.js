import { formatAmount, formDataToQueryInput, getImageDivisor } from './helpers'

describe('formatAmount', () => {
  it('returns the number when no delimeter is found', () => {
    const expected = formatAmount('4')
    expect(expected).toBe(4)
  })

  it('returns the number when it is a fraction less than 0', () => {
    const expected = formatAmount('1/2')
    expect(expected).toBe(0.5)
  })

  it('returns the number when it is a fraction greater than 0', () => {
    const expected = formatAmount('3/2')
    expect(expected).toBe(1.5)
  })

  it('returns the number when it is a number and fraction', () => {
    const expected = formatAmount('2 1/2')
    expect(expected).toBe(2.5)
  })
})

describe('formDataToQueryInput', () => {
  it('formats the raw data into a query readable object', () => {
    const expected = formDataToQueryInput({
      author: 'jeremy',
      title: 'my recipe',
      description: 'it is really good',
      ingredients: [
        {
          item: 'garlic',
          measurement: 'CUP',
          amount: '1 1/2'
        },
        {
          item: 'water',
          measurement: 'TEASPOON',
          amount: '3'
        },
        {
          item: 'ground beef',
          measurement: 'POUND',
          amount: '0.5'
        }
      ],
      steps: ['heat the pan', 'put in pan', 'remove from pan'],
      totalTime: '60',
      servings: '4',
      imageData: { url: 'fillmurray.jpg' },
      tags: [],
      notes: ''
    })

    expect(expected).toEqual({
      author: 'jeremy',
      title: 'my recipe',
      description: 'it is really good',
      ingredients: {
        create: [
          {
            item: 'garlic',
            measurement: 'CUP',
            amount: 1.5
          },
          {
            item: 'water',
            measurement: 'TEASPOON',
            amount: 3
          },
          {
            item: 'ground beef',
            measurement: 'POUND',
            amount: 0.5
          }
        ]
      },
      steps: ['heat the pan', 'put in pan', 'remove from pan'],
      totalTime: '60',
      servings: '4',
      imageUrl: 'fillmurray.jpg',
      source: undefined,
      tags: [],
      notes: ''
    })
  })
})

describe('getImageDivisor', () => {
  it('returns the max height or width if both are < 500', () => {
    const expected = getImageDivisor({ height: 400, width: 300 })
    expect(expected).toBe(400)

    const expected2 = getImageDivisor({ height: 200, width: 300 })
    expect(expected2).toBe(300)
  })

  it('returns the divisor if height or width is > 500', () => {
    const expected = getImageDivisor({ height: 600, width: 300 })
    expect(expected).toBe(1.2)

    const expected2 = getImageDivisor({ height: 600, width: 900 })
    expect(expected2).toBe(1.8)
  })
})
