import { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

import closeSignup from "../../Assets/close.png";

import "./signup.css";

function Signup(props) {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  // const { currentUser } = useContext(AuthContext);
  // const { dispatch } = useContext(AuthContext);

  // const user = currentUser;

  const [namemsg, setNamemsg] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await createUserWithEmailAndPassword(auth, email, password);
    // .then((userCredential) => {
    //   // Signed in
    //   dispatch({ type: "LOGIN" });
    // })
    // .catch((error) => {
    //   setError(true);
    // });
    await setDoc(doc(db, "users", res.user.uid), {
      first_name: firstname,
      last_name: lastname,
      user_phone: phone,
      timeStamp: serverTimestamp(),
    });
    // console.log("success creating account");
    navigate("/");
  };

  function openpopup() {
    setTimeout(function () {
      props.onClick();
    });
  }

  const setmsgoff =()=> {
     setTimeout(() => {
      setNamemsg("")
  }, 3000);

  }
 

  return (
    <>
      <NavLink className="close-route" exect to="/">
        <img alt="" src={closeSignup} />
      </NavLink>

      <div className="signup-container">
        <h1 className="signup-title"> Create an account</h1>
        <div className="signup-form">
          <form onSubmit={handleSignup}>
            <div className="email-container">
              Email
              <input
                className="email-box"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password-container">
              Password
              <input
                className="password-box"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="name-container">
              <div className="first-name">
                First Name
                <input
                  onChange={(e) => {
                    setNamemsg("ID full Name cannot be shanged after sigh Up");
                    setmsgoff()
                    setFirstname(e.target.value);
                  }}
                  type="text"
                />
              </div>
              <div className="last-name">
                Last Name
                <input
                  onChange={(e) => setLastname(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div className="signup-msg-box">
              <p>{namemsg}</p>
            </div>

            <div className="phone-container">
              <div className="phone-box">
                Phone
                <input onChange={(e) => setPhone(e.target.value)} type="text" />
              </div>
            </div>

            <div className="signup-btn-container">
              <button type="submit">SignUp</button>
            </div>
            <button className="already-hv-acc" onClick={openpopup}>
              Already have an account?
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
