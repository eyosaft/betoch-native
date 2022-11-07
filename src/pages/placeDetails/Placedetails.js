import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink, useParams, useLocation } from "react-router-dom";
import { DetailsLoaderSkeleton } from "../../loader/loaderSkeleton";
// import ReactMapGl, { Marker, Map, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Modal from "react-modal";
import { db } from "../../firebase";
import { doc, getDoc} from "firebase/firestore";
import Footer from "../../components/footer";
import "./Placedetails.css";
import Map from "../../components/map";

import backArrow from "../../Assets/back_arrow_icon.png";
import priceTag from "../../Assets/price_tag_dot.png";
import locationDot from "../../Assets/location_dot.png";
import descriptionDot from "../../Assets/description_dot.png";
import mapIcon from "../../Assets/location_marker_icon.png";
import userIcon from "../../Assets/user_icon.png";
import phoneIcon from "../../Assets/phone_icon.png";
import roomSizeIcon from "../../Assets/room_size_icon.png";
import bedRooms from "../../Assets/number_of_rooms_icon.png";
import close from "../../Assets/close.png";

import back from "../../Assets/backward_image.png";
import next from "../../Assets/forward_image.png";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function PlaceDetails() {
  const [placeload, setPlaceload] = useState(true);
  const [place, setPlace] = useState({});
  const [phone, setPhone] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const navigate = useNavigate();
  const placeId = useParams();

  //   useEffect(() => {
  //     // getData();
  //   }, [placeId]);

  // console.log(place)
  //   collection("places").doc(placeId).get().then((snapshot) => {
  //     setPlace(snapshot.data())
  //     console.log(place)
  //   }).catch((e) => console.log(e))

  // get doc

  // const test = ["hello", "hey", "hi"];

  useEffect(() => {
    const docRef = doc(db, "places", placeId.id);
    getDoc(docRef).then((place) => {
      setPlace(place.data());
      setPlaceload(false);
    });
  }, [placeId]);

  useEffect(() => {
    fetchUserdata();
  });

  const fetchUserdata = async () => {
    const docRef = doc(db, "users", place.user_id);
    const docSnap = await getDoc(docRef);

    const userinfo = docSnap.data();
    const userPhone = userinfo.user_phone;
    const userFirstname = userinfo.first_name;
    const userLastname = userinfo.last_name;
    setPhone(userPhone);
    setFirstname(userFirstname);
    setLastname(userLastname);
    // doc.data() will be undefined in this case
    //   console.log("No such document!");
  };
  // const NameAv = Array.from(firstname)[0]

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const staticMap = `https://api.mapbox.com/styles/v1/mapbox/streets-v9/static/pin-l+000000(${place.lng},${place.lat})/${place.lng},${place.lat},14/300x130?access_token=pk.eyJ1IjoiZXlvc2FmdCIsImEiOiJjbDdoZTI2eW0wZGx2NDBsOWkwZWc4dnVjIn0.jwI1K4KGcod27XcI6EJJMQ`;

  // pin-l-h+555555

  const [mapModal, setMapModal] = useState(false);

  function openMap() {
    setMapModal(true);
  }

  function closeMap() {
    setMapModal(false);
  }

  const [ImageModal, setImageModal] = useState(false);

  function openImage() {
    setImageModal(true);
  }

  function closeImage() {
    setImageModal(false);
  }

  const buttonStyle = {
    display: "none",
  };

  const properties = {
    prevArrow: <button style={{ ...buttonStyle }}>back</button>,
    nextArrow: <button style={{ ...buttonStyle }}>next</button>,
  };

  

  return (
    <>
      {placeload === false && (
        <>
          <div className="place-details">
            <div className="flat-card" key={place.id}>
              <div className="place-details-header">
                <button
                  className="exit-edit-user-btn"
                  onClick={() => {
                    navigate("/listView");
                  }}
                >
                  <img alt="" src={backArrow} />
                </button>
                <h2 className="place-details-title">Place Details</h2>
              </div>

              <div className="card-head">
                <p className="card-post-date"> Posted on | 4 Nov 2022 </p>
                {/* <NavLink to={`/place-details/${place.id}`}> */}

                <div className="slide-container">
                  <Slide {...properties} indicators autoplay={false}>
                    {place.place_photo_url.map((url) => (
                      <div className="each-slide">
                        <button
                          onClick={() => openImage()}
                          className="more-images"
                        >
                          <div
                            className="image-slider"
                            style={{
                              width: "100%",
                              height: "40vh",
                              backgroundImage: `url(${url})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              objectFit: "contain",
                              backgroundPosition: "center",
                              borderRadius: "12px",
                            }}
                          >
                            {/* <img key={url} src={url} className="image-style" /> */}

                            {/* <span>Slide {"url"}</span> */}
                          </div>
                        </button>
                      </div>
                    ))}
                  </Slide>
                </div>

                <Modal className="images-modal" isOpen={ImageModal}>
                  <div className="more-images-modal-header">
                    <div className="images-container-close">
                      <img src={close} onClick={() => closeImage()} />
                    </div>
                  </div>
                  <div className="more-images-container">
                    {place.place_photo_url.map((url) => (
                      <div className="testing"
                        // key={url}
                        // style={{
                        //   width: "100px",
                        //   height: "100px",
                        //   backgroundImage: `url(${url})`,
                        //   backgroundRepeat: "no-repeat",
                        //   backgroundSize: "cover",
                        //   backgroundPosition: "center",
                        //   borderRadius: "12px",
                        // }}
                      >
                        <img
                          src={url}
                          style={{
                            width: "165px",
                            margin: "3px",
                            height: "150px",
                            backgroundImage: `url(${url})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "12px",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </Modal>
              </div>

              <div className="card-details">
                <div className="card-name">
                  <h2 className="place-name-item">{place.place_name}</h2>
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
              <div className="card-decription">
                {/* <img alt="" className="card-description-dot" src={descriptionDot} /> */}
                <div className="place-spec">
                  <p>
                    <img src={roomSizeIcon} /> {place.place_size}
                    <strong>
                      m<sup>2</sup>
                    </strong>
                    of living space
                  </p>
                  <p>
                    <img src={bedRooms} /> {place.place_bedrooms} Bedrooms
                  </p>
                </div>
              </div>
              <div className="place-details-map-view">
                <h3> Where it is</h3>
                <img
                  className="static-Mapbox-map"
                  alt="static Mapbox map"
                  src={staticMap}
                  onClick={() => openMap()}
                />
                <Modal className="Map-modal" isOpen={mapModal}>
                  <div className="Map-modal-header">
                    <div className="map-container-close">
                      <img src={close} onClick={() => closeMap()} />
                    </div>
                  </div>
                  <Map plng={place.lng} plat={place.lat} />
                </Modal>
                <div className="card-address">
                  <img alt="" className="card-location-dot" src={locationDot} />
                  <p> {place.place_address} </p>
                </div>
              </div>
              <div className="place-detail-contact">
                <h3>Contact Details</h3>
                <div className="place-detail-contact-items">
                  <div className="place-contact-name">
                    <div>
                      <img src={userIcon} />
                    </div>
                    <div>
                      <p>
                        {firstname} {lastname}
                      </p>
                    </div>
                  </div>
                  <div className="place-contact-phone">
                    <div>
                      <img src={phoneIcon} />
                    </div>
                    <div>
                      <a href={"tel:" + phone}>Call</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>{/* {test[2]} */}</div>

          <Footer />
        </>
      )}
      {placeload === true && <DetailsLoaderSkeleton />}
    </>
  );
}

export default PlaceDetails;
