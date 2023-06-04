import React, { useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import { Calendar as Bigcalendar, momentLocalizer } from 'react-big-calendar';
import Navbar from "../components/navbar/navbar";
import { v4 as uuidv4 } from "uuid";
import MenuCardCarousel from "../components/MenuCarouselCards";
import MenuCarousel from "../components/MenuCarousel"
import { Button, Modal, Form } from 'react-bootstrap';
import Pop from "../components/popup";
import Logout from "../components/logout";
import { bgimage } from "../components/popup";
import { background } from "../components/popup";
import { useSelector } from 'react-redux';
import { UserContext } from '../components/popup';
import moment from 'moment';
import Login from "./Login";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { GridLoader, PulseLoader } from "react-spinners";
import { HexColorPicker } from "react-colorful";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, query, orderBy, limit, getDoc, doc, documentId, setDoc } from "firebase/firestore";
import '../index.scss';
import ChromeDinoGame from 'react-chrome-dino';
import { ChromePicker } from "react-color";
import { encryptstorage } from '../components/encrypt'
import axios from "axios";
import { message, Space } from 'antd';
import 'antd/dist/antd.css';
import dayjs from "dayjs";
import Highlighter from "react-highlight-words";
import ThemePop from "../components/popup2";
import { Route, Routes } from "react-router-dom";
import PageTransition from "../components/PageTransition"
import DataTable from 'react-data-table-component';
import { useAuthState } from "react-firebase-hooks/auth";
import { Navbar2 } from "../components/navbar/navbar2.js";
import { Navbar3 } from "../components/navbar/navbar3.js";
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

