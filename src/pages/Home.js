import React, {useState, useContext, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import disableScroll from 'disable-scroll';
import Pop from "../components/popup";
import{bgimage} from "../components/popup";
import{background} from "../components/popup";
import { useSelector } from 'react-redux';
import { UserContext} from '../components/popup';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const db = getFirestore(app);


disableScroll.on();

export default function Home() {

    const [backgroundOption, setBackgroundOption] = useState("change_bg_option_1");
    const [color1, setColor1] = useState("efefef");
    const [color2, setColor2] = useState("efefef");

    const [dailyBulletin, setDailyBulletin] = useState({});

    useEffect(()=> {
        const getDailyBulletin = async () => {
            // const querySnapshot = await getDocs(collection(db, "daily_bulletin"));
            // querySnapshot.forEach((doc)=>{
            //     console.log(doc.data());
            // })
            
            const collectionRef = collection(db, "daily_bulletin");
            const q = query(collectionRef, orderBy("uupdate_date"), limit(1));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                delete data['uupdate_date'];
                setDailyBulletin(data);
            })
        }

        getDailyBulletin();
        
    }, [])



    return(


        <div className="all">
            <div className="a blur" style={{ 
            backgroundColor: "rgb(239, 239, 239)", 
            backgroundImage: backgroundOption === "change_bg_option_1" ?  "none" : 
                            backgroundOption === "change_bg_option_2" ? "linear-gradient(62deg, #8ec5fc, #e0c3fc, #86a8e7, #eaafc8)" :
                            backgroundOption === "change_bg_option_3" ? "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" :
                            backgroundOption === "change_bg_option_4" ? "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)":
                            backgroundOption === "change_bg_option_5" && (`linear-gradient(120deg, ${color1} 0%, ${color2} 100%)`),
            animation: "gradient 5s ease infinite !important",
            WebkitAnimation: "gradient 5s ease infinite !important",
            }}>
            
        

            <div className="row">
                <Pop changeBackground={setBackgroundOption} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2}/>
                <Navbar />
                
                <div className="col-10 px-0" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop:'-90px'}}>

                    <div className="home_container" style={{overflow: 'hidden', height: '100%'}}>
                    <div>
                        <p className="home_title welcome_title ">Welcome</p>
                        <p className="home_title name_title"> Bryan </p>
                    </div>
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
                                            <div className="gap"></div>
                                            <div className="assignments_container bottom">
                                                <div className="assignments_container_time_2">
                                                    1:45
                                                </div>
                                                <div className="assignments_assignments_2">Complete Problem Set 1</div>
                                                <div className="assignments_detail_2">B4 CL Calculus BC</div>
                                            </div>
                                                <div className="arrow_container"><i class="bi bi-arrow-down-short down_arrow"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="home_left_bottom">
                                    <div className="home_left_bottom_left">
                                        <div className="home_content current_block">
                                            Current Block
                                            <div className="big_container">
                                            <div className="big_block_container">
                                                B5
                                            </div>
                                            <div className="current_block_name">Chemistry</div>
                                            </div>
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
                                        {
                                            Object.values(dailyBulletin).map( (el, index) => 
                                                <div key={index} className="news  1">
                                                    <p className="news_heading">{el.Title}</p>
                                                    <p className="news_content">{el.Content}</p>
                                                </div>
                                            )
                                        }
                                        {/* <div className="news  1">
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
                                        </div> */}
                                        
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
