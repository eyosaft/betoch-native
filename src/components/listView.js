import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./listView.css";
import { collection, query ,limit, doc, getDocs, SnapshotMetadata } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "./footer";
import { ListLoaderSkeleton } from "../loader/loaderSkeleton";

import searchIcon from "../Assets/search-btn.png";
import priceTag from "../Assets/price_tag_dot.png";
import locationDot from "../Assets/location_dot.png";
import descriptionDot from "../Assets/description_dot.png";
import downArrow from "../Assets/down_arrow_icon.png";
import upArrow from "../Assets/up_arrow_icon.png";
import roomSizeIcon from "../Assets/room_size_icon.png";
import bedRooms from "../Assets/number_of_rooms_icon.png";

import mapIcon from "../Assets/map_icon.png";
import listView from "../Assets/list_icon.png";

function ListView() {
  const [isShown, setIsShown] = useState(false);
  const [isOff, setIsOff] = useState(true);

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);
    setIsOff(!isOff);
    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const [data, setData] = useState([]);
  const [placeload, setPlaceload] = useState(true);
  const [queryi, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState(6000000);

  function getData() {
    const colRef = collection(db, "places")
    const test = query(colRef, limit(10))
    getDocs(test).then((snapshot) => {
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

  // const handlepriceRange =()=> {
  //     const pricedData = data.filter((price) => price.place_price < priceRange)
  //     setPriced(pricedData)
  // }

  return (
    <>
      <div className="card-search">
        <div className="card-input-box">
          <img alt="" className="search-icon" src={searchIcon} />
          <input
            type="text"
            placeholder="Search Places"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div>
        {isShown && (
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
            {/* <div className="price-bar-container">
             
            </div> */}
            <p>{priceRange}</p>
          </div>
        )}
        <button onClick={handleClick} className="price-range-toggle">
          {isOff ? (
            <img alt="" src={downArrow} />
          ) : (
            <img alt="" src={upArrow} />
          )}
          {isOff ? "Show Price Range" : "Close Price Range"}
        </button>
      </div>

      {placeload === false &&
        data
          .filter(
            (place) =>
              place.place_name.includes(queryi) && place.place_price < priceRange
          )
          .map((place) => (
            <div className="flat-card" key={place.id}>
              <div className="card-head">
                <p className="card-post-date"> Posted on </p>
                <NavLink to={`/place-details/${place.id}`}>
                  <img
                    alt=""
                    className="card-image"
                    src={place.place_photo_url[0]}
                  ></img>
                </NavLink>
              </div>
              <div className="card-details">
                <div className="card-name-container">
                  <h2 className="card-name">{place.place_name}</h2>
                </div>
                <div className="card-price">
                  <img alt="" className="card-price-tag-dot" src={priceTag} />
                  <p>
                    <strong>ብር</strong>{" "}
                    {place.place_price
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              </div>
              <div className="card-address">
                <img alt="" className="card-location-dot" src={locationDot} />
                <p> {place.place_address} </p>
              </div>
              <div className="card-decription">
                {/* <img alt="" className="card-description-dot" src={descriptionDot} /> */}
                <div className="place-spec">
                  <p>
                    <img src={roomSizeIcon} /> Place size {place.place_size} m
                    <sup>2</sup>
                  </p>
                  <p>
                    <img src={bedRooms} /> Bedrooms {place.place_bedrooms}
                  </p>
                </div>
              </div>

              {isShown && (
                <>
                  {/* <p>
                      Data
                    </p> */}
                </>
              )}
              {/* <button onClick={handleClick} className="system-list-item more-btn">
                      { isOff ? 'Show More' : 'Show Less' }
                    </button> */}
            </div>
          ))}
      {placeload === true && <ListLoaderSkeleton />}

      <div className="footer">
        <div className="switcher">
          <div className="switcher-items">
            <NavLink to="/" className="from-list-switch-map">
              <img alt="" className="map-icon" src={mapIcon} />
              Map View
            </NavLink>

            {/* <NavLink to="/listView" className="from-list-switch-list">
              <img alt="" className="list-icon" src={listView} /> List View
            </NavLink> */}
          </div>
        </div>
      </div>
      {placeload === false && <Footer />}
    </>
  );
}

export default ListView;
