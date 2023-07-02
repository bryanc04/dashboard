import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import { Navbar3 } from "../components/navbar/navbar3";
import Pop from "../components/popup";
import ThemePop from "../components/popup2";
import Logout from "../components/logout";
import Login from "./Login";
import { bgimage } from "../components/popup";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { background } from "../components/popup";
import { useSelector } from 'react-redux';
import { UserContext } from '../components/popup';
import moment from 'moment';
import { GridLoader } from "react-spinners";
import ChromeDinoGame from 'react-chrome-dino';
import { HexColorPicker } from "react-colorful";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { encryptstorage } from '../components/encrypt';
import { v4 as uuidv4 } from "uuid";
import Carousel from "react-spring-3d-carousel";
import MenuCarousel from "../components/MenuCarousel"
import MenuCardCarousel from "../components/MenuCarouselCards";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

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
const auth = getAuth(app);



export default function Menu() {
    const [isLoggedin, setIsLoggedIn] = useState(false);

    const [backgroundOption, setBackgroundOption] = useState("change_bg_option_1");
    const [color1, setColor1] = useState("efefef");
    const [color2, setColor2] = useState("efefef");

    const [breakfastMenu, setBreakfastMenu] = useState();
    const [lunchMenu, setLunchMenu] = useState();
    const [dinnerMenu, setDinnerMenu] = useState();

    const [cardbreakfastMenu, setcardBreakfastMenu] = useState();
    const [cardlunchMenu, setcardLunchMenu] = useState();
    const [carddinnerMenu, setcardDinnerMenu] = useState();

    const [cardview, setCardview] = useState(true);

    const [cards, setCards] = useState([]);


    const [themecolor, setthemecolor] = useState("#ffffff");

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();


    const adjustTheme = (newTheme) => {
        setthemecolor(newTheme);
        root.style.setProperty("--main", newTheme);
        message.success("Theme succesfully changed to " + newTheme);
    }

    const changeView = () => {
        setCardview(!cardview);
    }

    // $('#onclick').click(function(){
    //     alert($(this).text());
    // });

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) {
            navigate('/Login');
        }
    }, [user, loading])



    useEffect(() => {

        var loggedIn = encryptstorage.getItem("status");

        if (loggedIn == "logged in") {
            setIsLoggedIn(true)
        }


        const getMenu = async () => {
            const collectionRef = collection(db, "menu");
            const q = query(collectionRef);
            const querySnapshot = await getDocs(q);
            var tempBreakfast;
            var tempLunch;
            var tempDinner;
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                setBreakfastMenu(data.breakfast);
                setLunchMenu(data.lunch);
                setDinnerMenu(data.dinner);
                tempBreakfast = data.breakfast;
                tempLunch = data.lunch;
                tempDinner = data.dinner;
                console.log("Menu Gotten")
            });

            setCards([
                {
                    key: uuidv4(),
                    content: <MenuCardCarousel mealtype="Breakfast" style={{ color: "black" }} alt="1" content={
                        tempBreakfast ? Object.keys(tempBreakfast).length > 0 ? Object.keys(tempBreakfast).sort().map((el, index) =>
                            <div key={index}>
                                <div className="meal_content">
                                    {el}:
                                </div>
                                <div className="meal_content_details">
                                    {
                                        tempBreakfast[el].map((el2, index2) =>
                                            <div key={index2}>
                                                {el2}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                            :
                            <div>
                                No Breakfast Menu
                            </div>
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

                    } />
                },
                {
                    key: uuidv4(),
                    content: <MenuCardCarousel mealtype="Lunch" alt="2" content={
                        tempLunch ? Object.keys(tempLunch).length > 0 ? Object.keys(tempLunch).sort().map((el, index) =>
                            <div key={index}>
                                <div className="meal_content" style={{ fontFamily: "DM Sans", color: "ffffff !important" }}>
                                    {el}:
                                </div>
                                <div className="meal_content_details">
                                    {
                                        tempLunch[el].map((el2, index2) =>
                                            <div key={index2} >
                                                {el2}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                            :
                            <div>
                                No Lunch Menu
                            </div>
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

                    } />
                },
                {
                    key: uuidv4(),
                    content: <MenuCardCarousel mealtype="Dinner" alt="3" content={
                        tempDinner ? Object.keys(tempDinner).length > 0 ? Object.keys(tempDinner).sort().map((el, index) =>
                            <div key={index}>
                                <div className="meal_content">
                                    {el}:
                                </div>
                                <div className="meal_content_details">
                                    {
                                        tempDinner[el].map((el2, index2) =>
                                            <div href='#' key={index2} id="onclick">
                                                {el2}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                            :
                            <div>
                                No Dinner Menu
                            </div>
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
                    } />
                },
            ])

        }

        getMenu();
    }, []);

    const shortenText = (text, length) => {
        if (text == null) {
            return "";
        }
        if (text.length < length) {
            return text;
        }
        text = text.substring(0, length);
        let last = text.lastIndexOf(" ");
        text = text.substring(0, last);
        return text + "...";
    }

    const returnMenu = (menu) => {

        //     breakfastMenu ? Object.keys(breakfastMenu).sort().map((el, index) => 
        //     <div key={index}>
        //         <div className="meal_content">
        //             {el}:
        //         </div>
        //         <div className="meal_content_details">
        //             {
        //                 breakfastMenu[el].map((el2, index2) => 
        //                     <div key={index2}>
        //                         {el2}
        //                     </div>
        //                 )
        //             }
        //         </div>
        //     </div>
        // )
        // :
        // <div
        //     style={{
        //         display: 'flex',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         height: '100%'
        //     }}
        // >
        //     <GridLoader />
        // </div>

    }




    return (


        <div>
            <div className="all">
                <div className="container-fluid blur" style={{
                    backgroundColor: "rgb(254, 254, 254)",
                    backgroundImage: backgroundOption === "change_bg_option_1" ? "none" :
                        backgroundOption === "change_bg_option_2" ? "linear-gradient(62deg, #8ec5fc, #e0c3fc, #86a8e7, #eaafc8)" :
                            backgroundOption === "change_bg_option_3" ? "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" :
                                backgroundOption === "change_bg_option_4" ? "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)" :
                                    backgroundOption === "change_bg_option_5" && (`linear-gradient(120deg, ${color1} 0%, ${color2} 100%)`),
                    animation: "gradient 5s ease infinite !important",
                    WebkitAnimation: "gradient 5s ease infinite !important",
                    padding: 0
                }}>
<div className="row g-0">

    <div className="home_column_left">
                            <Navbar3 theme={themecolor} currentPage="Menu"/>
                            
    </div>
    <div style={{width: '85%', height: '100vh'}}>

                                <div className="pickers_grid">
                                    <Pop changeBackground={setBackgroundOption} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2} />
                                    <ThemePop changeTheme={adjustTheme} color1={themecolor} setthemecolor={setthemecolor} />
                                </div>

                                
                                <div className="menu_inner_container">
                                        <div
                                            style={{
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                                width: '90%',
                                                marginLeft: 'auto',
                                                marginRight: 'auto'
                                            }}
                                        >
                                            School Menu
                                        </div>
                                        <div className="menu_flex_container"><div className="menu_top menu_content">
                                            <div className="meal_title">
                                                Breakfast
                                            </div>
                                            <div className="menu_scroll">
                                                {

                                                    breakfastMenu ?
                                                        Object.keys(breakfastMenu).length > 0 ?
                                                            Object.keys(breakfastMenu).sort().map((el, index) =>
                                                                <div key={index}>
                                                                    <div className="meal_content_home">
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
                                                            ) :
                                                            <div>
                                                                No breakfast menu
                                                            </div>
                                                        :
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                height: '100%',
                                                            }}
                                                        >
                                                            <GridLoader />
                                                        </div>

                                                }
                                            </div>
                                        </div>
                                            <div className="menu_center menu_content">
                                                <div className="meal_title">
                                                    Lunch
                                                </div>
                                                <div className="menu_scroll">
                                                    {
                                                        lunchMenu ?
                                                            Object.keys(lunchMenu).length > 0 ?
                                                                Object.keys(lunchMenu).sort().map((el, index) =>
                                                                    <div key={index}>
                                                                        <div className="meal_content_home">
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
                                                                <div>
                                                                    No Lunch Menu
                                                                </div>
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
                                            <div className="menu_bottom menu_content">
                                                <div className="meal_title">
                                                    Dinner
                                                </div>
                                                <div className="menu_scroll">
                                                    {
                                                        dinnerMenu ?
                                                            Object.keys(dinnerMenu).length > 0 ?
                                                                Object.keys(dinnerMenu).sort().map((el, index) =>
                                                                    <div key={index}>
                                                                        <div className="meal_content_home">
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
                                                                <div>
                                                                    No Dinner Menu
                                                                </div>
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
                                            </div></div>




                                </div>












                            </div>
                        </div>
        </div>
        </div>
        </div>



    )
}


