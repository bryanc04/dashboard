import React, {useState} from "react";
import Navbar from "../components/navbar/navbar";
import disableScroll from 'disable-scroll';
import Pop from "../components/popup";
import{bgimage} from "../components/popup";
import{background} from "../components/popup";
import { useSelector } from 'react-redux';





// export const changebg1 = event => {
//         let background = "#8EC5FC";
//         let bgimage = "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)";
//         alert("button was clicked");
//       };

// var name = window. prompt("Enter your name: ")
disableScroll.on();

export default function Home() {
    const background_option = useSelector( (state=> state));
    // let [background,changebg] = useState('rgb(239, 239, 239)')
    // let [bgimage,changebgimage] = useState('none')
    // const accessedbg = useSelector( (state) => state);background-color: #8EC5FC;

    return(

        
        <div className="container-fluid" style={{ backgroundColor: "rgb(239, 239, 239)" , backgroundImage: background_option}}>

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

