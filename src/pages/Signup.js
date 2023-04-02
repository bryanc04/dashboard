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



export default function Signup(props){


    const [name, setName] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const[isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const {state} = useLocation();

    useEffect(() => {
        var loggedIn = encryptstorage.getItem("status", "logged in", username, password);
        if (loggedIn== "logged in"){
            if (state != null){
            navigate(state, {replace: true})
            }
        }
    }, [])

    const login = () => {

        if(username == ""){
            message.error("Please input a username");
            return;
        }else if(password == ""){
            message.error("Please input a password");
            return;
        }
        else if(name == ""){
            message.error("Please enter a name");
            return;
        }
        else if(password != password2){
            message.error("Passwords do not match");
            return;
        }

        setIsLoading(true);
        


    }

    const enterPress = (el) => {
        if (el.keyCode === 13){
            login();
        }
    }

    return(
        <div className={s.login_container}>
            <div className={s.left_container}>
                <div className={s.login_title}>
                    LC DASHBOARD
                </div>
                <div style={{padding: '0 20%', display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '80%'}}>
                    <div style={{fontSize: '30px', fontWeight: 'bold'}}>
                        Welcome!
                    </div>
                    <div>
                        <div className="form-group" style={{marginTop: 20}}>
                                <label for="inputUsername">First Name</label>
                                <input type="text" className="form-control" id="inputUsername" aria-describedby="usernameHelp" placeholder="ex: John" onChange={(event) => setName(event.target.value)} onKeyDown={(el) => enterPress(el)} />
                                <small id="usernameHelp" className="form-text text-muted">Enter your name</small>
                            </div>
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
                            <div className="form-group" style={{marginTop: 20}}>
                                <label for="inputPassword">Confirm password</label>
                                <input type="password" className="form-control" id="inputPassword" aria-describedby="passwordHelp" placeholder="Enter your password again" onChange={(event) => setPassword2(event.target.value)} onKeyDown={(el) => enterPress(el)}/>
                                <small id="usernameHelp" className="form-text text-muted">Enter your new password again</small>
                            </div>
                            <button type="submit" onClick={() => {login();}} className={`${s.login_button} btn btn-primary shadow-none`} style={{width: '100%', marginTop: 20}}>
                                    { 
                                    isLoading 
                                    ? 
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden='true'/>
                                    :
                                    "Sign up"
                                    }
                            </button>

                    </div>
                </div>
            </div>
            <div className={s.right_container}>
                <div style={{padding: '40%'}}>
                    <img className="lc_logo" src={Logo2} style={{width: '100%', height: '100%'}}/>
                </div>
            </div>

        </div>
    );
}

