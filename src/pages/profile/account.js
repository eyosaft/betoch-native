import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

import "./account.css";
import backArrow from "../../Assets/back_arrow_icon.png";

function Userinfo() {
  const { currentUser } = useContext(AuthContext);
  const [userdata, setUserdata] = useState([]);
  // const [ loader, setLoader ] = useState(true)

  const navigate = useNavigate();
  const [nameisshown, setNameisShown] = useState(false);
  const [nameisOff, setNameisOff] = useState(true);

  const editName = (event) => {
    // 👇️ toggle shown state
    setNameisShown((current) => !current);
    setNameisOff(!nameisOff);
    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const [emailisshown, setEmailisShown] = useState(false);
  const [emailisOff, setEmailisOff] = useState(true);

  const editEmail = (event) => {
    // 👇️ toggle shown state
    setEmailisShown((current) => !current);
    setEmailisOff(!emailisOff);
    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const [phoneisshown, setPhoneisShown] = useState(false);
  const [phoneisOff, setPhoneisOff] = useState(true);

  const editPhone = (event) => {
    // 👇️ toggle shown state
    setPhoneisShown((current) => !current);
    setPhoneisOff(!phoneisOff);
    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const user = currentUser;
  const userId = user.uid;

  useEffect(() => {
    const fetchUserdata = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userInfo = [];
        const userinfo = docSnap.data();
        userInfo.push(userinfo);
        setUserdata(userInfo);
        // console.log(user.email);


      } else {
        // doc.data() will be undefined in this case
        // console.log("No such document!");
      }
    };
    fetchUserdata();
  }, []);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");

  //   const userUpdate = async (e) => {
  //     await setDoc(doc(db, "users", userId), {
  //      first_name: firstname,
  //      last_name: lastname,
  //      user_phone: phone
  //    });
  //  };
  const userUpdate = async (e) => {
    const fetchedUser = doc(db, "users", userId);

    await updateDoc(fetchedUser, {
      user_phone: phone,
    });
  };

  const [timeS, setTimeS] = useState("");

  return (
    <>
      {user &&
        userdata.map((userDta) => (
          <div className="edit-user-info">
            <div className="edit-user-info-header">
              <button
                className="exit-edit-user-btn"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <img alt="" src={backArrow} />
              </button>
              <h2 className="edit-user-info-title"> Account info </h2>
            </div>

            {/* userDta.timeStamp.toDate() */}

            {/* edit name section starts */}
            <div className="user-name">
              User Name
              <div className="user-name-form">
                <div className="name">
                  <div className="current-name">
                    <p> {userDta.first_name} </p>
                    <p> {userDta.last_name} </p>
                  </div>

                  <button onClick={editName} disabled>
                    {nameisOff ? "Edit" : "Cancel"}
                  </button>
                </div>
                {nameisshown && (
                  <div className="edit-name">
                    <div className="name-box">
                      <div className="first-name">
                        <input
                          type="text"
                          value={userDta.first_name}
                          onChange={(e) => setFirstname(e.target.value)}
                          
                        />
                      </div>
                      <div className="last-name">
                        <input
                          type="text"
                          value={userDta.last_name}
                          onChange={(e) => setLastname(e.target.value)}
                          
                        />
                      </div>
                    </div>
                    <div className="save-name">
                      <button className="save-btn">Save</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="line"></div>
            </div>
            {/* edit name section ends */}

            {/* edit email section starts */}
            <div className="edit-user-email">
              Email
              <div className="user-email-form">
                <div className="email">
                  {user ? (
                    <>
                      <p>{user.email}</p>
                      <button onClick={editEmail} disabled>
                        {emailisOff ? "Edit" : "Cancel"}
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {emailisshown && (
                  <div className="edit-email">
                    <div className="edit-email-box">
                      <div className="">
                        {user ? (
                          <input type="text" value={user.email} />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="save-name">
                      <button className="save-btn">Save</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="line"></div>
            </div>
            {/* edit email section ends */}

            {/* edit Phone section starts */}
            <div className="edit-user-phone">
              Phone
              <div className="user-phone-form">
                <div className="phone">
                  {user ? (
                    <>
                      <p>{userDta.user_phone}</p>
                      <button onClick={editPhone}>
                        <p>{phoneisOff ? "Edit" : "Cancel"}</p>
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {phoneisshown && (
                  <div className="edit-phone">
                    <div className="edit-phone-box">
                      <div className="">
                        {user ? (
                          <input
                            type="text"
                            defaultValue={userDta.user_phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="save-name">
                      <button
                        className="save-btn"
                        onClick={(e) => userUpdate()}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="line"></div>
            </div>
            {/* edit Phone section ends */}

            {/* edit Government ID Card section starts */}
            <div className="user-name">
              Government ID Card
              <div className="user-name-form">
                <div className="name">
                  {user ? (
                    <>
                      <p>{"(Not Submmited)"}</p>
                      <button onClick={""} disabled>
                        {emailisOff ? "Edit" : "Cancel"}
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {/* {emailisshown && (
              <div className="edit-name">
                <div className="name-box">
                  <div className="first-name">
                    {user ?  <input type="text" value={user.email} /> : <></>}
                   
                  </div>
                </div>
                <div className="save-name">
                  <button className="save-btn">Save</button>
                </div>
              </div>
            )} */}
              </div>
              <div className="line"></div>
            </div>
            {/* edit Government Id Card section ends */}

            {/* edit Address section starts */}
            <div className="user-name">
              Address
              <div className="user-name-form">
                <div className="name">
                  {user ? (
                    <>
                      <p>{"(Not Submitted)"}</p>
                      <button onClick={""} disabled>
                        {emailisOff ? "Edit" : "Cancel"}
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {/* {emailisshown && (
              <div className="edit-name">
                <div className="name-box">
                  <div className="first-name">
                    {user ?  <input type="text" value={user.email} /> : <></>}
                   
                  </div>
                </div>
                <div className="save-name">
                  <button className="save-btn">Save</button>
                </div>
              </div>
            )} */}
              </div>
              <div className="line"></div>
            </div>
            {/* edit Address section ends */}

            {/* {user ? (
        <>

        <p>you joined us on {userDta.timeStamp}</p> 

        </>
        ):(<></>)} */}
          </div>
        ))}
    </>
  );
}

export default Userinfo;
