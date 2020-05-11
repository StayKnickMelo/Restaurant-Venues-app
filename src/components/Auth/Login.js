import React, { useState, useContext, useEffect } from 'react';
import Alert from '../../layout/Alert';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {

  const authContext = useContext(AuthContext);
  const { login, isAuthenticated,error, clearError } = authContext;

  const alertContext = useContext(AlertContext);
  const {setAlert} = alertContext;


  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const {email, password} = user;

  const onChange = (e) => {

    setUser({ ...user, [e.target.name]: e.target.value });

  }

  const onSubmit = (e) => {
    e.preventDefault();

    if(email === '' || password === ''){
      setAlert('Fill in all fields', 'danger')
    }else{
      login({
        email: email.toLowerCase(),
        password
      })

      
    }

    setUser({
      email: '',
      password: ''
    });

  }

  useEffect(()=>{
    if(isAuthenticated){
      props.history.push('/userpage')
    }

    if (error) {
      setAlert(error, 'danger');
      clearError();
      
      console.log('Running')

    }
    //eslint-disable-next-line
  },[isAuthenticated, props.history, error])


  

  return (
    <div style={{maxWidth:'500px', margin:'auto'}} >
      <Alert/>
    <div className='loginContainer'>
      
      <h2 style={{ padding: '1rem' }} className='text-center success'>Login</h2>

      <form onSubmit={onSubmit} className='loginForm'>
        <label htmlFor="email">Email</label>
        <input onChange={onChange} type="text" placeholder='Email' name='email' value={email} />
        <label htmlFor="password">Password</label>
        <input onChange={onChange} type="text" placeholder='Password' name='password' value={password} />
        <input style={{ marginTop: '1rem' }} className='btn' type="submit" value='Login' />
      </form>

    
    </div>
    </div>



  )
}

export default Login
