import React, {useContext} from 'react';
import AlertContext from '../context/alert/alertContext';


const Alert = () => {

  const alertcontext = useContext(AlertContext);

  const {alert} = alertcontext;

  return (
    alert !== null &&
    <div className={`alert alert-${alert.type}`}>
      <i className='fas fa-exclamation-circle'></i> {alert.message}
    </div>
  )
}

export default Alert
