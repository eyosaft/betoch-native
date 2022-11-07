import React, { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGl, { Marker, Map, NavigationControl } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "./Map.css";

import PinPoint from "../../Assets/pinPoint_icon.png";

const Mapbox = ({ setPlaceAddress2 }) => {
  const [lng, setLng] = useState(38.76263702929646);
  const [lat, setLat] = useState(9.011036407704651);
  const [placeaddress, setPlaceAddress] = useState();


useEffect(() => {
  asyncCall();
}, [placeaddress, lat, lng])
  async function asyncCall() { 
    const response = await fetch(
      "https://www.mapquestapi.com/geocoding/v1/reverse?key=4rJso0AjKD4A8JGGyAa8tv9wG0Ei0A5p&location=" +
        lat +
        "%2C" +
        lng +
        "&outFormat=json&thumbMaps=false"
    );
    
    const ldata = await response.json();
    const cityName = ldata.results[0].locations[0].adminArea4;
    const address = ldata.results[0].locations[0].street + "," + cityName;
    setPlaceAddress(address);
    setPlaceAddress2(placeaddress,lng, lat);
    // const streetName = ldata.results[0].locations[0].street;
    // const cityName = ldata.results[0].locations[0].adminArea3;
    // const selectedAddress = streetName + "," + " " + cityName;
    // setPlaceAddress(selectedAddress);
    // console.log(placeaddress)
    // console.log(ldata.results[0].locations)

    console.log(ldata)
   
  }

  // useEffect(()=> {
  //   asyncCall();
  // })

  return (
    <>
      <Map
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setLng(e.lngLat.lng);
          setLat(e.lngLat.lat);
          setPlaceAddress2(placeaddress,lng, lat);
        }}
        initialViewState={{
          longitude: 38.763611,
          latitude: 8.9999,
          zoom: 11,
        }}
        style={{
          width: "100%",
          height: "40vh",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoiZXlvc2FmdCIsImEiOiJjbDdoZTI2eW0wZGx2NDBsOWkwZWc4dnVjIn0.jwI1K4KGcod27XcI6EJJMQ"
      >
        <Marker
          draggable
          onDragEnd={(e) => {
            setLng(e.lngLat.lng);
            setLat(e.lngLat.lat);
          }}
          longitude={lng}
          latitude={lat}
        >
          <div>
            <img className="pin-point" src={PinPoint} />
          </div>
        </Marker>
      </Map>

      <div
        style={{
          position: "absolute",
          top: "60vh",
        }}
      >
       
      </div>
    </>
  );
};

export default Mapbox;

// const countryName = ldata.results[0].locations[0].adminArea1;
// const streetName = ldata.features[0].text
