import React, { useContext, useState } from 'react';
import getStarRating from '../../utils/getStarRating';
import UserContext from '../../context/user/userContext';
import AlertContext from '../../context/alert/alertContext';


const UserReviewItem = ({ review }) => {

  const userContext = useContext(UserContext);
  const { deleteReview, updateReview } = userContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [toEdit, setToEdit] = useState(false);


  const [reviewToEdit, setReviewToEdit] = useState({
    title: '',
    text: '',
    rating: null
  });

  const onChange = (e) => {
    setReviewToEdit({ ...reviewToEdit, [e.target.name]: e.target.value });
  };


  const onClick = () => {

    if (reviewToEdit.title === '' || reviewToEdit.text === '' || reviewToEdit.rating === null) {
      alert('fill in all fields')
    } else {

      reviewToEdit.rating = parseInt(reviewToEdit.rating);

      updateReview(reviewToEdit, review._id, review.user);

      setReviewToEdit({
        title: '',
        text: '',
        rating: null
      });
      setToEdit(false)
      document.querySelectorAll('.ratingCheckBox').forEach(checkbox => checkbox.checked = false)

    }



  }


  const rate = (e) => {
    setReviewToEdit({ ...reviewToEdit, rating: e.target.value });

    document.querySelectorAll('.ratingCheckBox').forEach(checkbox => checkbox.checked = false)

    e.target.checked = true;

  }




  return (



    <div className='reviewBox'>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='reviewBtns'>
          {toEdit ? <button style={{ background: 'gray' }} onClick={() => setToEdit(false)}>Cancel</button> : <button onClick={() => {
            setToEdit(true);
            setReviewToEdit({

              title: review.title,
              text: review.text,
              rating: review.rating
            });
          }}>Edit</button>}
          <button onClick={() => {
            deleteReview(review);
            setAlert('Review Deleted', 'success')

          }}>&times;</button>
        </div>
        <span className='text-center res-name' style={{ fontStyle: 'italic' }}>{review.restaurant.name}</span>
      </div>

      {toEdit ?
        (<div>
          <div>
            <label style={{ fontSize: '1.2rem' }} htmlFor='title'>Title: </label>
            <input onChange={onChange} className='inputEditReview py-05' type="text" value={reviewToEdit.title} name='title' />
          </div>

          <div>
            <label style={{ fontSize: '1.2rem' }} htmlFor="text">Text: </label>
            <input onChange={onChange} className='inputEditReview py-05' type="text" value={reviewToEdit.text} name='text' />
          </div>


          <div style={{ display: 'flex' }}>
            <span style={{ fontSize: '1.2rem' }} className='py-05'>Rate Us: </span>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30%' }}>

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
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={onClick} className='btn'>Update</button>
          </div>

        </div>) :

        (<div>
          <p style={{ fontSize: '1.2rem' }} className='py-05'>Title: {review.title}</p>
          <p style={{ fontSize: '1.2rem' }} className='py-05'>Text: {review.text}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ fontSize: '1.2rem' }} className='py-05'>Rating: </p>
            <div style={{ paddingLeft: '2px' }} id="rating">
              <div className="stars-outer">
                <div style={{ width: getStarRating(review.rating) }} className="stars-inner"></div>
              </div>
            </div>
          </div>
        </div>)}
    </div>

  )
}

export default UserReviewItem
