import {
  GET_RESTAURANTS,
  GET_RESTAURANT,
  GET_OWNERS_RESTAURANT,
  GET_SERVICE,
  GET_REVIEWS,
  ADD_RESTAURANT,
  DELETE_RESTAURANT,
  UPDATE_RES,
  SET_CURRENT_RES,
  CLEAR_CURRENT_RES,
  SET_CURRENT_SERVICE,
  CLEAR_CURRENT_SERVICE,
  UPDATE_SERVICE,
  RES_ID_FOR_REVIEW,
  SET_LOADING



  // SERVICE

} from '../types';

const restaurantReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        resLoaded: false,
        loading: false
      }
    case GET_RESTAURANT:
    case GET_OWNERS_RESTAURANT:
      return {
        ...state,
        restaurant: action.payload,
        loading: false
      }
    case ADD_RESTAURANT:
      return {
        ...state,
        restaurants: [...state.restaurants, action.payload]
      }
    case DELETE_RESTAURANT: {
      return {
        ...state,
        restaurants: state.restaurants.filter(restaurant => restaurant._id !== action.payload)

      }
    }
    case UPDATE_RES:
      return {
        ...state,
        restaurants: state.restaurants.map(restaurant => restaurant._id === action.payload._id ? action.payload : restaurant)
      }
    case UPDATE_SERVICE:
      return {
        ...state,
        service: action.payload
      }
    case SET_CURRENT_RES:
      return {
        ...state,
        currentRestaurant: action.payload
      }
    case CLEAR_CURRENT_RES:
      return {
        ...state,
        currentRestaurant: null
      }
    case SET_CURRENT_SERVICE:
      return {
        ...state,
        currentService: action.payload
      }
    case CLEAR_CURRENT_SERVICE:
      return {
        ...state,
        currentService: null
      }
    case GET_SERVICE:
      return {
        ...state,
        service: action.payload,
        loading: false
      }
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      }
    case RES_ID_FOR_REVIEW:
      return{
        ...state,
        resIdForReview: action.payload
      }
    default:
      return state
  }
}

export default restaurantReducer;