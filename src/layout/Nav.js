import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';

const Nav = () => {


  const authContext = useContext(AuthContext);
  const { user, signOut } = authContext;

  const userContext = useContext(UserContext);
  const { clearReviewed } = userContext;


  const onClick = () => {

    signOut();
    clearReviewed()
  }

  if (user) {
    return (
      <nav>
        <Link to='/'><img style={{width: '46%'}} src="logo.png" alt="restaurant logo"/></Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/userpage">My Accout</Link>
          </li>
          <li>
            <Link to="/manageinfo">Manage My Info</Link>
          </li>
          <li>
            <Link onClick={onClick} to="#">Sign Out</Link>
          </li>
        </ul>
      </nav>

    )
  } else {
    return (
      <nav>
        <Link to='/'><img style={{ width: '46%' }} src="logo.png" alt="restaurant logo" /></Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    )
  }

}

export default Nav
