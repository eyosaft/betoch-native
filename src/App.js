import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Modal from "react-modal";
import MapView from "./components/mapView";
import ListView from "./components/listView";
import Login from "./pages/login/Login";
import Signup from "./pages/Signup/Signup";
import AddPlace from "./pages/addPlaces/AddPlace";
import Account from "./pages/profile/account";
import PlaceDetails from "./pages/placeDetails/Placedetails";
import ManageMyPlaces from "./pages/placeUpdate/ManageMyPlaces";
import EditPlace from "./pages/editPlaces/EditPlaces";

import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

import { useTranslation } from "react-i18next";
import LanguageMenu from "./pages/languages/pickLanguages";

import "./App.css";
import userIcon from "./Assets/user_icon.png";
import UserAccount from "./Assets/user_account_icon.png";
import Package from "./Assets/my_package_icon.png";
import managePlace from "./Assets/managePlace_icon.png";
import Language from "./Assets/language_icon.png";
import Upload from "./Assets/upload_icon.png";
import close_btn from "./Assets/close_icon.png";
import close from "./Assets/close.png";
import forwardarrow from "./Assets/forward_arrow_icon.png";
import onlineStatus from "./Assets/online status.gif";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

const App = () => {
  const [menuisOpen, setIsOpen] = useState(false);
  const [userMenuisopen, setUsermenuopen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [userdata, setUserdata] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const user = currentUser;

  function openMenu() {
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function openUsermenu() {
    setUsermenuopen(true);
  }

  function closeUsermenu() {
    setUsermenuopen(false);
  }

  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch({ type: "LOGOUT" });
        closeUsermenu();
      })
      .catch((error) => {
        // An error happened.
      });
  }
  if (user != null) {
    const userId = user.uid;
    const fetchUserdata = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
      } else {
        setUserdata(true);
      }
    };
    fetchUserdata();
  } else {
    // console.log("no user");
  }

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = async (e) => {
    const userId = user.uid;
    e.preventDefault();
    await setDoc(doc(db, "users", userId), {
      first_name: firstname,
      last_name: lastname,
      user_phone: phone,
      timeStamp: serverTimestamp(),
    });
    // console.log("success creating account");
    setUserdata(false);
  };

  // languages
  useEffect(() => {
    ChooseLanguage();
  }, []);

  const { t, i18n } = useTranslation();

  function ChooseLanguage(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <>
      <div className="header">
        <p className="logo">
          <strong> ቤቶች </strong>BORD
        </p>

        <div className="header-right">
          <div className="login-link">
            {user ? (
              <div>
                <button className="user-profile-btn" onClick={openUsermenu}>
                  <h1> {Array.from(user.email)[0]} </h1>
                  <img src={onlineStatus} className="online-status" />
                </button>
              </div>
            ) : (
              <button onClick={openMenu} className="login-menu-btn">
                LogIn
              </button>
            )}

            {/* <NewFlat /> */}
          </div>
        </div>

        <Modal className="newuser-form" isOpen={userdata}>
          <>
            <h2 className="new-user-form">Plese enter your info below </h2>

            <form
              onSubmit={(e) => {
                handleSignup(e);
              }}
            >
              <div className="newuser-form-container">
                <div className="name-container">
                  <div className="first-name">
                    First Name
                    <input
                      onChange={(e) => {
                        setFirstname(e.target.value);
                      }}
                      type="text"
                      required
                    />
                  </div>
                  <div className="last-name">
                    Last Name
                    <input
                      onChange={(e) => {
                        setLastname(e.target.value);
                      }}
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="phone-container">
                  <div className="phone-box">
                    Phone
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      required
                    />
                  </div>
                </div>
                <button className="sign-btn color-btn" type="submit">
                  Save your info
                </button>
              </div>

              <p className="newuser-form-border">
                <b>Note:</b> We use your contact detail when visitors are
                interested in your posted property and want to contact you.
              </p>
            </form>
          </>
        </Modal>

        <Modal className="modal" isOpen={menuisOpen} onRequestClose={closeMenu}>
          <button className="close-menu-btn" onClick={closeMenu}>
            X
          </button>

          <div className="">
            <Login onClick={closeMenu} />
            <NavLink className="signup-link" to="/signup" onClick={closeMenu}>
              Create an account
            </NavLink>
          </div>
        </Modal>
        <Modal
          className="modal"
          isOpen={userMenuisopen}
          onRequestClose={closeUsermenu}
        >
          <div className="user-menu-container">
            <div className="user-menu-container-close">
              <img src={close} onClick={() => setUsermenuopen(false)} />
            </div>

            {user ? (
              <>
                <div className="user-menu">
                  <div className="user-info">
                    <div className="user-avatar">
                      <button className="user-profile-btn">
                        <h1> {Array.from(user.email)[0]} </h1>
                      </button>
                    </div>

                    <div className="user-email-id">
                      <p> {user.email} </p>
                      <p className="user-id">
                        <span>{t("your id.1")}:</span> {user.uid}{" "}
                      </p>
                    </div>
                  </div>

                  <div className="line"></div>

                  <div className="user-actions">
                    <div className="profile">
                      <label>{t("profile.1")}</label>

                      <div className="link-group">
                        <div className="link-group-left">
                          <img alt="" src={UserAccount} />
                        </div>
                        <div className="link-group-right">
                          <button
                            onClick={() => {
                              navigate("/account-info");
                              closeUsermenu();
                            }}
                          >
                            <h3 className="user-action-links">
                              {t("Account.1")}
                              <img alt="" src={forwardarrow} />
                            </h3>
                          </button>
                          <p className="description">
                            {t("edit your account.1")}
                          </p>
                        </div>
                      </div>

                      <div className="link-group">
                        <div className="link-group-left">
                          <img alt="" src={Package} />
                        </div>
                        <div className="link-group-right">
                          <button
                            onClick={() => {
                              console.log("hello");
                            }}
                          >
                            <h3 className="user-action-links">
                              {t("package.1")}
                              <img alt="" src={forwardarrow} />
                            </h3>
                          </button>
                          <p className="description">
                            {t("create a new package.1")}
                          </p>
                        </div>
                      </div>
                      <div className="line"></div>
                    </div>

                    <div className="settings">
                      <label>{t("settings.1")}</label>
                      <div className="link-group highlight">
                        <div className="link-group-left">
                          <img alt="" src={Upload} />
                        </div>
                        <div className="link-group-right">
                          <button
                            onClick={() => {
                              navigate("/add-place");
                              closeUsermenu();
                            }}
                          >
                            <h3 className="user-action-links">
                              {t("post your place.1")}
                              <img alt="" src={forwardarrow} />
                            </h3>
                          </button>
                          <p className="description">
                            {t("post your place for sell or rent.1")}
                          </p>
                        </div>
                      </div>

                      <div className="link-group">
                        <div className="link-group-left">
                          <img alt="" src={managePlace} />
                        </div>

                        <div className="link-group-right">
                          <button
                            onClick={() => {
                              navigate("/manage-my-places");
                              closeUsermenu();
                            }}
                          >
                            <h3 className="user-action-links">
                              {t("manage places you posted.1")}
                              <img alt="" src={forwardarrow} />
                            </h3>
                          </button>
                          <p className="description">
                            {t("edit remove or boost your place.1")}
                          </p>
                        </div>
                      </div>

                      <div className="link-group">
                        <div className="link-group-left">
                          <img alt="" src={Language} />
                        </div>
                        <div className="link-group-right">
                          <button
                            onClick={() => {
                              navigate("/lang");
                              closeUsermenu();
                            }}
                          >
                            <h3 className="user-action-links">
                              {t("language.1")}
                              <img alt="" src={forwardarrow} />
                            </h3>
                          </button>
                          <p className="description">
                            {t("choose the Language of your preference.1")}
                          </p>
                        </div>
                      </div>
                      <span
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="logout-btn"
                      >
                        {t("logout.1")}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </Modal>
      </div>
      <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="/listView" element={<ListView />} />
        <Route path="/signup" element={<Signup onClick={openMenu} />} />
        <Route path="/add-place" element={<AddPlace />} />
        <Route path="/account-info" element={<Account />} />
        <Route path="/place-details/:id" element={<PlaceDetails />} />
        <Route path="edit-place/:id" element={<EditPlace />} />
        <Route path="/manage-my-places" element={<ManageMyPlaces />} />
        <Route path="/lang" element={<LanguageMenu />} />
      </Routes>
    </>
  );
};

export default App;
