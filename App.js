import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Modal,
  TextInput
} from "react-native";

import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
// import Modal from "react-modal";
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

export default function App() {
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
    {/* className="header" */}
      <View style={styles.header}>
        {/* <Text className="logo">
          <Text> ቤቶች </strong>BORD
        </Text> */}
<Text>Betoch</Text>
        <Text className="header-right">
          <Text className="login-link">
            {user ? (
              <Text>
                <Button onClick={openUsermenu}>
                {/* className="user-profile-btn" */}
                  <Text> {Array.from(user.email)[0]} </Text>
                  <Image source={onlineStatus} />
                  {/* className="online-status" */}
                </Button>
              </Text>
            ) : (
              <Button onClick={openMenu} className="login-menu-btn">
                LogIn
              </Button>
            )}

            {/* <NewFlat /> */}
          </Text>
        </Text>

        <Modal className="newuser-form" isOpen={userdata}>
          <>
            <Text className="new-user-form">Plese enter your info below </Text>

            <View
              onSubmit={(e) => {
                handleSignup(e);
              }}
            >
              <View className="newuser-form-container">
                <View className="name-container">
                  <View className="first-name">
                    First Name
                    <TextInput
                      onChange={(e) => {
                        setFirstname(e.target.value);
                      }}
                      required
                    />
                  </View>
                  <View className="last-name">
                    Last Name
                    <TextInput
                      onChange={(e) => {
                        setLastname(e.target.value);
                      }}
                      required
                    />
                  </View>
                </View>
                <View className="phone-container">
                  <View className="phone-box">
                    Phone
                    <TextInput
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </View>
                </View>
                <Button className="sign-btn color-btn" type="submit">
                  Save your info
                </Button>
              </View>

              <Text>className="newuser-form-border">
                <Text>Note:</Text> We use your contact detail when visitors are
                interested in your posted property and want to contact you.
              </Text>
            </View>
          </>
        </Modal>

        <Modal className="modal" isOpen={menuisOpen} onRequestClose={closeMenu}>
          <Button className="close-menu-btn" onClick={closeMenu}>
            X
          </Button>

          <View className="">
            <Login onClick={closeMenu} />
            <NavLink className="signup-link" to="/signup" onClick={closeMenu}>
              Create an account
            </NavLink>
          </View>
        </Modal>
        <Modal
          className="modal"
          isOpen={userMenuisopen}
          onRequestClose={closeUsermenu}
        >
          <View className="user-menu-container">
            <View className="user-menu-container-close">
              <Image source={close} onClick={() => setUsermenuopen(false)} />
            </View>

            {user ? (
              <>
                <View className="user-menu">
                  <View className="user-info">
                    <View className="user-avatar">
                      <Button className="user-profile-btn">
                        <Text> {Array.from(user.email)[0]} </Text>
                      </Button>
                    </View>

                    <View className="user-email-id">
                      <Text> {user.email} </Text>
                      <Text>className="user-id">
                        <Text>{t("your id.1")}:</Text> {user.uid}{" "}
                      </Text>
                    </View>
                  </View>

                  <View className="line"></View>

                  <View className="user-actions">
                    <View className="profile">
                      <Text>{t("profile.1")}</Text>

                      <View className="link-group">
                        <View className="link-group-left">
                          <Image alt="" source={UserAccount} />
                        </View>
                        <View className="link-group-right">
                          <Button
                            onClick={() => {
                              navigate("/account-info");
                              closeUsermenu();
                            }}
                          >
                            <Text> className="user-action-links">
                              {t("Account.1")}
                              <Image alt="" source={forwardarrow} />
                            </Text>
                          </Button>
                          <Text>className="description">
                            {t("edit your account.1")}
                          </Text>
                        </View>
                      </View>

                      <View className="link-group">
                        <View className="link-group-left">
                          <Image alt="" source={Package} />
                        </View>
                        <View className="link-group-right">
                          <Button
                            onClick={() => {
                              console.log("hello");
                            }}
                          >
                            <Text> className="user-action-links">
                              {t("package.1")}
                              <Image alt="" source={forwardarrow} />
                            </Text>
                          </Button>
                          <Text>className="description">
                            {t("create a new package.1")}
                          </Text>
                        </View>
                      </View>
                      <View className="line"></View>
                    </View>

                    <View className="settings">
                      <Text>{t("settings.1")}</Text>
                      <View className="link-group highlight">
                        <View className="link-group-left">
                          <Image alt="" source={Upload} />
                        </View>
                        <View className="link-group-right">
                          <Button
                            onClick={() => {
                              navigate("/add-place");
                              closeUsermenu();
                            }}
                          >
                            <Text> className="user-action-links">
                              {t("post your place.1")}
                              <Image alt="" source={forwardarrow} />
                            </Text>
                          </Button>
                          <Text>className="description">
                            {t("post your place for sell or rent.1")}
                          </Text>
                        </View>
                      </View>

                      <View className="link-group">
                        <View className="link-group-left">
                          <Image alt="" source={managePlace} />
                        </View>

                        <View className="link-group-right">
                          <Button
                            onClick={() => {
                              navigate("/manage-my-places");
                              closeUsermenu();
                            }}
                          >
                            <Text> className="user-action-links">
                              {t("manage places you posted.1")}
                              <Image alt="" source={forwardarrow} />
                            </Text>
                          </Button>
                          <Text>className="description">
                            {t("edit remove or boost your place.1")}
                          </Text>
                        </View>
                      </View>

                      <View className="link-group">
                        <View className="link-group-left">
                          <Image alt="" source={Language} />
                        </View>
                        <View className="link-group-right">
                          <Button
                            onClick={() => {
                              navigate("/lang");
                              closeUsermenu();
                            }}
                          >
                            <Text> className="user-action-links">
                              {t("language.1")}
                              <Image alt="" source={forwardarrow} />
                            </Text>
                          </Button>
                          <Text>className="description">
                            {t("choose the Language of your preference.1")}
                          </Text>
                        </View>
                      </View>
                      <Text
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="logout-btn"
                      >
                        {t("logout.1")}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <></>
            )}
          </View>
        </Modal>
      </View>
      {/* <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="/listView" element={<ListView />} />
        <Route path="/signup" element={<Signup onClick={openMenu} />} />
        <Route path="/add-place" element={<AddPlace />} />
        <Route path="/account-info" element={<Account />} />
        <Route path="/place-details/:id" element={<PlaceDetails />} />
        <Route path="edit-place/:id" element={<EditPlace />} />
        <Route path="/manage-my-places" element={<ManageMyPlaces />} />
        <Route path="/lang" element={<LanguageMenu />} />
      </Routes> */}
    </>
  );
}

const styles = StyleSheet.create({
  header:{
    color: "red"
  }
})