import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alert from '../../layout/Alert';

const ManageInfo = (props) => {

  const authContext = useContext(AuthContext);
  const { user, updatePassword, updateInfo, isAuthenticated, error, clearError, updateSuccess, clearUpdateSuccess } = authContext;


  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error) {

      if (error === 'Duplicate Fileds Value') {
        setAlert('Entered Email Already Taken', 'danger');
        // clearError();

      } else {
        setAlert(error, 'danger');
        // clearError();
      }
      clearError();
      console.log('Running')
      
    }
    //eslint-disable-next-line
  }, [error]);


  useEffect(() => {
    if (!isAuthenticated || !user) {
      props.history.push('/login');
      console.log('running');

    }
  }, [isAuthenticated, props.history, user]);

  useEffect(() => {
    if (updateSuccess) {
      setAlert(updateSuccess, 'success');
      clearUpdateSuccess();
      console.log('running');
    }
    //eslint-disable-next-line
  }, [updateSuccess]);


  const [updPassword, setUpdPassword] = useState(false);
  const [updInfo, setUpdInfo] = useState(false);

  const [infoUpdate, setInfo] = useState({
    name: '',
    email: ''
  });

  const [passwordUpd, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const onChangePassword = (e) => {
    setPassword({ ...passwordUpd, [e.target.name]: e.target.value });

  }

  const onChangeInfo = (e) => {
    setInfo({ ...infoUpdate, [e.target.name]: e.target.value });
  }

  const onSubmitPassword = (e) => {
    e.preventDefault();

    if (passwordUpd.currentPassword === passwordUpd.newPassword) {
      setAlert(`New Password can't be the same as the old one`, 'danger')
    } else if (passwordUpd.newPassword !== passwordUpd.confirmPassword) {
      setAlert(`Passwords do not match`, 'danger')
    } else {
      const { currentPassword, newPassword } = passwordUpd;
      const updatedPassword = {
        currentPassword,
        newPassword
      }
      // setAlert('Password Updated', 'success');
      updatePassword(updatedPassword);

      setPassword({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }

  const onSubmitInfo = (e) => {
    e.preventDefault();

    const emailRegEx = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    if (infoUpdate.name === '' || infoUpdate.email === '') {
      setAlert('Please fill in all fields', 'danger');
    } else if (!infoUpdate.email.match(emailRegEx)) {
      setAlert('Invalid Email', 'danger');
    } else {
      updateInfo(infoUpdate);
    }


  }



  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Alert />


      <div className='manageInfo-container'>

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
          <h2 className='text-center'>Hello {user && user.name}</h2>
          <div style={{ margin: '1rem 0', display: 'flex' }}>
            <button onClick={() => {
              setUpdPassword(true)
              setUpdInfo(false);
            }} style={{ width: '100%' }} className='btn btn-update'>Update Password</button>
            <button onClick={() => {
              setUpdPassword(false)
              setUpdInfo(true);
            }} style={{ width: '100%' }} className='btn btn-review'>Update Info</button>
          </div>

          {updPassword && <form onSubmit={onSubmitPassword} className='updateInfo-container' >
            <button onClick={() => {
              setUpdInfo(false)
              setUpdPassword(false)
            }} className='cancel-update'>&times;</button>

            <label htmlFor="currentPassword">Current Password</label>
            <input style={{ margin: '.5rem 0' }} type="password" name='currentPassword' onChange={onChangePassword} />

            <label htmlFor="newPassword">New Password</label>
            <input style={{ margin: '.5rem 0' }} type="password" name='newPassword' onChange={onChangePassword} minLength={6} />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input style={{ margin: '.5rem 0' }} type="password" name='confirmPassword' onChange={onChangePassword} minLength={6} />

            <input style={{ width: '100%' }} className='btn' type="submit" value='Update' />

          </form>}

          {updInfo && <form onSubmit={onSubmitInfo} className='updateInfo-container' >
            <button onClick={() => {
              setUpdInfo(false)
              setUpdPassword(false)
            }} className='cancel-update'>&times;</button>

            <label htmlFor="name">Manage Your Name</label>
            <input style={{ margin: '.5rem 0' }} type="text" name='name' onChange={onChangeInfo} />

            <label htmlFor="email">Manage Email</label>
            <input style={{ margin: '.5rem 0' }} type="text" name='email' onChange={onChangeInfo} />

            <input style={{ width: '100%' }} className='btn' type="submit" value='Update' />

          </form>}



        </div>

      </div>
    </div>
  )
}

export default ManageInfo