export default function Home() {

    const [isLoggedin, setIsLoggedIn] = useState(false);

    const [backgroundOption, setBackgroundOption] = useState("change_bg_option_1");
    const [color1, setColor1] = useState("#efefef");
    const [color2, setColor2] = useState("#efefef");
    const [cardview, setCardview] = useState(true);
    const [cards, setCards] = useState([]);
    const [breakfastMenu, setBreakfastMenu] = useState();
    const [lunchMenu, setLunchMenu] = useState();
    const [dinnerMenu, setDinnerMenu] = useState();

    const [theme, setTheme] = useState("change_theme_option_1");
    const [themecolor, setthemecolor] = useState("#ffffff");

    const [dayArray, setDayArray] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);

    const [isLoading, setIsLoading] = useState(false);

    const [dailyBulletin, setDailyBulletin] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);

    const [grade, setgrade] = useState({});

    const [isNews, setIsNews] = useState(true);
    const [isGrades, setIsGrades] = useState(true);

    const [assignments, setAssignments] = useState();
    const [displayAssignments, setDisplayAssignments] = useState();
    const [checkflag, setCheckFlag] = useState(false);
    const [checked, setChecked] = useState([]);

    const [blocks, setBlocks] = useState({
        B1: '',
        B2: '',
        B3: '',
        B4: '',
        B5: '',
        B6: '',
        B7: '',
    });
    const [block, setBlock] = useState();
    const [blockSubject, setBlockSubject] = useState();
    const [nextBlock, setNextBlock] = useState("");
    const [rotation, setRotation] = useState("");

    const localizer = momentLocalizer(moment);

    const [events, setEvents] = useState();

    const [Menu, setMenu] = useState();
    const [Meal, setMeal] = useState();

    const [assignmentsDisplay, setAssignmentsDisplay] = useState();

    const [data, setData] = useState([]);

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const [schedule, setSchedule] = useState();
    const columns = [
        {
            name: 'Team',
            selector: row => row.Team,
        },
        {
            name: 'Opponent',
            selector: row => row.Opponent,
        },
        {
            name: 'Date',
            selector: row => row.Date,
        },
        {
            name: 'Time',
            selector: row => row.Time,
        }
    ];
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);


    const location = useLocation();

    const navigateTo = (destination) => {
        navigate(destination)
    }

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) {
            console.log('not user')
            navigate("/Login");
        }
    }, [user, loading])

    useEffect(() => {


        const checkupdated = async () => {
            var date = new Date();
            console.log(date.toString().substring(0, 10))
            const docRef = doc(db, "last_updated", user.email);
            const docSnap = await getDoc(docRef);
            var data = docSnap.data();
            if (!docSnap.exists()) {
                await setDoc(doc(db, "last_updated", user.email), {
                    last_updated: date
                });
                console.log("fakjsdhfjkdsahkj")
            }
            else {

                console.log(data['last_updated'].toDate().getDay())
                    ;
                if (data['last_updated'].toDate().toString().substring(0, 10) != date.toString().substring(0, 10)) {
                    console.log("date mismatch")
                    //run update grades
                    axios.post('https://loomis.herokuapp.com/updateGrades', {
                        username: user.email,
                        password: userInfo[1]
                    })
                        .then(function (response) {
                            message.success("Grades were succesfully updated")
                            axios.post('https://loomis.herokuapp.com/updateAssignments', {
                                username: user.email,
                                password: userInfo[1]
                            })
                                .then(async function (response) {
                                    message.success("Assignments were succesfully updated")
                                    await setDoc(doc(db, "last_updated", user.email), {
                                        last_updated: date
                                    });

                                })
                                .catch(function (error) {
                                    console.log(error);
                                })

                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }

            }
        }


        const checkOverallUpdated = async () => {
            axios.post("https://loomis.herokuapp.com/getRecommendation", {
                username: user.email,
                password: userInfo[1]
            })
                .then(function (response) {
                    var array = response.data;
                    console.log(response.data)
                    if (array.indexOf('assignments') <= array.indexOf('calendar')) {
                        setAssignmentsDisplay(true);
                    } else {
                        setAssignmentsDisplay(false);
                        getCalendar();
                    }
                })
            var date = new Date();
            console.log(date.toString().substring(0, 10))
            const docRef = doc(db, "last_updated", "Overall");
            const docSnap = await getDoc(docRef);
            var data = docSnap.data();
            if (!docSnap.exists()) {
                await setDoc(doc(db, "last_updated", "Overall"), {
                    last_updated: date
                });
            }
            else {

                console.log(data['last_updated'].toDate().toString().substring(0, 10));
                if (!dayjs().isSame(data['last_updated'].toDate().toISOString().split('T')[0], 'week')) {
                    console.log("overall date mismatch")
                    //run updates
                    axios.get('https://loomis.herokuapp.com/updateNews')
                        .then(function (response) {
                            message.success("The Daily Bulletin was succesfully updated")
                            axios.get('https://loomis.herokuapp.com/updateMenu')
                                .then(function (response) {
                                    message.success("Menu was succesfully updated")
                                    axios.get('https://loomis.herokuapp.com/updateAthleticSchedule')
                                        .then(async function (response) {
                                            message.success("Althetic Schedule was succesfully updated")
                                            await setDoc(doc(db, "last_updated", "Overall"), {
                                                last_updated: date
                                            });


                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        })


                                })
                                .catch(function (error) {
                                    console.log(error);
                                })

                        })
                        .catch(function (error) {
                            console.log(error);
                        })


                }

            }
        }

        const getDailyBulletin = async () => {
            // const querySnapshot = await getDocs(collection(db, "daily_bulletin"));
            // querySnapshot.forEach((doc)=>{
            //     console.log(doc.data());
            // })

            const collectionRef = collection(db, "daily_bulletin");
            const q = query(collectionRef, orderBy("uupdate_date", "desc"), limit(1));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                delete data['uupdate_date'];
                setDailyBulletin(data);
            })
        };



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
            console.log(data.dinner)
        }

        setIsLoading(false);




        const getSchedule = async () => {
            const collectionRef = collection(db, "Athletics_schedule");
            const q = query(collectionRef);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                var tempArray = []
                Object.values(data).map((element, index) => {
                    tempArray.push(element);
                })
                setData(tempArray);
                setSchedule(data);
            })
        }
        const getBlocks = async () => {
            const docRef = doc(db, "Block", user.email);
            const docSnap = await getDoc(docRef);
            var data = docSnap.data();
            console.log(data)
            setRotation(data['rotationDay']);
            delete data['rotationDay'];
            for (var i = 0; i < Object.keys(data).length; i++) {
                if (i < Object.keys(data).length - 1) {
                    var nowClassTime = moment(data[i]['time'], 'hh:mmA');
                    var nextClassTime = moment(data[i + 1]['time'], 'hh:mmA');
                    var nowTime = moment();

                    if (nowTime.isBetween(nowClassTime, nextClassTime)) {
                        if (data[i]['subtitle'].includes("•")) {
                            let gIndex = data[i]['subtitle'].indexOf("•");
                            let blockString = data[i]['subtitle'].substring(gIndex + 1, gIndex + 3)
                            setBlock(blockString);
                        }
                        else {
                            setBlock(data[i]['subtitle'])
                        }

                        if (data[i + 1]['subtitle'].includes("•")) {
                            let gIndex = data[i + 1]['subtitle'].indexOf("•");
                            let blockString = data[i + 1]['subtitle'].substring(gIndex + 1, gIndex + 3)
                            setNextBlock(blockString);
                        }
                        else {
                            setNextBlock(data[i + 1]['subtitle'])
                        }
                        setBlockSubject(data[i]['description'].slice(0, -3));
                        break;
                    }
                }
                else {
                    if (data[i]['subtitle'].includes("•")) {
                        let gIndex = data[i]['subtitle'].indexOf("•");
                        let blockString = data[i]['subtitle'].substring(gIndex + 1, gIndex + 3)
                        setBlock(blockString);
                    }
                    else {
                        setBlock(data[i]['subtitle'])
                    }

                    setNextBlock("")
                    setBlockSubject(data[i]['description'].slice(0, -3));

                }

            }


        }

        if(user)
        {
            getSchedule();
            getDailyBulletin();
            getBlocks();
            checkupdated();
            checkOverallUpdated();
            getMenu();
            getCalendar();
        }

    }, [user]);


    const MenuOnclick = () => {
        setIsNews(!isNews)
        console.log(isNews)
        // document.getElementById("name").style.color = "blue";
        console.log("fdasfasd")
    }


    const handleChange = (event) => {
        setBlocks({ ...blocks, [event.target.name]: event.target.value });
    }



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
        return text;
    }

    const adjustTheme = (newTheme) => {
        setthemecolor(newTheme);
        root.style.setProperty("--main", newTheme);
        message.success("Theme succesfully changed to " + newTheme);
    }

    const getCalendar = async () => {
        setIsLoading(true);
        const collectionRef = collection(db, "calendar");
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q);
        var tempEvents = [];
        var id = 0;
        querySnapshot.forEach((doc) => {
            var data = doc.data();
            let newData = Object.values(data)
            for (var i = 0; i < Object.keys(data).length; i++) {
                if (newData[i].events == "No Events") {
                    continue;
                }
                else {
                    for (var j = 0; j < newData[i].events.length; j++) {
                        let tempDict = {
                            id: id,
                            title: newData[i].events[j].title,
                            allDay: true,
                            start: newData[i].date,
                            end: newData[i].date
                        }
                        tempEvents.push(tempDict)
                        id = id + 1
                    }


                }
            }

        })

        setEvents(tempEvents)

        setIsLoading(false);
    };




    return (
        <>

            <div>
                <div className="all">
                    <div className="pickers_grid">
                        <Pop changeBackground={setBackgroundOption} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2} />
                        <ThemePop changeTheme={adjustTheme} color1={themecolor} setthemecolor={setthemecolor} />
                    </div>
                    <div className="container-fluid blur" style={{
                        backgroundColor: "rgb(254, 254, 254)",
                        backgroundImage: backgroundOption === "change_bg_option_1" ? "none" :
                            backgroundOption === "change_bg_option_2" ? "linear-gradient(62deg, #8ec5fc, #e0c3fc, #86a8e7, #eaafc8)" :
                                backgroundOption === "change_bg_option_3" ? "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" :
                                    backgroundOption === "change_bg_option_4" ? "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)" :
                                        backgroundOption === "change_bg_option_5" && (`linear-gradient(120deg, ${color1} 0%, ${color2} 100%)`),
                        animation: "gradient 5s ease infinite !important",
                        WebkitAnimation: "gradient 5s ease infinite !important",
                    }}></div>
                    <div className="row">

                        <div className="home_column home_column_left">
                            <Navbar3 theme={themecolor} currentPage="Home" /></div>
                        <div className="home_column home_column_center">
                            <p className="home_hi">Hi Bryan!</p>
                            <div className="home_center_top">
                                <Bigcalendar
                                    localizer={localizer}

                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: '100%' }}
                                    events={events && events}
                                />
                            </div>
                            <div className="home_center_bottom">
                                <div className="content_title">
                                    Current block
                                    <Button variant="primary" onClick={handleShow} style={{float: "right"}}>
                <i className="bi bi-input-cursor-text"></i>
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Your Blocks</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                        {Object.keys(blocks).map((block) => (
                            <Form.Group key={block}>
                                <Form.Label>{block}</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter subject..." 
                                    name={block} 
                                    value={blocks[block]} 
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
                                    
                                </div>
                                
                                <div className="big_container">
                                    <div className="big_block_container">
                                        {blocks[0]}
                                    </div>
                                    <div className="current_block_name">{blockSubject}</div>
                                </div>
                                <div className="block_wrapper">
                                    <div className="content_box a">Today is: <span style={{ color: themecolor }}>{rotation}</span></div>
                                    <div className="content_box b">Next up:  <span style={{ color: themecolor }}>{nextBlock}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="home_column home_column_right">
                            <div className="home_right_top">
                                {
                                    (new Date().getHours() >= 0 && new Date().getHours() < 11) ?
                                    (
                                        <div>
                                            <div class="home_menu_title">
                                                Breakfast Menu
                                            </div>
                                            {
                                                breakfastMenu &&
                                                Object.keys(breakfastMenu).length > 0 ?
                                                    Object.keys(breakfastMenu).sort().map((el, index) =>
                                                        <div key={index}>
                                                            <div className="meal_content_home">
                                                                {el}:
                                                            </div>
                                                            <div className="meal_content_details_home">
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
                                            }
                                        </div>
                                        )
                                        :
                                            (new Date().getHours() >= 11 && new Date().getHours() <= 15) ?
                                            (
                                            <div>
                                                <div class="home_menu_title">
                                                    Lunch Menu
                                                </div>
                                                {
                                                    lunchMenu &&
                                                    Object.keys(lunchMenu).length > 0 ?
                                                        Object.keys(lunchMenu).sort().map((el, index) =>
                                                            <div key={index}>
                                                                <div className="meal_content_home">
                                                                    {el}:
                                                                </div>
                                                                <div className="meal_content_details_home">
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
                                                }
                                            </div>
                                            )
                                            :
                                            (
                                            <div>
                                                <div class="home_menu_title">
                                                    Dinner Menu
                                                </div>
                                                {
                                                    dinnerMenu &&
                                                    Object.keys(dinnerMenu).length > 0 ?
                                                        Object.keys(dinnerMenu).sort().map((el, index) =>
                                                            <div key={index}>
                                                                <div className="meal_content_home">
                                                                    {el}:
                                                                </div>
                                                                <div className="meal_content_details_home">
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
                                                }
                                            </div>
                                            )
                                }

                            </div>
                            <div className="home_right_bottom">
                                {Object.values(dailyBulletin).map((el, index) => <div key={index} className="news">

                                    <p className="news_heading">
                                        <Highlighter

                                            searchWords={["NEW", "Important"]}
                                            autoEscape={true}
                                            textToHighlight={el.Title}
                                            highlightStyle={{ color: "black", backgroundColor: "white" }} />
                                    </p>
                                    <p className="news_content">{shortenText(el.Content, 100)}</p>
                                </div>
                                )}
                            </div>


                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

