import React from "react";
import s from "./Login.module.css";
import Loomis from "../assets/loomis.png"


export default function Login(){

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
                                <input type="text" className="form-control" id="inputUsername" aria-describedby="usernameHelp" placeholder="Enter your username" />
                                <small id="usernameHelp" className="form-text text-muted">Enter your Veracross username</small>
                            </div>
                            <div className="form-group" style={{marginTop: 20}}>
                                <label for="inputPassword">Password</label>
                                <input type="password" className="form-control" id="inputPassword" aria-describedby="passwordHelp" placeholder="Enter your password" />
                                <small id="usernameHelp" className="form-text text-muted">Enter your Veracross password</small>
                                <button type="submit" className={`${s.login_button} btn btn-primary shadow-none`} style={{width: '100%', marginTop: 20}}>Sign In</button>
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