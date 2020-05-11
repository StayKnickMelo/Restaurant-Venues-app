import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Reviews = ({match}) => {

  const id = match.params.id;

  const [reviews, setReviews] = useState(null);

  const getReviews = async (id) => {
    const reviews = await axios.get(`https://powerful-wave-70380.herokuapp.com/api/v1/restaurants/${id}/reviews`);

    setReviews(reviews.data.data);
  };

  useEffect(()=>{
    getReviews(id);
    //eslint-disable-next-line
  },[]);

  const getRating = (rating) => {

    const starPercentage = rating / 5 * 100;

    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    return starPercentageRounded;
  }

 

  return (
    <div className='res-container'>
      <Link to='/' style={{ marginBottom: '.5rem' }} className='btn btn-sm'><i className="fas fa-arrow-circle-left"></i> Back</Link>
      <div className='reviewsGridBox'>
        {reviews && reviews.length > 0 && reviews.map(review => (
          <div key={review._id} className='reviewItem reviewItemGrid'>
            <div>
              <img style={{ paddingLeft: '10px' }} src="/user.png" alt="User Icon" />
              <p className='name text-center'>{review.user.name}</p>
            </div>
            <h3 className='text-center' style={{ fontStyle: 'italic', padding: '5px 0' }}>{`“${review.title}”`}</h3>
            <div>
              <p style={{ paddingBottom: '5px' }} className='text-center'>{`“${review.text}”`}</p>
            </div>
            <div id="rating">
              <div className="stars-outer">
                <div style={{ width: getRating(review.rating) }} className="stars-inner"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews
