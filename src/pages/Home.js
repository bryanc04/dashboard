import React from "react";
import Navbar from "../components/navbar/navbar";
import disableScroll from 'disable-scroll';

// var name = window. prompt("Enter your name: ")
disableScroll.on();

export default function Home() {
    
    return(
        <div className="container-fluid">
            
            <div className="row">
                <Navbar />
                <div className="col-10 px-0" style={{ marginLeft: 'auto', marginRight: 'auto'}}>
                    <div>
                        <p className="home_title welcome_title ">Welcome</p>
                        <p className="home_title name_title"> Bryan </p>
                    </div>
                    <div className="home_container" style={{overflow: 'hidden', height: '100%'}}>
                        <div className="home_inner_container">
                            <div className="home_left">
                                <div className="home_left_top">
                                    <div className="home_content">
                                    </div>
                                    <div className="content_title">
                                        Assignments
                                        <hr className="hr"/>
                                    </div>
                                    <div className="content">
                                            Hello
                                    </div>
                                    </div>
 
                                <div className="home_left_bottom">
                                    <div className="home_left_bottom_left">
                                        <div className="home_content">
                                            Current Block
                                        </div>
                                    </div>
                                    <div className="home_left_bottom_right">
                                        <div className="home_content">
                                            Grades/Schedule
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="home_right">
                                <div className="home_content">
                                    News/Bulletin
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}