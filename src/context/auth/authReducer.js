
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOG_OUT,
  REGISTER,
  SET_LOADING,
  CLEAR_ERROR,
  UPD_PASSWORD,
  UPD_ERROR,
  CLEAR_UPD_SUCCESS,
  UPD_INFO

} from '../../types'



const authReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
    case REGISTER:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true
      }
    case UPD_PASSWORD:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        // passwordUpdateSuccess: true
        updateSuccess: 'Password Updated'
      }
    case UPD_INFO:
      return {
        ...state,
        user: action.payload,
        updateSuccess: 'Info Updated'

      }
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        loaded: false
      }
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loaded: true,
        loading: false
      }
    case UPD_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    case CLEAR_UPD_SUCCESS:
      return{
        ...state,
        // passwordUpdateSuccess: false
        updateSuccess: null

      }
    default:
      return state
  }

}


export default authReducer;