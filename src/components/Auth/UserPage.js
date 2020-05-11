import React, { useEffect, useContext } from 'react';

import AuthContext from '../../context/auth/authContext';
import RestaurantContext from '../../context/restaurantContext';

import UserPageResService from './UserPageResService';

import RestaurantForm from './RestaurantForm';

import UserRolePage from '../User/UserRolePage';

import Spinner from '../../layout/Spinner';




const UserPage = (props) => {

  const authContext = useContext(AuthContext);
  const { user, loadUser, isAuthenticated, loaded, loading } = authContext;

  const restaurantContext = useContext(RestaurantContext);
  const { getOwnersRestaurant, restaurant, getService, deleteRestaurant, setCurrentRes, getRestaurants } = restaurantContext;

  const showBigger = true

  const flag = (cuisine) => {
    switch (cuisine) {
      default:
        return null
      case 'French':
        return 'cuisineIcons/france.png'
      case 'Chinese':
        return 'cuisineIcons/china.png'
      case 'Italian':
        return 'cuisineIcons/italy.png'
      case 'Russian':
        return 'cuisineIcons/russia.png'
      case 'Japanese':
        return 'cuisineIcons/japan.png'
      case 'Indian':
        return 'cuisineIcons/india.png'

    }

  }


  




  const serviceUseEffect = (restaurant) => {
    if (restaurant) {

      return restaurant._id ? true : false
    }

  }


  useEffect(() => {
    
    getRestaurants()
    loadUser();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user && user.role === 'owner') {
      getOwnersRestaurant(user._id);
      
    }
    //eslint-disable-next-line
  }, [loaded]);


  // FIX SERVICE REFRESH ON USER PAGE

  useEffect(() => {
    if (restaurant && restaurant._id) {

      getService(restaurant._id);
      
    }

    return () => {
      console.log('UNMOUNTED')
    }
    //eslint-disable-next-line
  }, [serviceUseEffect(restaurant), loaded]);

  // ////////////////////////////////////////////


  // MAKES USE???
  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')

    }

  }, [isAuthenticated, props.history]);



  if (user && user.role === 'owner') {
    if (restaurant && restaurant.cuisines) {

      return (
        <div>
          
          <h2>Hello <span style={{ fontStyle: 'italic' }}>{user.name}</span></h2>

          <div className='container'>
            <div className='res-item'>

              <div style={{ width: "100%", height: "100%" }}>
                <img style={{ width: "100%", height: "100%" }} src={`https://powerful-wave-70380.herokuapp.com/uploads/${restaurant.photo}`} alt="restaurant" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='manage-btns'>
                  <button onClick={()=> setCurrentRes(restaurant)} className='btn'>Edit</button>
                  <button onClick={() => deleteRestaurant(restaurant._id, user._id)} className='btn'>Delete</button>
                </div>
                <div style={{ height: '100%' }} className='info'>
                  <div>
                    <h2 style={{ marginBottom: '0.5rem' }}>{restaurant.name}</h2>
                    <p style={{ fontStyle: "italic" }}>{restaurant.description}</p>
                  </div>
                  <div className='cuisine'>
                    <h3> <i className="fas fa-utensils"></i> Cuisines:</h3>
                    {
                      restaurant.cuisines.map((cuisine, index) => (<div key={index} style={{ display: 'flex' }}>
                        <div ><img style={{ width: '45%' }} src={flag(cuisine)} alt='Cuisine'></img></div>
                        <p > {cuisine} </p>
                      </div>))
                    }
                  </div>
                </div>
              </div>
            </div>
            <RestaurantForm />
          </div>
          <UserPageResService />
        </div>
      )
    } else {
      return (
        <div>
          <div className="container">
            <h2 className='text-center'>Please add a Restaurant...</h2>
            <RestaurantForm showBigger={showBigger} />
          </div>
          <div>
            <h1 style={{ maxWidth: '350px', margin: 'auto' }} className='text-center'>Please add Services...</h1>
          </div>
        </div>
      )
    }
  } else if (user && user.role === 'user') {
    return (
      <div style={{padding:'1rem'}}>
        <UserRolePage user={user} />

      </div>
      

        
      

    )
  } else if(loading){
    return (<Spinner/>)

  } else {
    return (
      <h1>Admin</h1>
    )
  }
}

export default UserPage
