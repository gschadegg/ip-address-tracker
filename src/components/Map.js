import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import LocationMarker from './LocationMarker'

import styles from './Map.module.scss'

const Map = ({ cordinates }) => {
   let position 
   if(!cordinates){
    position = [0,0]
   } else{
    position = cordinates;
   }

   const ChangeView = ({ center }) => {
    const map = useMap();
    map.setView(center);
    return null;
  }

    return(
      <div className={styles['map-container']}>
        <MapContainer 
          center={ position }
          zoom={13} 
          scrollWheelZoom={false}
          style={{ height: "100%" }}>
          <ChangeView center={position} /> 
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker 
            position={ position }
            icon={ LocationMarker }>
            
          </Marker>
        </MapContainer>
      </div>
    )
}

export default Map