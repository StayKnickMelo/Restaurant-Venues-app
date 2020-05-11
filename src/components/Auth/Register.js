import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContex from '../../context/alert/alertContext';
import Alert from '../../layout/Alert';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { register, isAuthenticated, error } = authContext;

  const alertContext = useContext(AlertContex);
  const { setAlert } = alertContext;


  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [owner, setOwner] = useState(false);
  const [user, setUser] = useState(false);

  const { email, password, confirmPassword, name } = newUser;

  const onChange = (e) => {

    setNewUser({ ...newUser, [e.target.name]: e.target.value });

  }

  const onSubmit = (e) => {
    const emailRegEx = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Fill in all fields', 'danger')
    } else if (password !== confirmPassword) {

      setAlert('Passwords do not match', 'danger');

    } else if (!email.match(emailRegEx)) {
      
      setAlert('Invalid Email', 'danger')

    } else {

      const user = { ...newUser };
      if (owner) {
        user.role = 'owner'
      } else {
        user.role = 'user'
      }

      register(user);


    }

    // setNewUser({
    //   name: '',
    //   email: '',
    //   password: '',
    //   confirmPassword: ''
    // });

    setOwner(false);
    setUser(false);

  }

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/userpage')
    }

  }, [isAuthenticated, props.history]);


  useEffect(()=>{
    if(error){
      if (error === 'Duplicate Fileds Value'){
        setAlert('Entered Email Already Taken', 'danger');

      }

    }

  },[error])




  return (

    <div style={{ maxWidth: '500px', margin: 'auto' }} >
      <Alert />
      <div className='loginContainer'>
        <h2 style={{ padding: '1rem' }} className='text-center success'>Register</h2>

        <form onSubmit={onSubmit} className='loginForm'>
          <label htmlFor="name">Name</label>
          <input onChange={onChange} type="text" placeholder='Name' name='name' value={name} />
          <label style={{ paddingTop: '.7rem' }} htmlFor="email">Email</label>
          <input onChange={onChange} type="text" placeholder='Email' name='email' value={email} />
          <label style={{ paddingTop: '.7rem' }} htmlFor="password">Password</label>
          <input onChange={onChange} type="text" placeholder='Password' name='password' value={password} minLength={6} />
          <label style={{ paddingTop: '.7rem' }} htmlFor="confirmPassword">Confirm Password</label>
          <input onChange={onChange} type="text" placeholder='Confirm Password' name='confirmPassword' value={confirmPassword} />

          <div className='roleBox'>
            <div>
              <label style={{ paddingRight: '.5rem' }} htmlFor="owner">Owner</label>
              <input onChange={() => {
                if (user) {
                  setUser(false)
                }
                setOwner(!owner)
              }} type="checkbox" name='owner' checked={owner} />
            </div>

            <div>
              <label style={{ paddingRight: '.5rem' }} htmlFor="user">User</label>
              <input onChange={() => {
                if (owner) {
                  setOwner(false);
                }
                setUser(!user)
              }} type="checkbox" name='user' checked={user} />
            </div>

          </div>

          <input style={{ marginTop: '1rem' }} className='btn' type="submit" value='Sign Up' />
        </form>
      </div>
    </div>
  );
}

export default Register
