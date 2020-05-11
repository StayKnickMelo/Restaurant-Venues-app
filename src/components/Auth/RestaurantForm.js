import React, { useState, useContext, useEffect } from 'react';

import RestaurantContext from '../../context/restaurantContext';
import AuthContext from '../../context/auth/authContext';

import RestaurantFormService from './RestaurantFormService'


const RestaurantForm = ({ showBigger }) => {

  const restaurantContext = useContext(RestaurantContext);
  const { addRestaurant, photoUpload, restaurant, currentRestaurant, clearCurrentRes, updateRes } = restaurantContext;

  const authContext = useContext(AuthContext);
  const {user} = authContext;

  const [restaurantToAdd, setRestaurant] = useState({
    name: '',
    description: '',
    website: '',
    phone: '',
    email: '',
    address: '',
    averageBill: ''
  });




  useEffect(() => {
    if (currentRestaurant) {
      setRestaurant(currentRestaurant);
      setDelivery(currentRestaurant.delivery);
      setCuisines(currentRestaurant.cuisines);
    }

  }, [currentRestaurant, restaurantContext]);

  const [delivery, setDelivery] = useState(false);

  const [cuisines, setCuisines] = useState([]);
  const [file, setPhoto] = useState(null);

  const onChange = (e) => {
    setRestaurant({ ...restaurantToAdd, [e.target.name]: e.target.value })

  }

  const onClick = () => {
    clearCurrentRes();

    setRestaurant({
      name: '',
      description: '',
      website: '',
      phone: '',
      email: '',
      address: '',
      averageBill: '',

    });

    setDelivery(false);
    setCuisines([]);


  }

  const getCuisines = (selectedItems) => {
    const cuisines = [];
    for (let i = 0; i < selectedItems.length; i++) {
      cuisines.push(selectedItems[i].value);
    }

    setCuisines(cuisines)

  }

  const onSubmit = (e) => {
    e.preventDefault();

    const emailRegEx = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const webSiteRegEx = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/);


    if (currentRestaurant) {
      if (!restaurantToAdd.email.match(emailRegEx)) {
        alert('ENTER A VALID EMAIL');
        // ALERT HERE

      } else if (!restaurantToAdd.website.match(webSiteRegEx)) {
        alert('ENTER A VALID WEBSITE')
        // ALERT HERE


      } else {
        const newRestaurant = { ...restaurantToAdd };

        newRestaurant.cuisines = cuisines;
        newRestaurant.delivery = delivery;
        newRestaurant.averageBill = parseInt(newRestaurant.averageBill);

        updateRes(newRestaurant, user._id);

        clearCurrentRes();

      }

    } else {
      if (!restaurantToAdd.email.match(emailRegEx)) {
        alert('ENTER A VALID EMAIL');
        // ALERT HERE

      } else if (!restaurantToAdd.website.match(webSiteRegEx)) {
        alert('ENTER A VALID WEBSITE')
        // ALERT HERE


      } else {
        const newRestaurant = { ...restaurantToAdd };

        newRestaurant.cuisines = cuisines;
        newRestaurant.delivery = delivery;
        newRestaurant.averageBill = parseInt(newRestaurant.averageBill);

        addRestaurant(newRestaurant);

      }

    }


    setRestaurant({
      name: '',
      description: '',
      website: '',
      phone: '',
      email: '',
      address: '',
      averageBill: '',

    });

    setDelivery(false);
    setCuisines([]);



  }






  return (
    <div className={showBigger ? 'form-container bigger' : 'form-container'}>
      <form onSubmit={onSubmit} className='res-form'>

        <h3 className='text-center header'>Your Restaurant Description</h3>


        <label htmlFor="name">Name</label>
        <input onChange={onChange} type="text" placeholder='Name' name='name' value={restaurantToAdd.name} required />

        <label htmlFor='description'>Description</label>
        <input onChange={onChange} type="text" placeholder='Description' name='description'
          value={restaurantToAdd.description} required />



        <select required className='cuisines' name="cuisine" multiple={true} value={cuisines} onChange={(e) => getCuisines(e.target.selectedOptions)}>
          <option disabled>Select Cuisine</option>
          <option value="Chinese">Chinese</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="German">German</option>
          <option value="Russian">Russian</option>
          <option value="Indian">Indian</option>
          <option value="Korean">Korean</option>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
          <option value="American">American</option>
        </select>


        <label htmlFor="addreess">Address</label>
        <input required onChange={onChange} type="text" placeholder='Location' name='address' value={restaurantToAdd.address} />

        <label htmlFor="phone">Phone</label>
        <input required onChange={onChange} type="text" placeholder='Phone' name='phone' value={restaurantToAdd.phone} />

        <label htmlFor="email">Email</label>
        <input required onChange={onChange} type="text" placeholder='Email' name='email' value={restaurantToAdd.email} />

        <label htmlFor="website">Website</label>
        <input required onChange={onChange} type="text" placeholder='Website' name='website' value={restaurantToAdd.website} />



        <label htmlFor="averageBill">Average Bill</label>
        <input required onChange={onChange} type="number" placeholder='Average Bill' name='averageBill' value={restaurantToAdd.averageBill} />


        <div className='checkBox'>
          <label htmlFor="delivery">Delivery</label>
          <input onChange={() => setDelivery(!delivery)} type="checkbox" placeholder='Delivery' name='delivery' checked={delivery} />
        </div>



        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input style={{ marginTop: '.5rem' }} className={currentRestaurant ? 'btn btn-update' : 'btn'} type="submit" value={currentRestaurant ? 'Update Info' : 'Add Info'} />
          {currentRestaurant && <button onClick={onClick} style={{ marginTop: '.5rem' }} className='btn btn-cancel' type='button'>Cancel</button>}

        </div>

        <div className='photoUpload'>
          <label htmlFor="photo">Upload Photo</label>
          <input style={{ margin: '.3rem 0' }} type="file" name="photo" onChange={(e) => setPhoto(e.target.files[0])} />
          <button onClick={() => photoUpload(restaurant._id, file)} type='button' className='btn'>Upload</button>
        </div>




      </form>
      <RestaurantFormService />


    </div>
  )
}

export default RestaurantForm
