import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReviewItem from '../Reviews/ReviewItem';

import Modal from '../../layout/Modal';







import UserContext from '../../context/user/userContext';

import RestaurantContext from '../../context/restaurantContext';

const RestaurantItem = ({ restaurant }) => {

  
  const userContext = useContext(UserContext);
  const { alredyReviewed } = userContext;
  const restaurantContext = useContext(RestaurantContext);
  const { getResIdForReview} = restaurantContext;


  // const [reviews, setReviews] = useState(null);
  const [reviewsCut, setReviewsCut] = useState(null);
  

  const {
    id,
    name,
    description,
    // delivery,
    // website,
    // phone,
    // email,
    // averageBill,
    photo,
    cuisines
  } = restaurant

  useEffect(() => {
    getReviews(id);

    return ()=>{
      console.log('UMOUNTED')
    }
    //eslint-disable-next-line
  }, [userContext]);

  const getReviews = async (id) => {
    const reviews = await axios.get(`https://powerful-wave-70380.herokuapp.com/api/v1/restaurants/${id}/reviews`);

    const reviewsToCut = [...reviews.data.data];

    // setReviews(reviews.data.data);

    setReviewsCut(reviewsToCut.splice(0, 4));
  };

  const showAll = () => {
    return reviewsCut.length === 4 ? true :
      false
  }

  const showModal = () => {
    document.querySelector('.modal').style.display = 'flex';
    getResIdForReview(id);
  }
  


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

  return (
    <div>
      <div className='res-item'>
        <div style={{ width: "100%", height: "100%" }}>
          <img style={{ width: "100%", height: "100%" }} src={`https://powerful-wave-70380.herokuapp.com/uploads/${photo}`} alt="Restaurant" />
        </div>
        <div className='info'>
          <div>
            <h2 style={{ marginBottom: '0.5rem' }}>{name}</h2>
            <p style={{ fontStyle: "italic" }}>{description}</p>
          </div>
          <div className='cuisine'>
            <h3> <i className="fas fa-utensils"></i> Cuisines:</h3>
            {
              cuisines.map((cuisine, index) => (<div key={index} style={{ display: 'flex' }}>
                <div ><img style={{ width: '45%' }} src={flag(cuisine)} alt='cuisine'></img></div>
                <p > {cuisine} </p>
              </div>))
            }
          </div>
          <div>
            <Link className='btn' to={`restaurant/${id}`}>More</Link>
            {alredyReviewed && !alredyReviewed.includes(id) && <button onClick={ showModal} style={{fontSize:'1rem'}} className='btn btn-review'>Write A Review</button>}
          </div>

        </div>
      </div>


      {reviewsCut && reviewsCut.length > 0 &&
        <div className={showAll() ? 'reviews-box' : ''}>

          <div className='reviews-container'>{reviewsCut.map(review => (
            <ReviewItem key={review._id} review={review} showAll={reviewsCut.length === 4 ? true : false} />
          ))}</div>
          {showAll() &&
            <Link to={`restaurant/${id}/reviews`} className=' reviews-all'>Read All <i className="fas fa-arrow-circle-down"></i></Link>
          }

        </div>
      }

      <Modal />

    </div>
  )
}

export default RestaurantItem




