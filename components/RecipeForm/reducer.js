import { SUBMIT_ERROR, SUBMIT_SUCCESS, UPDATE_FIELD, UPDATE_STATUS } from './actions'
import { STATUSES } from './constants'

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        [action.field]: action.value
      }
    case UPDATE_STATUS:
      return {
        ...state,
        status: action.status
      }
    case SUBMIT_SUCCESS:
      return {
        ...state,
        status: STATUSES.SUCCESS
      }
    case SUBMIT_ERROR:
      return {
        ...state,
        status: STATUSES.ERROR
      }
    default:
      return state
  }
}
