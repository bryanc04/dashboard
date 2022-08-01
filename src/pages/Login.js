import React, { useState, useEffect } from "react";
import s from "./Login.module.css";
import Loomis from "../assets/loomis.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message, Space } from 'antd';
import 'antd/dist/antd.css';
import { encryptstorage } from '../components/encrypt'



export default function Login(){

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        var loggedIn = encryptstorage.getItem("status", "logged in", username, password);
        if (loggedIn== "logged in"){
            navigate("/Home", {replace: true})
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

        setIsLoading(true);
        axios.post('https://loomis.herokuapp.com/', {
            username: username,
            password: password
        })
        .then(function(response) {
            var data = response.data;
            setIsLoading(false);
            if (data == "Valid"){

                encryptstorage.setItem("status", "logged in")
                encryptstorage.setItem("userInfo", [username, password])
                navigate("/Home", { replace: true })
            }else{
                message.error("Wrong username or password.")
            }
        })
        .catch(function(error){
            console.log (error);
        })
    }

    return(
        <div className={s.login_container}>
            <div className={s.left_container}>
                <div className={s.login_title}>
                    LOOMIS
                </div>
                <div style={{padding: '0 20%', display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '80%'}}>
                    <div style={{fontSize: '30px', fontWeight: 'bold'}}>
                        Welcome Back
                    </div>
                    <div>
                            <div className="form-group" style={{marginTop: 20}}>
                                <label for="inputUsername">Username</label>
                                <input type="text" className="form-control" id="inputUsername" aria-describedby="usernameHelp" placeholder="Enter your username" onChange={(event) => setUsername(event.target.value)}/>
                                <small id="usernameHelp" className="form-text text-muted">Enter your Veracross username</small>
                            </div>
                            <div className="form-group" style={{marginTop: 20}}>
                                <label for="inputPassword">Password</label>
                                <input type="password" className="form-control" id="inputPassword" aria-describedby="passwordHelp" placeholder="Enter your password" onChange={(event) => setPassword(event.target.value)}/>
                                <small id="usernameHelp" className="form-text text-muted">Enter your Veracross password</small>
                                <button type="submit" onClick={() => {login();}} className={`${s.login_button} btn btn-primary shadow-none`} style={{width: '100%', marginTop: 20}}>
                                    { 
                                    isLoading 
                                    ? 
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden='true'/>
                                    :
                                    "Sign in"
                                    }
                                </button>
                            </div>

                    </div>
                </div>
            </div>
            <div className={s.right_container}>
                <div style={{padding: '40%'}}>
                    <img className="lc_logo" src={Loomis} style={{width: '100%', height: '100%'}}/>
                </div>
            </div>

        </div>
    );
}