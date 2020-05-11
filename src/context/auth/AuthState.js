
import React, { useReducer } from 'react';
import authReducer from './authReducer';
import AuthContext from './authContext';

import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import {

  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOG_OUT,
  SET_LOADING,
  CLEAR_ERROR,
  UPD_PASSWORD,
  UPD_ERROR,
  CLEAR_UPD_SUCCESS,
  UPD_INFO
} from '../../types'

const AuthState = (props) => {

  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    error: null,
    isAuthenticated: null,
    loaded: false,
    loading: false,
    updateSuccess: null,
    passwordUpdateSuccess: false
  }

  const [state, dispatch] = useReducer(authReducer, initialState);


  const setLoading = () => {
    dispatch({
      type: SET_LOADING
    })
  }

  const loadUser = async () => {

    setLoading()

    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'));
    }

    try {
      const res = await axios.get('https://powerful-wave-70380.herokuapp.com/api/v1/auth/me')

      dispatch({
        type: USER_LOADED,
        payload: res.data.data
      })

    } catch (error) {
      // console.log(error.response.data.error); ERROR

      dispatch({
        type: AUTH_ERROR
      })

    }

  }

  const login = async (user) => {

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.post(`https://powerful-wave-70380.herokuapp.com/api/v1/auth/login`, user, config);

      // console.log(res.data.token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token
      })

    } catch (error) {

      // console.log(error.response.data.error)

      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.error
      })
    }

  }

  const register = async (user) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.post(`https://powerful-wave-70380.herokuapp.com/api/v1/auth/register/`, user, config);

      

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token
      })

    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data.error
      })
      

    }

  }

  const signOut = async () => {

    // await axios.get(`https://powerful-wave-70380.herokuapp.com/api/v1/auth/logout`);

    dispatch({
      type: LOG_OUT

    })

  };

  // UPDATE PASSWORD
  const updatePassword = async (updatedPassword) => {

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.put(`https://powerful-wave-70380.herokuapp.com/api/v1/auth/updatepassword`, updatedPassword, config);

      dispatch({
        type: UPD_PASSWORD,
        payload: res.data.token
      })

    } catch (error) {
      console.log(error.response.data.error);

      dispatch({
        type: UPD_ERROR,
        payload: error.response.data.error
      })
    }
  }

  // UPDATE INFO
  const updateInfo = async (updatedInfo) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.put('https://powerful-wave-70380.herokuapp.com/api/v1/auth/updatedetails', updatedInfo, config);

      dispatch({
        type: UPD_INFO,
        payload: res.data.data
      });



    } catch (error) {
      dispatch({
        type: UPD_ERROR,
        payload: error.response.data.error
      })

    }

  }

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR
    })
  }

  const clearUpdateSuccess = () => {
    dispatch({
      type: CLEAR_UPD_SUCCESS
    })
  }



  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        error: state.error,
        loaded: state.loaded,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        passwordUpdateSuccess: state.passwordUpdateSuccess,
        updateSuccess: state.updateSuccess,
        login,
        register,
        loadUser,
        signOut,
        clearError,
        updatePassword,
        updateInfo,
        clearUpdateSuccess

      }}>
      {props.children}
    </AuthContext.Provider>
  )



}

export default AuthState;