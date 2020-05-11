import React from 'react';
import GoogleMapReact from 'google-map-react';

const Pin = () => <img src="/pin.png" alt="location"/>

const RestaurantMap =({location})=> {

  const zoom = 15;

  const {coordinates} = location;

  const center = {
    lat: coordinates[1],
    lng: coordinates[0]

  }

  
    return (

      location &&
      // Important! Always set the container height explicitly
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAUiC_T0aD6l7_PuVDlPBTqqowi9Q3Po_E" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Pin
            lat={center.lat}
            lng={center.lng}
          />
        </GoogleMapReact>
      </div>
    );
}

export default RestaurantMap;