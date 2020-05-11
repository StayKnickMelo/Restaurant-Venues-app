import React, { useState, useContext, useEffect } from 'react';

import RestaurantContext from '../../context/restaurantContext';

const RestaurantFormService = () => {

  const restaurantContext = useContext(RestaurantContext);

  const { restaurant, addService, clearCurrentService, currentService, updateService } = restaurantContext;


  const [service, setService] = useState({
    description: '',
    serviceType: '',
    seatCapacity: '',
    eventsBooking: false,
    veganMenu: false,
    bookingRequired: false,
    kindsFriendly: false
  });


  useEffect(()=>{
    if(currentService){
      setService(currentService);

    }
  },[currentService]);

  const onClick = () => {
    clearCurrentService();

    setService({
      description: '',
      serviceType: '',
      seatCapacity: '',
      eventsBooking: false,
      veganMenu: false,
      bookingRequired: false,
      kindsFriendly: false
    })
  }

  const onChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  const setEventsBooking = (e) => {
    setService({ ...service, [e.target.name]: !service.eventsBooking });
  }

  const setVeganMenu = (e) => {
    setService({ ...service, [e.target.name]: !service.veganMenu });
  }

  const setBookingRequired = (e) => {
    setService({ ...service, [e.target.name]: !service.bookingRequired })
  }

  const setKindsFriendly = (e) => {
    setService({ ...service, [e.target.name]: !service.kindsFriendly });
  }


  const onSubmit = (e) => {
    e.preventDefault();

    if(currentService){
      service.seatCapacity = parseInt(service.seatCapacity);

      updateService(service);
      clearCurrentService();
      

    }else{
      service.seatCapacity = parseInt(service.seatCapacity);

      addService(restaurant._id, service);
    }

    setService({
      description: '',
      serviceType: '',
      seatCapacity: '',
      eventsBooking: false,
      veganMenu: false,
      bookingRequired: false,
      kindsFriendly: false
    })

    
  }


  return (
    <form onSubmit={onSubmit} className='res-form'>

      <h3 className='text-center header'>Your Restaurant Services</h3>

      <label htmlFor="serviceType">Service Type</label>
      <input onChange={onChange} type="text" placeholder='Service Type' name='serviceType' value={service.serviceType} required />

      <label htmlFor="description">Description</label>
      <input onChange={onChange} type="text" placeholder='Description' name='description' value={service.description} required />

      <label htmlFor="seatCapacity">Seat Capacity</label>
      <input onChange={onChange} type="number" placeholder='Seat Capacity' name='seatCapacity' value={service.seatCapacity} required />

      <div className='checkBox'>
        <label htmlFor="veganMenu">Vegan Menu</label>
        <input onChange={setVeganMenu} type="checkbox" name='veganMenu' value={service.veganMenu} checked={service.veganMenu} />
      </div>



      <div className='checkBox' >
        <label htmlFor="eventsBooking">Events Booking</label>
        <input onChange={setEventsBooking} type="checkbox" name='eventsBooking' checked={service.eventsBooking} />
      </div>



      <div className='checkBox'>
        <label htmlFor="bookingRequired">Booking Required</label>
        <input onChange={setBookingRequired} type="checkbox" name='bookingRequired' checked={service.bookingRequired} />
      </div>


      <div className='checkBox' >
        <label htmlFor="kindsFriendly">Kids Friendly</label>
        <input onChange={setKindsFriendly} type="checkbox" name='kindsFriendly' checked={service.kindsFriendly} />
      </div>


      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input style={{ marginTop: '.5rem' }} className={currentService ? 'btn btn-update' : 'btn'} type="submit" value={currentService ? 'Update Service' : 'Add Service'} />
        {currentService && <button onClick={onClick} style={{ marginTop: '.5rem' }} className='btn btn-cancel' type='button'>Cancel</button>}

      </div>

    </form>
  )
}

export default RestaurantFormService
