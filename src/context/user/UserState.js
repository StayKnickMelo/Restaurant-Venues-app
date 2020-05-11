import React, {useReducer } from 'react';
import UserContext from '../user/userContext';
import userReducer from './userReducer';
import axios from 'axios';

import {
  GET_USER_REVIEWS,
  DELETE_REVIEW,
  GET_REVIEWED,
  CLEAR_REVIEWD,
  


} from '../../types'



const UserState = (props) => {

  const initialState = {
    reviews: null,
    review: null,
    alredyReviewed: null
  }

  const [state, dispatch] = useReducer(userReducer, initialState);

  // GET Reviews
  const getReviews = async (userId) => {

    try {
      const res = await axios.get(`https://powerful-wave-70380.herokuapp.com/api/v1/reviews?user=${userId}`);

      dispatch({
        type: GET_USER_REVIEWS,
        payload: res.data.data
      })

      // console.log(res.data.data)
      getAlredayReviewed(userId);

    } catch (error) {
      console.log(error.response);

    }


  }


  // ADD REVIEW
  const addReview = async (review,resId) => {

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {

      const res = await axios.post(`https://powerful-wave-70380.herokuapp.com/api/v1/restaurants/${resId}/reviews`, review, config);


      console.log(res.data.data);
      
    } catch (error) {
      console.log(error.response);
    }

  }

  // UPDATE REVIEW
  const updateReview = async (updatedReview,reviewId, userId) =>{
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.put(`https://powerful-wave-70380.herokuapp.com/api/v1/reviews/${reviewId}`,updatedReview, config);

      // dispatch({
      //   type: UPDATE_REVIEW,
      //   payload: res.data.data
      // })

      getReviews(userId);

      console.log(res.data.data);

    } catch (error) {

      console.log(error.response);
      
    }


  }

  // GET REVIEWED RESTAURANTS
  const getAlredayReviewed = async (userId) => {
    try {
      const res = await axios.get(`https://powerful-wave-70380.herokuapp.com/api/v1/reviews?user=${userId}&select=restaurant`);

      const resIds = res.data.data.map(info => info.restaurant._id);

      dispatch({
        type: GET_REVIEWED,
        payload: resIds
      })

    } catch (error) {

      console.log(error.response);

    }

  }

  // CLEAR REVIEWED
  const clearReviewed = () => {

    dispatch({
      type: CLEAR_REVIEWD
    });

  }


  // DELETE Review
  const deleteReview = async (review) => {
    const id = review._id;
    try {
      const res = await axios.delete(`https://powerful-wave-70380.herokuapp.com/api/v1/reviews/${id}`);

      console.log(res.data);

      dispatch({
        type: DELETE_REVIEW,
        payload: review
      })


    } catch (error) {
      console.log(error.response);

    }

  }


  return (
    <UserContext.Provider
      value={{
        reviews: state.reviews,
        review: state.review,
        alredyReviewed: state.alredyReviewed,
        getReviews,
        addReview,
        deleteReview,
        clearReviewed,
        updateReview

      }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState