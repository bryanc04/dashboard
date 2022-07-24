import React, {useState, useContext, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import Pop from "../components/popup";
import{bgimage} from "../components/popup";
import{background} from "../components/popup";
import { useSelector } from 'react-redux';
import { UserContext} from '../components/popup';
import moment from 'moment';
import { GridLoader } from "react-spinners";

import { HexColorPicker } from "react-colorful";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import ChromeDinoGame from 'react-chrome-dino';
import { EncryptStorage } from "encrypt-storage";
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


const encryptstorage = new EncryptStorage('asdffdsafdasfdasasdf', {
    prefix: '@instance',
    storageType: 'sessionStorage'
})



export default function Grades() {

    const [isLoggedin, setIsLoggedIn] = useState(false);

    const [backgroundOption, setBackgroundOption] = useState("change_bg_option_1");
    const [color1, setColor1] = useState("#efefef");
    const [color2, setColor2] = useState("#efefef");
    const [isLoading, setIsLoading] = useState(false);


    const [grade, setgrade] = useState({});

    useEffect(()=> {

        
        var loggedIn = encryptstorage.getItem("status");

        if (loggedIn == "logged in"){
            setIsLoggedIn(true)
        }
     
        const getGrades = async () => {
            setIsLoading(true);
            const collectionRef = collection(db, "grades");
            const q = query(collectionRef);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                setgrade(data);
                })
            
            setIsLoading(false);
            };

      
        getGrades();

        
    }, []);




    return(


        <div className="all">
            <div className="container-fluid blur" style={{ 
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
                
                <div className="col-10 px-0" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '175px'}}>

        
                    <div>
                        <p className="grade_page_title welcome_title ">Grade Manager</p>
                        <p className="grade_page_title welcome_title ">Grade Manager</p>
                      
                        <div className="grade_inner_container">
                            
                          
                               
                                    <div className="grade_inner_content">
                                        <div className="home_content">
                                            <div className="grade_page_container" style={{height: '100%'}}>
                                            {
                                                isLoading ?
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        height: '100%',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <GridLoader />
                                                </div>
                                                :
                                                isLoggedin
                                                ?
                                                Object.values(grade).map( (el, index) => 
                                                    <div key={index}>
                                                        <div className='class_1 grade_page_grade_class'>{el.class_name}
                                                        <div className="class_grade grade_page_grade">{el.ptd_letter_grade}</div></div>
                                                    </div>
                                                )
                                            
                                                :
                                                <ChromeDinoGame/>

                                                }
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
