import React, { useReducer } from 'react';
import RestaurantContext from './restaurantContext';
import restaurantReducer from './restaurantReducer';
import axios from 'axios';

import {

  GET_RESTAURANTS,
  GET_RESTAURANT,
  GET_OWNERS_RESTAURANT,
  GET_SERVICE,
  GET_REVIEWS,
  ADD_RESTAURANT,
  // SERVICES
  ADD_SERVICE,
  DELETE_RESTAURANT,
  SET_CURRENT_RES,
  CLEAR_CURRENT_RES,
  UPDATE_RES,
  SET_CURRENT_SERVICE,
  CLEAR_CURRENT_SERVICE,
  UPDATE_SERVICE,
  RES_ID_FOR_REVIEW,
  SET_LOADING

} from '../types'

const RestaurantState = (props) => {

  const initialState = {
    restaurants: null,
    restaurant: null,
    currentRestaurant: null,
    currentService: null,
    service: null,
    reviews: null,
    resLoaded: false,
    resIdForReview: null,
    loading: false
  }

  const [state, dispatch] = useReducer(restaurantReducer, initialState);


  const setLoading = () => {
    dispatch({
      type: SET_LOADING
    })
  }


  const getRestaurants = async () => {

    setLoading()

    const res = await axios.get('https://powerful-wave-70380.herokuapp.com/api/v1/restaurants');

    dispatch({
      type: GET_RESTAURANTS,
      payload: res.data.data
    })

  }

  const getRestaurant = async (resId) => {

    setLoading();

    const restaurant = await axios.get(`https://powerful-wave-70380.herokuapp.com/api/v1/restaurants/${resId}`);

    dispatch({
      type: GET_RESTAURANT,
      payload: restaurant.data.data
    })
  }

  const getService = async (resId) => {

    setLoading();
    
    const resService = await axios.get(`https://powerful-wave-70380.herokuapp.com/api/v1/restaurants/${resId}/services`);

    dispatch({
      type: GET_SERVICE,
      payload: resService.data.data[0]
    })
  }

  // CHANGED FROM getReviews TO getResReviews!!!!!!!!!!
  const getResReviews = async (resId) => {
    const reviews = await axios.get(`https://powerful-wave-70380.herokuapp.com/api/v1/restaurants/${resId}/reviews`);

    dispatch({
      type: GET_REVIEWS,
      payload: reviews.data.data
    })
  }

  // GET RESTAURANT BY USER ID

  const getOwnersRestaurant = async (id) => {

    try {
      const res = await axios.get(`https://powerful-wave-70380.herokuapp.com/api/v1/restaurants?user=${id}`);

      dispatch({
        type: GET_OWNERS_RESTAURANT,
        payload: res.data.data[0]
      })

    } catch (error) {

      console.log(error.response);

    }

  }

  // ADD Restaurant
  const addRestaurant = async (newRestaurant) => {

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.post(`https://powerful-wave-70380.herokuapp.com/api/v1/restaurants/`, newRestaurant, config);

      console.log(res.data.data);

      dispatch({
        type: ADD_RESTAURANT,
        payload: res.data.data
      });

      getRestaurant(res.data.data._id);


    } catch (error) {

      console.log(error.response.data);

    }

  }

  // Photo Upload
  const photoUpload = async (resId, photo) => {

    const config = {
      headers: {
        'Content-type': 'multipart/form-data.'
      }
    }

    try {

      const res = await axios.put(`https://powerful-wave-70380.herokuapp.com/api/v1/restaurants/${resId}/photo`, photo, config);


      console.log(res.data.data);

      getRestaurant(resId);

    } catch (error) {

      console.log(error.response);

    }

  }

  // UPDATE Restaurant
  const updateRes = async (restaurant, userId) => {

    const id = restaurant._id;

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.put(`https://powerful-wave-70380.herokuapp.com/api/v1/restaurants/${id}`, restaurant, config);

      console.log(res.data.data);

      dispatch({
        type: UPDATE_RES,
        payload: res.data.data
      });

      getRestaurants();
      getOwnersRestaurant(userId);


    } catch (error) {

      console.log(error.response);

    }


  }

  // DELETE Rertaurant
  const deleteRestaurant = async (resId, userId) => {
    try {
      const res = await axios.delete(`https://powerful-wave-70380.herokuapp.com/api/v1/restaurants/${resId}`);

      console.log(res.data);

      getOwnersRestaurant(userId);

      dispatch({
        type: DELETE_RESTAURANT,
        payload: resId
      })

    } catch (error) {
      console.log(error.response);

    }
  }


  const addService = async (resId, service) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.post(`https://powerful-wave-70380.herokuapp.com/api/v1/restaurants/${resId}/services`, service, config);


      dispatch({
        type: ADD_SERVICE,
        payload: res.data.data
      });

      getService(resId);


    } catch (error) {
      console.log(error.response.data);
    }
  }

  // UPDATE Service
  const updateService = async (service) => {
    const id = service._id;

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {

      const res = await axios.put(`https://powerful-wave-70380.herokuapp.com/api/v1/services/${id}`, service, config);

      console.log(res.data.data)

      dispatch({
        type: UPDATE_SERVICE,
        payload: res.data.data
      });

    } catch (error) {
      console.log(error.response);

    }
  }

  // GET RES ID FOR REVIEW
  const getResIdForReview = (id) => {

    dispatch({
      type: RES_ID_FOR_REVIEW,
      payload: id
    })

  }


  // SET Current Service
  const setCurrentService = (service) => {
    dispatch({
      type: SET_CURRENT_SERVICE,
      payload: service
    })
  }

  // CLEAR Current Service
  const clearCurrentService = () => {
    dispatch({
      type: CLEAR_CURRENT_SERVICE
    })
  }




  // SET Current Restaurant 
  const setCurrentRes = (restaurant) => {

    dispatch({
      type: SET_CURRENT_RES,
      payload: restaurant
    })
  }

  // CLEAR Current Restaurant
  const clearCurrentRes = () => {
    dispatch({
      type: CLEAR_CURRENT_RES
    })
  }


  return (
    <RestaurantContext.Provider value={{
      restaurants: state.restaurants,
      restaurant: state.restaurant,
      service: state.service,
      reviews: state.reviews,
      resLoaded: state.resLoaded,
      loading: state.loading,
      currentRestaurant: state.currentRestaurant,
      currentService: state.currentService,
      resIdForReview: state.resIdForReview,
      getRestaurants,
      getRestaurant,
      getOwnersRestaurant,
      getService,
      getResReviews,
      addRestaurant,
      photoUpload,
      addService,
      deleteRestaurant,
      updateRes,
      updateService,
      setCurrentRes,
      clearCurrentRes,
      setCurrentService,
      clearCurrentService,
      getResIdForReview
    }}>
      {props.children}
    </RestaurantContext.Provider>
  );
}


export default RestaurantState;