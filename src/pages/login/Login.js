import { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { google } from "../../firebase";
import Modal from "react-modal";

import "./login.css";

import { db } from "../../firebase";

import GoogleIcon from "../../Assets/google_icon.png";
import FacebookIcon from "../../Assets/Facebook_icon.png";

function Login(props) {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [newuser, setNewuser] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        // navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  const loginwithgoogle = () => {
    signInWithPopup(auth, google).then((currentuser) => {
      const user = currentuser.user;
      dispatch({ type: "LOGIN", payload: user });
      closepopup();
      // setNewuser(true);
    });
  };

  function closepopup() {
    setTimeout(function () {
      props.onClick();
    });
  }
  const user = currentUser;

  return (
    <>
      {newuser ? (
        <>
          <h1>you are a new user</h1>
        </>
      ) : (
        <>
          <div>
            <div className="sign-in-with-title">
              Login with <strong> Google or Facebook </strong>
            </div>
            <button
              onClick={() => loginwithgoogle()}
              className="SignInWithGoogle sign-btn"
            >
              <img alt="" src={GoogleIcon} /> Sign In with Google
            </button>
            <button className="SignInWithFacebook sign-btn">
              <img alt="" src={FacebookIcon} /> Sign In with Facebook
            </button>
            <div className="sign-in-option-split">
              <p>OR</p>
            </div>
          </div>

          <div className="login-form">
            <form onSubmit={handleLogin}>
              <div className="email-container">
                Email
                <input
                  className="input-box"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="password-container">
                Password
                <input
                  className="input-box"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="login-btn-container">
                <button type="submit" onClick={closepopup}>
                  LogIn
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Login;
