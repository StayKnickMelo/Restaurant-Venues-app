import {
  GET_USER_REVIEWS,
  DELETE_REVIEW,
  GET_REVIEWED,
  CLEAR_REVIEWD,
  UPDATE_REVIEW

} from '../../types'

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      }
    case GET_REVIEWED:
      return {
        ...state,
        alredyReviewed: action.payload
      }
    case CLEAR_REVIEWD:
      return {
        ...state,
        alredyReviewed: null
      }
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review._id !== action.payload._id)
      }
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(review => review._id === action.payload._id ? action.payload : review)
      }
    default:
      return state
  }
}


export default userReducer;