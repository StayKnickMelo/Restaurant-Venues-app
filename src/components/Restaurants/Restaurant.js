import React, { useContext, useEffect } from 'react';
import RestaurantContext from '../../context/restaurantContext';
import RestaurantMap from '../Map';
import { Link } from 'react-router-dom';

import Spinner from '../../layout/Spinner';


const Restaurant = ({ match }) => {

  const restaurantContext = useContext(RestaurantContext);

  const {
    getRestaurant,
    getService,
    restaurant,
    service,
    loading } = restaurantContext;

  const resId = match.params.id

  useEffect(() => {
    getRestaurant(resId);
    getService(resId);
    //eslint-disable-next-line
  }, []);

  const serviceAvalilable = (service) => {
    return service ? (<i className="success far fa-check-circle"></i>) :
      (<i className="danger fas fa-times-circle"></i>)
  }

  const getRating = (rating) => {

    const starPercentage = rating / 5 * 100;

    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    return starPercentageRounded;
  }



  if (restaurant && restaurant !== undefined && service) {
    return (
      <div className='res-container'>
        <Link to='/' style={{ marginBottom: '.5rem' }} className='btn btn-sm'><i className="fas fa-arrow-circle-left"></i> Back</Link>
        <div style={{ padding: '1rem' }} className='res-item'>
          <div>
            <h2 className='text-center success' >Our Service</h2>
            <div style={{display:'flex', justifyContent:'center'}}>
            <span className='badge'>{service.serviceType}</span>
            </div>
            <p className='py-1 text-center'>{service.description}</p>

            <div className='item-info'>
              <span className='underline' id="delivey">Delivery {serviceAvalilable(restaurant.delivery)}</span>
              <span id="vegan">Vegetarian Menu {serviceAvalilable(service.veganMenu)} </span>
              <span id="kids">Kids Friendly {serviceAvalilable(service.kindsFriendly)}</span>
              <span id="events">Events Booking {serviceAvalilable(service.eventsBooking)}</span>
              <span id="bill">Average Bill: {restaurant.averageBill}</span>
              <div id="rating">
                <span >Rating: </span>
                <div className="stars-outer">
                  <div style={{ width: getRating(restaurant.averageRating) }} className="stars-inner"></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className='text-center danger'>Contact Us</h2>
            <div className="contacts">
              <span ><i className="fas fa-phone-alt"></i> Phone: {restaurant.phone} </span>
              <span className='py-1'><i className="far fa-envelope"></i> Email: {restaurant.email}</span>
              <span><i className="fab fa-safari"></i> Website: {restaurant.website}</span>

            </div>
          </div>

        </div>

        {restaurant.location && <RestaurantMap location={restaurant.location} />}

      </div>
    )
  } else if (loading) {
    return (<Spinner />)
    // NOT AVAILABLE
  } else {
    return (<h1>No Service AVAILABLE</h1>)
    
  }


}

export default Restaurant
