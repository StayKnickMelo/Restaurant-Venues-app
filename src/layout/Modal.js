import React, { useState, useContext } from 'react';
import RestaurantContext from '../context/restaurantContext';
import UserContext from '../context/user/userContext';
import AuthContext from '../context/auth/authContext';

const Modal = () => {
  const restaurantContext = useContext(RestaurantContext);
  const { resIdForReview } = restaurantContext;

  const userContext = useContext(UserContext);
  const { addReview, getReviews} = userContext;

  const authContext = useContext(AuthContext);
  const {user} = authContext;


  const [review, setReview] = useState({
    title: '',
    text: '',
    rating: null
  });


  const rate = (e) => {
    setReview({ ...review, rating: e.target.value });

    document.querySelectorAll('.ratingCheckBox').forEach(checkbox => checkbox.checked = false)

    e.target.checked = true;

  }




  const closeModel = () => {
    document.querySelector('.modal').style.display = 'none';

  }

  window.addEventListener('click', (e) => {
    if (e.target.className === 'modal') {
      document.querySelector('.modal').style.display = 'none';
    }
  });

  const onChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();


    if (review.title === '' || review.text === '' || review.rating === null) {
      alert('fill in all fields')
    } else {


      review.rating = parseInt(review.rating);

      addReview(review, resIdForReview);

      getReviews(user._id);

      // getResReviews(resIdForReview);

      setReview({
        title: '',
        text: '',
        rating: null
      });

      document.querySelectorAll('.ratingCheckBox').forEach(checkbox => checkbox.checked = false)

      

      closeModel();

      

    }



  }



  return (
    <div className='modal'>
      <div className='modalBox'>

        <h2 className='text-center'>Write a Review</h2>
        <button onClick={closeModel} >&times;</button>

        <form onSubmit={onSubmit} className='loginForm'>
          <label htmlFor="title">Add a Title</label>
          <input type="text" name='title' value={review.title} onChange={onChange} />

          <label style={{ marginTop: '5px' }} htmlFor="text">Tell Us Something</label>
          <input type="text" name='text' value={review.text} onChange={onChange} />

          <span className='py-05'>Rate Us</span>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '61%' }}>

            <label style={{ paddingRight: '1px' }} htmlFor="one">1</label>
            <input className='ratingCheckBox' style={{ marginRight: '6px' }} type="checkbox" name='one' value={1} onChange={rate} />

            <label style={{ paddingRight: '1px' }} htmlFor="two">2</label>
            <input className='ratingCheckBox' style={{ marginRight: '6px' }} type="checkbox" name='two' value={2} onChange={rate} />

            <label style={{ paddingRight: '1px' }} htmlFor="three">3</label>
            <input className='ratingCheckBox' style={{ marginRight: '6px' }} type="checkbox" name='three' value={3} onChange={rate} />

            <label style={{ paddingRight: '1px' }} htmlFor="four">4</label>
            <input className='ratingCheckBox' style={{ marginRight: '6px' }} type="checkbox" name='four' value={4} onChange={rate} />

            <label style={{ paddingRight: '1px' }} htmlFor="five">5</label>
            <input className='ratingCheckBox' style={{ marginRight: '6px' }} type="checkbox" name='five' value={5} onChange={rate} />
          </div>

          <input style={{ marginTop: '5px' }} className='btn btn-review' type="submit" value='Submit' />

        </form>
      </div>

    </div>
  )
}

export default Modal
