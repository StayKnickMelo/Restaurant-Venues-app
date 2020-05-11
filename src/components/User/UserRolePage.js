import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/user/userContext';

import UserReviewItem from './UserReviewItem';


import Alert from '../../layout/Alert';



const UserRolePage = ({ user }) => {

  const userContext = useContext(UserContext);
  const { getReviews, reviews } = userContext;

  useEffect(() => {
    getReviews(user._id);
    //eslint-disable-next-line
  }, []);



  return (
    <div className='userContainer'>
      <Alert/>
      <h2 className='text-center'>Hello {user.name}</h2>

      {reviews && reviews.length > 0 ? (
        <div>

          {reviews && reviews.map(review => (
            <UserReviewItem key={review._id} review={review} />

          ))}






        </div>
        
      ) : <h1>No Reviews ...</h1> }

      

      {/* <div>

        {reviews && reviews.map(review => (
          <UserReviewItem key={review._id} review={review}/>
          
        ))}

        




      </div> */}


    </div>

  )
}

export default UserRolePage
