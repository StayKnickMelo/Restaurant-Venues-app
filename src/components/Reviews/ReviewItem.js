import React from 'react';

const ReviewItem = ({ review, showAll }) => {

  const {
    text,
    title,
    // restaurant,
    user,
    rating

  } = review;

  const getRating = (rating) => {

    const starPercentage = rating / 5 * 100;

    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    return starPercentageRounded;
  }


  return (
    
      <div className='reviewItem'>
        <div>
          <img style={{ paddingLeft: '10px' }} src="/user.png" alt="User Icon" />
          <p className='name text-center'>{user.name}</p>
        </div>
        <h3 className='text-center' style={{ fontStyle: 'italic', padding: '5px 0' }}>{`“${title}”`}</h3>
        <div>
          <p style={{ paddingBottom: '5px' }} className='text-center'>{`“${text}”`}</p>
        </div>
        <div id="rating">
          <div className="stars-outer">
            <div style={{ width: getRating(rating) }} className="stars-inner"></div>
          </div>
        </div>
      </div>
  )
}

export default ReviewItem
