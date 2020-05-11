import React, { useContext} from 'react';
import RestaurantContext from '../../context/restaurantContext';



import RestaurantMap from '../Map';


const UserPageResService = () => {

  

  const restaurantContext = useContext(RestaurantContext);

  const { restaurant, service, setCurrentService } = restaurantContext;


  const {
    website,
    phone,
    email,
    delivery,
    averageRating,
    averageBill,
    location

  } = restaurant;

  

  const serviceAvalilable = (service) => {
    return service ? (<i className="success far fa-check-circle"></i>) :
      (<i className="danger fas fa-times-circle"></i>)
  }

  const getRating = (rating) => {

    const starPercentage = rating / 5 * 100;

    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    return starPercentageRounded;
  }



  if (service && service._id && restaurant) {
    return (
      <div className='res-container'>
        <div className='manage-btns'>
          <button onClick={()=> setCurrentService(service)} className='btn'>Edit</button>
          <button className='btn'>Delete</button>
        </div>
        <div style={{ padding: '1rem' }} className='res-item'>
          <div>
            <h2 className='text-center success' >Our Service</h2>
            <div style={{display:'flex', justifyContent:'center'}}>

            <span className='badge'>{service.serviceType}</span>
            </div>
            <p className='py-1 text-center'>{service.description}</p>

            <div className='item-info'>
              <span className='underline' id="delivey">Delivery {serviceAvalilable(delivery)}</span>
              <span id="vegan">Vegetarian Menu {serviceAvalilable(service.veganMenu)} </span>
              <span id="kids">Kids Friendly {serviceAvalilable(service.kindsFriendly)}</span>
              <span id="events">Events Booking {serviceAvalilable(service.eventsBooking)}</span>
              <span id="bill">Average Bill: {averageBill}</span>
              <div id="rating">
                <span >Rating: </span>
                <div className="stars-outer">
                  <div style={{ width: getRating(averageRating) }} className="stars-inner"></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className='text-center danger'>Contact Us</h2>
            <div className="contacts">
              <span ><i className="fas fa-phone-alt"></i> Phone: {phone} </span>
              <span className='py-1'><i className="far fa-envelope"></i> Email: {email}</span>
              <span><i className="fab fa-safari"></i> Website: {website}</span>

            </div>
          </div>

        </div>

        {location && <RestaurantMap location={location} />}

      </div>
    )

  } else {
    return (
      <div>
        <h1 style={{maxWidth:'350px', margin:'auto'}} className='text-center'>Please add Services...</h1>
      </div>

    )
  }



}

export default UserPageResService







