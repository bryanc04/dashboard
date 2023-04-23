import React, { useState, useEffect } from "react";
import s from "./Login.module.css";
import Loomis from "../assets/loomis.png";
import Logo from "../assets/logo.png";
import Logo2 from "../assets/logo2.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { message, Space } from 'antd';
import 'antd/dist/antd.css';
import { encryptstorage } from '../components/encrypt'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuthState } from "react-firebase-hooks/auth";

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


export default function Login(props){



    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[isLoading, setIsLoading] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    let navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        AOS.init();
    }, [])

    useEffect(() => {
        if(loading) {
            return;
        }
        if(user) {
            navigate('/Home', {replace: true})
        }
    }, [user, loading])

    const login = () => {

        setIsLoading(true);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setIsLoading(false);
            navigate("/Home", {replace: true});
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode == "auth/invalid-email")
            {
                message.error("Invalid email format.");
                setIsLoading(false);
            }
            else if (errorCode == "auth/wrong-password")
            {
                message.error("Incorrect Password")
                setIsLoading(false);
            }
            else if (errorCode == "auth/user-not-found")
            {
                message.error("User does not exist, please sign up")
                setIsLoading(false);
            }
        });
        }

    const enterPress = (el) => {
        if (el.keyCode === 13){
            login();
        }
    }

    return(
          <div className={s.login_container}>
            <div style={{
                width: '100%'
            }}>
            <div 
                className={s.login_title}
                style={{
                    alignItems: 'center',
                    display: 'flex'
                }}
            >
                <img className="lc_logo" src={Logo2} style={{width: 20, height: 20, marginRight: 10}}/>
                LC Dashboard
            </div>
            <div className={s.left_container} data-aos="fade-up" data-aos-duration="1000">
                <div style={{padding: '0 20%', display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '80%'}}>
                    <div style={{fontSize: '30px', fontWeight: 'bold'}}>
                        Welcome!
                    </div>
                    <div>
                            <div className="form-group" style={{marginTop: 20}}>
                                <label for="inputUsername">Email</label>
                                <input type="text" className="form-control" id="inputUsername" aria-describedby="usernameHelp" placeholder="example@example.com" onChange={(event) => setUsername(event.target.value)} onKeyDown={(el) => enterPress(el)} />
                                <small id="usernameHelp" className="form-text text-muted">Enter your email</small>
                            </div>
                            <div className="form-group" style={{marginTop: 20}}>
                                <label for="inputPassword">Password</label>
                                <input type="password" className="form-control" id="inputPassword" aria-describedby="passwordHelp" placeholder="Enter your password" onChange={(event) => setPassword(event.target.value)} onKeyDown={(el) => enterPress(el)}/>
                                <small id="usernameHelp" className="form-text text-muted">Enter your new password</small>
                            </div>

                            <button type="submit" onClick={() => {login();}} className={`${s.login_button} btn btn-primary shadow-none`} style={{width: '100%', marginTop: 20}}>
                                    { 
                                    isLoading 
                                    ? 
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden='true'/>
                                    :
                                    "Sign in"
                                    }
                            </button>
                            <div
                                style={{
                                    textAlign: 'center'
                                }}
                            >
                                Don't have an account? <span style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={() => {navigate("/Signup");}}>Sign Up</span>
                            </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

