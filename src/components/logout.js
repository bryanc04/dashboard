import React, { useState, createContext, useContext, useMemo } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { EncryptStorage } from 'encrypt-storage';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const auth = getAuth(app);

const encryptstorage = new EncryptStorage('asdffdsafdasfdasasdf', {
  prefix: '@instance',
  storageType: 'sessionStorage'
})


export default function Logout(props) {
  const logout = () => {
    signOut(auth).then(() => {
      navigate("/Login", { replace: true, state: props.to })
    })
      .catch((error) => {
        console.log(error);
      })
  }

  let navigate = useNavigate();
  return (
    <div 
      style={{ 
        cursor: 'pointer',
        border: '1px solid black',
        padding: '5px 10px',
        borderRadius: 10
      }} 
      onClick={() => { logout(); }}
    >
      Logout
    </div>
  )
}