import React, {useState, useContext } from "react";
import Navbar from "../components/navbar/navbar";
import disableScroll from 'disable-scroll';
import Pop from "../components/popup";
import{bgimage} from "../components/popup";
import{background} from "../components/popup";
import { useSelector } from 'react-redux';
import { UserContext} from '../components/popup'





// export const changebg1 = event => {
//         let background = "#8EC5FC";
//         let bgimage = "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)";
//         alert("button was clicked");
//       };

// var name = window. prompt("Enter your name: ")
disableScroll.on();

export default function Home() {
    const background_option = useSelector( (state=> state));
    const fdsa = useContext(UserContext).userName;
    // let [background,changebg] = useState('rgb(239, 239, 239)')
    // let [bgimage,changebgimage] = useState('none')
    // const accessedbg = useSelector( (state) => state);background-color: #8EC5FC;
    let [ finalbg, changefinalbg ] = useState([background_option]);

    // if (background_option == 'none'){
    //     changefinalbg(fdsa)
    //     reut
    // }else{
    //     changefinalbg(background_option)
    // }

    return(

        
        <div className="container-fluid" style={{ backgroundColor: "rgb(239, 239, 239)" , backgroundImage: background_option }}>

            <div className="row">
                <Pop />
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
                                        <div className="content_title">
                                            Assignments
                                            <hr className="hr"/>
                                            <div className="assignments_content">Due Tommorow</div>
                                            <div className="assignments_container top">
                                                <div className="assignments_container_time">
                                                    12:15
                                                </div>
                                                <div className="assignments_assignments">Finish Final Project</div>
                                                <div className="assignments_detail">B6 World History</div>
                                            </div>
                                            <div className="assignments_container bottom"/>
                                            <div className="assignments_container_time_2">
                                                    1:45
                                                </div>
                                                <div className="assignments_assignments_2">Complete Problem Set 1</div>
                                                <div className="assignments_detail_2">B4 CL Calculus BC</div>
                                                <div className="arrow_container"><i class="bi bi-arrow-down-short down_arrow"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="home_left_bottom">
                                    <div className="home_left_bottom_left">
                                        <div className="home_content current_block">
                                            Current Block
                                            <div className="big_block_container">
                                                B5
                                            </div>
                                            <div className="current_block_name">Chemistry</div>
                                            <div class="block_wrapper">
                                            <div class="content_box a">Today is: D6</div>
                                            <div class="content_box b">Next up: B7</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="home_left_bottom_right">
                                        <div className="home_content">
                                            <div className="grade_title">My Grades:</div>
                                            <div className="grade_container">
                                                <div className="class_1">Advanced Chemistry:</div>
                                                <div>A</div>
                                                <div className="class_2">CL Calculus BC:</div>
                                                <div>A</div>
                                                <div className="class_3">English I:</div>
                                                <div>A</div>
                                                <div className="class_4">Advanced Latin III:</div>
                                                <div>F</div>
                                                <div className="class_5">World History:</div>
                                                <div>A</div>
                                                <div className="class_6">Graphic Design</div>
                                                <div>A</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="home_right">
                                <div className="home_content">
                                    News:
                                    <div className="news-container">
                                        <div className="news  1">
                                            <p className="news_heading">The NEO is Officially Open!</p>
                                            <p className="news_content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                        </div>
                                        <div className="news  1">
                                            <p className="news_heading">Return Library Books by This Friday</p>
                                            <p className="news_content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                        </div>
                                        <div className="news  1">
                                            <p className="news_heading">School is Closed on Sunday</p>
                                            <p className="news_content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                        </div>
                                        <div className="news  1">
                                            <p className="news_heading">No Study Hall Tongiht</p>
                                            <p className="news_content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
    
        
                    </div>
                </div>
            </div>
        </div>
     

    )
}
