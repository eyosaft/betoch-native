import { NavLink, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { collection, doc, getDocs, SnapshotMetadata } from "firebase/firestore";
import { db } from "../../firebase";
import { ListLoaderSkeleton } from "../../loader/loaderSkeleton";
import { AuthContext } from "../../context/AuthContext";
import "./Placeupdate.css";
import Footer from "../../components/footer";

import backArrow from "../../Assets/back_arrow_icon.png";
import searchIcon from "../../Assets/search-btn.png";
import priceTag from "../../Assets/price_tag_dot.png";
import locationDot from "../../Assets/location_dot.png";
import mapIcon from "../../Assets/map_icon.png";
import downArrow from "../../Assets/down_arrow_icon.png";
import upArrow from "../../Assets/up_arrow_icon.png";
import roomSizeIcon from "../../Assets/room_size_icon.png";
import bedRooms from "../../Assets/number_of_rooms_icon.png";

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
  const [theUser, setTheUser] = useState("");
  const { currentUser } = useContext(AuthContext);

  const user = currentUser;
  const navigate = useNavigate();

  function getData() {
    const colRef = collection(db, "places");
    getDocs(colRef).then((snapshot) => {
      let places = [];
      snapshot.docs.forEach((place) => {
        places.push({ ...place.data(), id: place.id });
      });
      setData(places);
      setPlaceload(false);
      setTheUser(user.uid);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="update-place-header">
        <button
          className="exit-edit-places-btn"
          onClick={() => {
            navigate("/listView");
          }}
        >
          <img alt="" src={backArrow} />
        </button>
        <h2>Edit your Ads</h2>
      </div>
      {placeload === false &&
        data
          .filter((place) => place.user_id.match(theUser))
          .map((place) => (
            <div className="flat-card" key={place.id}>
              <div className="card-head">
                <p className="card-post-date"> Posted on </p>
                <NavLink to={`/edit-place/${place.id}`}>
                <img
                  alt=""
                  className="card-image"
                  src={place.place_photo_url}
                ></img>
                </NavLink>
              </div>
              <div className="card-details">
                <div className="card-name">
                  <h2 className="card-name">{place.place_name}</h2>
                </div>
                <div className="card-price">
                  <img alt="" className="card-price-tag-dot" src={priceTag} />
                  <p>
                    <strong>ብር</strong> {place.place_price.toString()
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

      {placeload === false && <Footer />}
    </>
  );
}

export default ListView;
