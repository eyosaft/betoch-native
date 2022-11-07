import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import ReactMapGl, { Marker, Map, NavigationControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./mapView.css";
import pin from "../Assets/pin_icon.png";
import close from "../Assets/close_icon.png";
import priceTag from "../Assets/price_tag_dot.png";
import locationDot from "../Assets/location_dot.png";
import descriptionDot from "../Assets/description_dot.png";
import loadingLogo from "../Assets/Loading_Logo.gif";
import { collection, doc, getDocs, SnapshotMetadata } from "firebase/firestore";
import { db } from "../firebase";


import mapIcon from "../Assets/map_icon.png";
import listView from "../Assets/list_icon.png";
import downArrow from "../Assets/down_arrow_icon.png";
import upArrow from "../Assets/up_arrow_icon.png";
import searchIcon from "../Assets/search-btn.png";
import filterIcon from "../Assets/filter_icon.png";
// const map = new mapboxgl.Map({attributionControl: false})
// .addControl(new mapboxgl.AttributionControl({
// customAttribution: 'Map design by me'
// }));



function MapView() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [isOff, setIsOff] = useState(true);
  const [places, setPlaces] = useState([]);

  const [isActive, setIsActive] = useState(false);


  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);
    setIsOff(!isOff);
    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const [data, setData] = useState([]);
  const [placeload, setPlaceload] = useState(true);
  const [priceRange, setPriceRange] = useState(6000000);
  const [query, setQuery] = useState("");

  function getData() {
    const colRef = collection(db, "places");
    getDocs(colRef).then((snapshot) => {
      let places = [];
      snapshot.docs.forEach((place) => {
        places.push({ ...place.data(), id: place.id });
      });
      setData(places);
      setPlaceload(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const [filterisshown, setFilterisShown] = useState(false);
  const [filterisOff, setFilterisOff] = useState(true);

  const openFilter = (event) => {
    // 👇️ toggle shown state
    setFilterisShown((current) => !current);
    setFilterisOff(!filterisOff);
    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <>
      <div className="card-input-box map-view">
        <img alt="" className="search-icon" src={searchIcon} />
        <input
          type="text"
          placeholder="Search Places"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        <button className="filter-btn" onClick={openFilter}>
          <img src={filterIcon} />
        </button>
      </div>
      {filterisshown && (
        <div className="map-filter-price more-map-view">
          <div className="search-by-price">
            <h3>Select a Price Range</h3>
            <input
              type="range"
              name="price-range"
              min="1000"
              max="6001000"
              step="500000"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />
            <p>{priceRange}</p>
            {/* <div className="price-bar-container">
             
            </div> */}
          </div>
          {isShown && (
            <div className="add-place-description">
              <h3>Place Description</h3>
              <div className="add-place-description-items">
                <div className="add-place-size">
                  <p>
                    Size per m<sup>2</sup>
                  </p>
                  <input
                    type="number"
                    onChange={(e) => {
                      // setPlaceSize(e.target.valueAsNumber);
                    }}
                  />
                </div>
                <div className="add-bedrooms">
                  <p>Bedrooms</p>
                  <input
                    type="number"
                    onChange={(e) => {
                      // setBedrooms(e.target.valueAsNumber);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          <button onClick={handleClick} className="price-range-toggle">
            {isOff ? (
              <img alt="" src={downArrow} />
            ) : (
              <img alt="" src={upArrow} />
            )}
            {isOff ? "More Filter" : "Less Filter"}
          </button>
        </div>
      )}

      <Map
        initialViewState={{
          longitude: 38.763611,
          latitude: 8.97,
          zoom: 11,
          pitch: 30,
          bearing: -20,
        }}
        style={{
          width: "100%",
          height: "92.5vh",
          position: "fixed",
          top: "60px",
          zIndex: "-1000",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoiZXlvc2FmdCIsImEiOiJjbDdoZTI2eW0wZGx2NDBsOWkwZWc4dnVjIn0.jwI1K4KGcod27XcI6EJJMQ"
      >
        {placeload === false &&
          data.map((place) => (
            <Marker
              key={place.id}
              latitude={place.lat}
              longitude={place.lng}
             
             
            >
              <div className="marker">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPlace(place);
                  
                  }}
                >
                  <p className="marker-currency">ብር</p>
                  {place.place_price
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </button>
                <img alt="" src={pin} />
              </div>
            </Marker>
          ))}

        {placeload === true && (
          <div className="map-loader-container">
            <img className="map-loader" src={loadingLogo}></img>
          </div>
        )}
        <div style={{ position: "absolute" }}>
          <NavigationControl position="top-left" />
        </div>
      </Map>

      {selectedPlace ? (
        <div className="locations">
          <div className="location-details">
            <button
              className="close-btn"
              onClick={(e) => {
                setSelectedPlace(null);
              }}
            >
              <img alt="" src={close}></img>
            </button>

            <NavLink to={`/place-details/${selectedPlace.id}`}>
              <div className="place-images">
                <img
                  alt=""
                  className="image"
                  src={selectedPlace.place_photo_url}
                ></img>
                {/* {isShown && (
                        <> 
                            <img className="image" src={selectedFlat.images[1]}></img>
                        </>
                        )} */}
              </div>
            </NavLink>

            <div className="place-details">
              <div className="details-head">
                <p className="place-dtPost">Posted on</p>
                <div className="details-list">
                  <h2 className="place-name">{selectedPlace.place_name}</h2>
                </div>
                <div className="place-price">
                  <img alt="" className="price-tag-dot" src={priceTag} />
                  <p>
                    {" "}
                    {selectedPlace.place_price
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              </div>
              <div className="details-bottom">
                <div className="place-address">
                  <img alt="" className="location-dot" src={locationDot} />
                  <p> {selectedPlace.place_address} </p>
                </div>
                <div className="place-description">
                  <img
                    alt=""
                    className="description-dot"
                    src={descriptionDot}
                  />
                  <div className="">
                    <p>
                      Place size {selectedPlace.place_size} m<sup>2</sup>
                    </p>
                    <p>Bedrooms {selectedPlace.place_bedrooms}</p>
                  </div>
                </div>
                {/* {isShown && (
                        <> 
                            <p>hello world</p>
                        </>
                        )} */}
              </div>
            </div>

            {/* <button onClick={handleClick} className="system-list-item more-btn">
              {isOff ? "Show More" : "Show Less"}
            </button> */}
          </div>
        </div>
      ) : null}
      <div className="footer">
        <div className="switcher">
          <div className="switcher-items">
            <NavLink to="/listView" className="from-map-switch-list">
              <img alt="" className="list-icon" src={listView} /> List View
            </NavLink>
          </div>
        </div>
      </div>

      {/* 
      <NavLink to="/login">
          
          
        </NavLink> */}
    </>
  );
}

export default MapView;
