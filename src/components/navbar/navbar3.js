import React, { useState, createContext, useContext, useMemo } from 'react';
import Loomis from "../../assets/loomis.png"
import { NavLink, useNavigate } from "react-router-dom";
import { EncryptStorage } from 'encrypt-storage';
import loomis2 from "../../assets/loomis2.png";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit, getDoc, doc, documentId, setDoc, increment } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import logo2 from "../../assets/logo2.png";
import Logout from '../logout';

const encryptstorage = new EncryptStorage('asdffdsafdasfdasasdf', {
  prefix: '@instance',
  storageType: 'sessionStorage'
})

const firebaseConfig = {
  apiKey: "AIzaSyBDh3yxYRLCaikdnMXYrCuVc0iGL5qn0js",
  authDomain: "dashboard-2a1a3.firebaseapp.com",
  projectId: "dashboard-2a1a3",
  storageBucket: "dashboard-2a1a3.appspot.com",
  messagingSenderId: "354314041590",
  appId: "1:354314041590:web:32b771d8e2a2d4ce4ad4d7",
  measurementId: "G-W02KFP0FY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function Navbar3(props) {
  const [isShown, setIsShown] = useState(false);

  const screenWidth = window.innerWidth;

  const handleClick = event => {
    setIsShown(current => !current)
  };
  let navigate = useNavigate();

  const logout = () => {
    encryptstorage.clear();
    navigate("/Login", { replace: true })
  }



  return (
    <>
    { screenWidth > 1000 ?
    <div className="navbar_style" id="navbar_bg" style={{ backgroundColor: props.theme }}>
      <div
        style={{
          textAlign: 'center',
          paddingTop: 30
        }}
      >
        <img className="lc_logo" src={logo2} style={{ width: 60, height: 60 }} />
        <div
          style={{
            fontSize: 18,
            marginTop: 5
          }}
        >
          LC DASHBOARD
        </div>
      </div>
      <div className="navbar3_content">
        <NavLink to="/Home" className='navbar_item_container'>
          <div className="grid-item">
            <i className="bi bi-house navbar_item" style={{ fontSize: '19px' }}></i>
            {"Home" == props.currentPage ? <div style={{ fontWeight: "bold" }}>Home</div> : <div>Home</div>}
          </div>
        </NavLink>
        <NavLink to="/Calendar" className='navbar_item_container' onClick={() => update("calendar")}>
          <div className="grid-item">
            <i className="bi bi-calendar navbar_item"></i>
            {"Calendar" == props.currentPage ? <div style={{ fontWeight: "bold" }}>Calendar</div> : <div>Calendar</div>}
          </div>
        </NavLink>
        <NavLink to="/Menu" className='navbar_item_container' onClick={() => update("menu")}>
          <div className="grid-item">
            <i className="bi bi-table navbar_item"></i>
            {"Menu" == props.currentPage ? <div style={{ fontWeight: "bold" }}>Menu</div> : <div>Menu</div>}
          </div>
        </NavLink>
        <NavLink to="/Schedule" className='navbar_item_container' onClick={() => update("schedule")}>
          <div className="grid-item">
            <i className="bi bi-dribbble navbar_item"></i>
            {"Schedule" == props.currentPage ? <div style={{ fontWeight: "bold" }}>Schedule</div> : <div>Schedule</div>}
          </div>
        </NavLink>

      <Logout />
      </div>
    </div>
    : <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid" style={{paddingLeft: "50px"}}>
      <a className="navbar-brand" href="#">
        LC DASHBOARD
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink to="/Home" className="nav-link" onClick={() => update("home")}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/Calendar" className="nav-link" onClick={() => update("calendar")}>
              Calendar
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/Menu" className="nav-link" onClick={() => update("menu")}>
              Menu
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/Schedule" className="nav-link" onClick={() => update("schedule")}>
              Schedule
            </NavLink>
          </li>
          <li className="nav-item">
            <Logout showEmoji = {false}/>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  
  
        }
</>


  )
}