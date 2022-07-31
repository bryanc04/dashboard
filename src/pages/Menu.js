import React, {useState, useContext, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import Pop from "../components/popup";
import{bgimage} from "../components/popup";
import{background} from "../components/popup";
import { useSelector } from 'react-redux';
import { UserContext} from '../components/popup';
import moment from 'moment';
import { GridLoader } from "react-spinners";
import ChromeDinoGame from 'react-chrome-dino';
import { HexColorPicker } from "react-colorful";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
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


export default function Menu() {
    const [isLoggedin, setIsLoggedIn] = useState(false);

    const [backgroundOption, setBackgroundOption] = useState("change_bg_option_1");
    const [color1, setColor1] = useState("efefef");
    const [color2, setColor2] = useState("efefef");

    const [breakfastMenu, setBreakfastMenu] = useState();
    const [lunchMenu, setLunchMenu] = useState();
    const [dinnerMenu, setDinnerMenu] = useState();

    const [dailyBulletin, setDailyBulletin] = useState([{},{},{},{},{},{},{},{}]);

    const [grade, setgrade] = useState({});

    const [block, setBlock] = useState();
    const [blockSubject, setBlockSubject] = useState();
    const [nextBlock, setNextBlock] = useState("");
    const [rotation, setRotation] = useState("");
    const classindex = ['class_1', 'class_2', 'class_3', 'class_4', 'class_5', 'class_6', 'class_7']

    useEffect(()=> {

        var loggedIn = encryptstorage.getItem("status");

        if (loggedIn[0] == "logged in"){
            setIsLoggedIn(true)
        }
     

        const getMenu = async () => {
            const collectionRef = collection(db, "menu");
            const q = query(collectionRef);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                setBreakfastMenu(data.breakfast);
                setLunchMenu(data.lunch);
                setDinnerMenu(data.dinner);
            });
                
        }

        getMenu();
    }, []);

    const shortenText = (text, length) => {
        if(text == null) {
            return "";
        }
        if(text.length < length) {
            return text;
        }
        text = text.substring(0, length);
        let last = text.lastIndexOf(" ");
        text = text.substring(0, last);
        return text + "...";
    }



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
                    <div>
                        <p className="menu_main_title welcome_title ">Menu</p>
                        <p className="menu_main_title welcome_title ">Menu</p>
                    </div>
                        <div className="menu_inner_container">
                            <div className="menu_top menu_content">
                                <div className="meal_title">
                                    Breakfast
                                </div>
                                {
                                    isLoggedin
                                    ?

                                    breakfastMenu ? Object.keys(breakfastMenu).sort().map((el, index) => 
                                        <div key={index}>
                                            <div className="meal_content">
                                                {el}:
                                            </div>
                                            <div className="meal_content_details">
                                                {
                                                    breakfastMenu[el].map((el2, index2) => 
                                                        <div key={index2}>
                                                            {el2}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                    :
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%'
                                        }}
                                    >
                                        <GridLoader />
                                    </div>
                                    :
                                    <ChromeDinoGame/>
                                }
                            </div>
                            <div className="menu_center menu_content">
                                <div className="meal_title">
                                    Lunch
                                </div>
                                {
                                    lunchMenu ? Object.keys(lunchMenu).sort().map((el, index) => 
                                        <div key={index}>
                                            <div className="meal_content">
                                                {el}:
                                            </div>
                                            <div className="meal_content_details">
                                                {
                                                    lunchMenu[el].map((el2, index2) => 
                                                        <div key={index2}>
                                                            {el2}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                    :
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%'
                                        }}
                                    >
                                        <GridLoader />
                                    </div>
                                }
                            </div>
                            <div className="menu_bottom menu_content">
                                <div className="meal_title">
                                    Dinner
                                </div>
                                {
                                    dinnerMenu ? Object.keys(dinnerMenu).sort().map((el, index) => 
                                        <div key={index}>
                                            <div className="meal_content">
                                                {el}:
                                            </div>
                                            <div className="meal_content_details">
                                                {
                                                    dinnerMenu[el].map((el2, index2) => 
                                                        <div key={index2}>
                                                            {el2}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                    :
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%'
                                        }}
                                    >
                                        <GridLoader />
                                    </div>
                                }
                            </div>
                        </div>
                            
    
        
                    </div>
                </div>
            </div>
        </div>
        </div>
        
     

    )
}
