import {
  lower,
  upper,
  isLink,
  isEmpty,
  getImageMin,
  isEqualArray,
  getMaxServings
} from './helpers'

// component tests: https://nextjs.org/docs/testing#jest-and-react-testing-library

describe('lower', () => {
  it('should lowercase the string', () => {
    expect(lower('HELLO')).toEqual('hello')
  })
})

describe('upper', () => {
  it('should uppercase the string', () => {
    expect(upper('hello')).toEqual('HELLO')
  })
})

describe('isLink', () => {
  it('should return truthy if the string is a link', () => {
    const http = 'http://www.espn.com'
    const https = 'https://www.espn.com'
    const www = 'www.espn.com'

    expect(isLink(http)).toBeTruthy()
    expect(isLink(https)).toBeTruthy()
    expect(isLink(www)).toBeTruthy()
  })

  it('should return falsey if the string is not a link', () => {
    const http = 'espn.com'
    const https = 'espn'
    const www = 'http:www.espn.com'

    expect(isLink(http)).toBeFalsy()
    expect(isLink(https)).toBeFalsy()
    expect(isLink(www)).toBeFalsy()
  })
})

describe('isEmpty', () => {
  it('returns true for an empty object', () => {
    expect(isEmpty({})).toBe(true)
  })
  it('returns false for a non-empty object', () => {
    expect(isEmpty({ a: 'b' })).toBe(false)
  })
})

describe('getImageMin', () => {
  it('gets the minimum for the key', () => {
    const imageData = {
      height: 400,
      width: 600,
      divisor: 250
    }
    expect(getImageMin(imageData, 'width')).toBe(2.4)
    expect(getImageMin(imageData, 'height')).toBe(1.6)
  })
})

describe('isEqualArray', () => {
  const arr1 = [1, 3, 5, 10]
  const arr2 = [1, 3, 5, 10]
  const arr3 = [1, 3, 5]
  const arr4 = [1, 5, 3, 10]
  it('returns true if the arrays are equal', () => {
    expect(isEqualArray(arr1, arr2)).toBe(true)
    expect(isEqualArray(arr2, arr1)).toBe(true)
  })
  it('returns false if the arrays are not equal', () => {
    expect(isEqualArray(arr1, arr3)).toBe(false)
    expect(isEqualArray(arr3, arr2)).toBe(false)
    expect(isEqualArray(arr4, arr2)).toBe(false)
  })
})

describe('getMaxServings', () => {
  it('returns the servings if no delimeter is found', () => {
    expect(getMaxServings('4')).toBe(4)
    expect(getMaxServings('12')).toBe(12)
  })

  it('returns the servings if "-" is found', () => {
    expect(getMaxServings('4 - 6')).toBe(6)
    expect(getMaxServings('4-6')).toBe(6)
    expect(getMaxServings('4- 6')).toBe(6)
    expect(getMaxServings('4 - 6 - 12')).toBe(12)
  })

  it('returns the servings if "to" is found', () => {
    expect(getMaxServings('4 to 8')).toBe(8)
    expect(getMaxServings('4to8')).toBe(8)
    expect(getMaxServings('4to 8')).toBe(8)
    expect(getMaxServings('4 to 8 to 12')).toBe(12)
  })

  it('returns 0 if the finalServings is not a valid number', () => {
    expect(getMaxServings('4or8')).toBe(0)
    expect(getMaxServings('4ta8s')).toBe(0)
  })
})
