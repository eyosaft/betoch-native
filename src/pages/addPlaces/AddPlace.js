import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NumberPicker from "react-widgets/NumberPicker";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
// import ReactMapGl, { Marker, Map, NavigationControl } from "react-map-gl";
import { AuthContext } from "../../context/AuthContext";
import ImgUploadBox from "../../components/imgUploadBox";
import { Congrats, CongratsTwo } from "../../components/confetti";

import Mapbox from "./Map";

import "./AddPlace.css";
import "react-widgets/styles.css";
import backArrow from "../../Assets/back_arrow_icon.png";
import MarkerIcon from "../../Assets/location_marker_icon.png";

const acctok =
  "pk.eyJ1IjoiZXlvc2FmdCIsImEiOiJjbDdoZTI2eW0wZGx2NDBsOWkwZWc4dnVjIn0.jwI1K4KGcod27XcI6EJJMQ";

function AddPlace() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  const [data, setData] = useState();

  const user = currentUser;
  const userId = user.uid;

  const [placeNane, setPlaceName] = useState();
  const [placePrice, setPlacePrice] = useState(0);
  const [placeSize, setPlaceSize] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [location, setLocation] = useState();
  const [imgUrls, setImgUrls] = useState([]);

  // State to store uploaded image
  const [images, setImages] = useState([]);
  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state

  const setPlaceAddress = (address, lng, lat) => {
    setLocation(address);
    setLat(lat);
    setLng(lng);
  };

  const createPlace = (e) => {
    // handleUpload();
    e.preventDefault();

    [...images].map((image) => singleImage(image));
  };

  const uploadAll = () => {
    const testdata = {
      place_price: placePrice,
      place_name: placeNane,
      place_photo_url: imgUrls,
      place_address: location,
      place_size: placeSize,
      place_bedrooms: bedrooms,
      posted_on: Timestamp.now(),
      user_id: userId,
      lng: lng,
      lat: lat,
    };

    const placesRef = collection(db, "places");

    addDoc(placesRef, testdata).then(() => {
      console.log("your place is posted");
      openConfetti();
      window.scrollTo(0, 0);
      setTimeout(() => {
        closeConfetti();
        navigate("/");
      }, 10000);
    });
  };

  const [confetti, setConfetti] = useState(false);

  function openConfetti() {
    setConfetti(true);
  }

  function closeConfetti() {
    setConfetti(false);
  }

  const singleImage = (image) => {
    const fileName = `${image.name}`;
    const storageRef = ref(storage, `${userId}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          imgUrls.push(downloadUrl);
          if (images.length == imgUrls.length) {
            uploadAll();
          }
        });
      }
    );
  };



  // const childFunc = React.useRef(null)

  return (
    <>
      {confetti === true && (
        <div>
          <Congrats />
          <div className="congrats-container">
            <div className="congrats-msg">
              <p> <strong> Congrats! </strong> your place has been posted </p>
            </div>
          </div>
        </div>
      )}
      <div className="add-place-container">
        <div className="add-place-header">
          <div className="add-place-title">
            <button
              className="exit-add-place-btn"
              onClick={() => {
                navigate("/");
              }}
            >
              <img alt="" src={backArrow} />
            </button>
            <h2 className="add-place-title">Add a place</h2>
          </div>
        </div>
       
        <form onSubmit={createPlace}>
          <div className="add-place">
            <div className="add-place-name">
              Place Name
              <input
                className="add-place-name-box"
                type="text"
                id="add-place-name"
                name="place_name"
                placeholder="e.g (2 Bedroom Condominium)"
                onChange={(e) => setPlaceName(e.target.value)}
              />
            </div>

            <div className="add-place-price">
              Place Price
              <input
                className="add-place-price-box"
                type="number"
                id="add-place-price"
                name="place_price"
                onChange={(e) => {
                  setPlacePrice(e.target.valueAsNumber);
                }}
              />
            </div>

            <div className="add-place-description">
              Place Description
              <div className="add-place-description-items">
                <div className="add-place-size">
                  <p>
                    Size per m<sup>2</sup>
                  </p>
                  <input
                    type="number"
                    onChange={(e) => {
                      setPlaceSize(e.target.valueAsNumber);
                    }}
                  />
                </div>
                <div className="add-bedrooms">
                  <p>Bedrooms</p>
                  <input
                    type="number"
                    onChange={(e) => {
                      setBedrooms(e.target.valueAsNumber);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="add-place-map">
              <p>Address</p>
              <Mapbox setPlaceAddress2={setPlaceAddress} />
              {/* lat{lat} lng{lng} {data} */} {location}
            </div>

            <div>
              <ImgUploadBox f={setImages} />
            </div>
          </div>
          <button
            className="sign-btn color-btn"
            type="submit"
            // onClick={() => childFunc.current()}
          >
            post your place
          </button>
        </form>
        {/* <button onClick={asyncCall}>click</button> */}
        <p>{percent}% Uploaded</p>
      </div>
    </>
  );
}

export default AddPlace;
