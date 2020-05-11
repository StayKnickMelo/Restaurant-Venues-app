import React from 'react';

import { useEffect, useContext} from 'react';

import RestaurantContext from '../../context/restaurantContext';


import RestaurantItem from '../Restaurants/RestaurantItem';


// LOADING
import Spinner from '../../layout/Spinner'



const Restaurants = () => {

  const restaurantContext = useContext(RestaurantContext);

  const {restaurants, getRestaurants, loading} = restaurantContext;

  useEffect(()=>{
    getRestaurants();
    //eslint-disable-next-line
  },[]);


  return (
    <div className='res-container'>
      
      {loading ? <Spinner/> : restaurants && restaurants.length > 0 && restaurants.map(restaurant => (
        <RestaurantItem key={restaurant._id} restaurant={restaurant} />
      )) }
    </div>
   
  )
}

export default Restaurants
