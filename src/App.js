import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import setAuthToken from './utils/setAuthToken';

import Restaurants from './components/Restaurants/Restaurants';
import Restaurant from './components/Restaurants/Restaurant';
import RestaurantState from './context/RestaurantState';
import Nav from './layout/Nav';
import About from './layout/About';
import Reviews from './components/Reviews/Reviews';
import ManageInfo from './components/User/ManageInfo';

// User
import UserState from './context/user/UserState';

// Auth
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AuthState from './context/auth/AuthState';
import UserPage from './components/Auth/UserPage';

import AlertState from './context/alert/AlertState';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));

}

function App() {
  return (
    <AlertState>
      <AuthState>
        <RestaurantState>
          <UserState>
            <Router>
              <Nav />
              <div className="App">
                {/* <Restaurants/> */}
                <Switch>
                  <Route exact path='/' component={Restaurants} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/restaurant/:id' component={Restaurant} />
                  <Route exact path='/restaurant/:id/reviews' component={Reviews} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/userpage' component={UserPage} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/manageinfo' component={ManageInfo}/>
                </Switch>
              </div>
            </Router>
          </UserState>
        </RestaurantState>
      </AuthState>
    </AlertState>

  );
}

export default App;
