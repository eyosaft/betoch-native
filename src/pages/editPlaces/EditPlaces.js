import React, { useState, useContext, useEffect } from "react";
import NumberPicker from "react-widgets/NumberPicker";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { addDoc, doc, getDoc, updateDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import ReactMapGl, { Marker, Map, NavigationControl } from "react-map-gl";
import { AuthContext } from "../../context/AuthContext";
import "./editPlaces.css";
import "react-widgets/styles.css";
import backArrow from "../../Assets/back_arrow_icon.png";
import MarkerIcon from "../../Assets/location_marker_icon.png";

// const fetchLocationName = async () => {
//   await fetch(
//     'https://www.mapquestapi.com/geocoding/v1/reverse?key=4rJso0AjKD4A8JGGyAa8tv9wG0Ei0A5p&location='+lat+'%2C'+lng+'&outFormat=json&thumbMaps=false',
//   )
//     .then((response) => response.json())
//     .then((responseJson) => {

//       const loca = JSON.stringify(responseJson)

//     });
// };
// fetchLocationName()

//

function EditPlace() {
  const [lng, setLng] = useState([38.76047487338815]);
  const [lat, setLat] = useState([9.026251906702683]);
  const [placeaddress, setPlaceAddress] = useState();
  const { currentUser } = useContext(AuthContext);
  const [place, setPlace] = useState({});

  const my_access_token =
    "pk.eyJ1IjoiZXlvc2FmdCIsImEiOiJjbDdoZTI2eW0wZGx2NDBsOWkwZWc4dnVjIn0.jwI1K4KGcod27XcI6EJJMQ";

  const user = currentUser;
  const userId = user.uid;

  async function asyncCall() {
    const response = await fetch(
      "https://www.mapquestapi.com/geocoding/v1/reverse?key=4rJso0AjKD4A8JGGyAa8tv9wG0Ei0A5p&location=" +
        lat +
        "%2C" +
        lng +
        "&outFormat=json&thumbMaps=false"
    );
    const ldata = await response.json();
    const streetName = ldata.results[0].locations[0].street;
    const cityName = ldata.results[0].locations[0].adminArea3;
    // const countryName = ldata.results[0].locations[0].adminArea1;
    // const streetName = ldata.features[0].text
    const selectedAddress = streetName + "," + " " + cityName;
    setPlaceAddress(selectedAddress);
    console.log(placeaddress);
    // console.log(ldata.results[0].locations)
  }

  const navigate = useNavigate();

  const [placeNane, setPlaceName] = useState();
  const [placePrice, setPlacePrice] = useState(0);
  const [placeSize, setPlaceSize] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  //  const [placePhoto, setPlacephoto] = useState();

  const placeId = useParams();

  const [isdata, setIsdata] = useState(false);

  // get doc
  const docRef = doc(db, "places", placeId.id);
  useEffect(() => {
    getDoc(docRef).then((place) => {
      setPlace(place.data());
      setIsdata(true);
    });
  }, [placeId]);

  const [nameisshown, setNameisShown] = useState(false);
  const [nameisOff, setNameisOff] = useState(true);

  const editName = (event) => {
    // 👇️ toggle shown state
    event.preventDefault();
    setNameisShown((current) => !current);
    setNameisOff(!nameisOff);
    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const [priceisshown, setPriceisShown] = useState(false);
  const [priceisOff, setPriceisOff] = useState(true);

  const editPrice = (event) => {
    // 👇️ toggle shown state
    event.preventDefault();
    setPriceisShown((current) => !current);
    setPriceisOff(!priceisOff);
    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const [sizeisshown, setSizeisShown] = useState(false);
  const [sizeisOff, setSizeisOff] = useState(true);

  const editSize = (event) => {
    // 👇️ toggle shown state
    event.preventDefault();
    setSizeisShown((current) => !current);
    setSizeisOff(!sizeisOff);
    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const [bedroomsisshown, setBedroomsisShown] = useState(false);
  const [bedroomsisOff, setBedroomsisOff] = useState(true);

  const editBedrooms = (event) => {
    // 👇️ toggle shown state
    event.preventDefault();
    setBedroomsisShown((current) => !current);
    setBedroomsisOff(!bedroomsisOff);
    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const updatePlacename = async (e) => {
    e.preventDefault();
    await updateDoc(docRef, {
      place_name: placeNane,
    });
  };

  const updatePlaceprice = async (e) => {
    e.preventDefault();
    await updateDoc(docRef, {
      place_price: placePrice,
    });
  };

  const updatePlacesize = async (e) => {
    e.preventDefault();
    await updateDoc(docRef, {
      place_size: placeSize,
    });
  };

  const updatePlacebedrooms = async (e) => {
    e.preventDefault();
    await updateDoc(docRef, {
      place_bedrooms: bedrooms,
    });
  };

  return (
    <>
      <div className="edit-place-container">
        <div className="edit-place-header">
          <div className="edit-place-title">
            <button
              className="exit-edit-place-btn"
              onClick={() => {
                navigate("/manage-my-places");
              }}
            >
              <img alt="" src={backArrow} />
            </button>
            <h2 className="edit-place-title">Edit this place</h2>
          </div>
        </div>
        <form>
          <div className="edit-place">
            <div className="edit-place-name edit-place-card">
              Place Name
              <div className="current-place-name">
                {isdata && <>{place.place_name}</>}

                <button onClick={editName}>
                  <p>{nameisOff ? "Edit" : "Cancel"}</p>
                </button>
              </div>
              {nameisshown && (
                <div className="current-name-box">
                  <input
                    className="add-place-name-box"
                    type="text"
                    id="add-place-name"
                    name="place_name"
                    defaultValue={place.place_name}
                    placeholder="e.g (2 Bedroom Condominium)"
                    onChange={(e) => setPlaceName(e.target.value)}
                  />
                  <button onClick={updatePlacename} className="save-update-btn">
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="add-place-price edit-place-card">
              Place Price
              <div className="current-place-name">
                {isdata && (
                  <>
                    Birr{" "}
                    {place.place_price
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </>
                )}

                <button onClick={editPrice}>
                  <p>{priceisOff ? "Edit" : "Cancel"}</p>
                </button>
              </div>
              {priceisshown && (
                <div className="current-name-box">
                  <input
                    className="add-place-price-box"
                    type="number"
                    id="add-place-price"
                    name="place_price"
                    defaultValue={place.place_price}
                    onChange={(e) => {
                      setPlacePrice(e.target.valueAsNumber);
                    }}
                  />
                  <button
                    onClick={updatePlaceprice}
                    className="save-update-btn"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="add-place-description">
              Place Description
              <div className="edit-place-description-items">
                <div className="add-place-size edit-place-card">
                  <p>
                    Size per m<sup>2</sup>
                  </p>
                  <div className="current-place-name">
                    {isdata && <>{place.place_size}</>}
                    <button onClick={editSize}>
                      <p>{sizeisOff ? "Edit" : "Cancel"}</p>
                    </button>
                  </div>
                  {sizeisshown && (
                    <div className="current-name-box">
                      <input
                        type="number"
                        defaultValue={place.place_size}
                        onChange={(e) => {
                          setPlaceSize(e.target.valueAsNumber);
                        }}
                      />
                      <button
                        onClick={updatePlacesize}
                        className="save-update-btn"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
                <div className="add-bedrooms edit-place-card">
                  <p>Bedrooms</p>

                  <div className="current-place-name">
                    {isdata && <>{place.place_bedrooms}</>}
                    <button onClick={editBedrooms}>
                      <p>{bedroomsisOff ? "Edit" : "Cancel"}</p>
                    </button>
                  </div>
                  {bedroomsisshown && (
                    <div className="current-name-box">
                      <input
                        type="number"
                        defaultValue={place.place_bedrooms}
                        onChange={(e) => {
                          setBedrooms(e.target.valueAsNumber);
                        }}
                      />
                      <button
                        onClick={updatePlacebedrooms}
                        className="save-update-btn"
                      >
                        Save
                      </button>
                    </div>
                  )}

                  {/* <input
                    defaultValue={place.place_size}
                    onChange={(e) => setBedrooms(e.target.value)}
                  /> */}
                </div>
              </div>
            </div>

            {/* <div className="add-place-imgUrl">
              Upload Image
              <input
                className="add-place-imgurl-box"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="/image/*"
              />
            </div> */}
          </div>
          <button className="sign-btn color-btn">Finish update</button>
        </form>
      </div>
    </>
  );
}

export default EditPlace;
