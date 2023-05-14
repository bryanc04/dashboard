import React, { useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import { Calendar as Bigcalendar, momentLocalizer } from 'react-big-calendar';
import Navbar from "../components/navbar/navbar";
import Pop from "../components/popup";
import Logout from "../components/logout";
import { bgimage } from "../components/popup";
import { background } from "../components/popup";
import { useSelector } from 'react-redux';
import { UserContext } from '../components/popup';
import moment from 'moment';
import Login from "./Login";
import { Link, useLocation } from "react-router-dom";
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
import { useNavigate, Route, Routes } from "react-router-dom";
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




    let navigate = useNavigate();
    const location = useLocation();

    const navigateTo = (destination) => {
        navigate(destination)
    }

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
        }
    }, [user])

    useEffect(() => {


        var loggedIn = encryptstorage.getItem("status");

        var userInfo = encryptstorage.getItem("userInfo")
        console.log(userInfo)

        if (loggedIn == "logged in") {
            setIsLoggedIn(true)
        }

        const checkupdated = async () => {
            var date = new Date();
            console.log(date.toString().substring(0, 10))
            const docRef = doc(db, "last_updated", userInfo[0]);
            const docSnap = await getDoc(docRef);
            var data = docSnap.data();
            if (!docSnap.exists()) {
                await setDoc(doc(db, "last_updated", userInfo[0]), {
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
                        username: userInfo[0],
                        password: userInfo[1]
                    })
                        .then(function (response) {
                            message.success("Grades were succesfully updated")
                            axios.post('https://loomis.herokuapp.com/updateAssignments', {
                                username: userInfo[0],
                                password: userInfo[1]
                            })
                                .then(async function (response) {
                                    message.success("Assignments were succesfully updated")
                                    await setDoc(doc(db, "last_updated", userInfo[0]), {
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
                username: userInfo[0],
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
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                var date = new Date();
                date = date.getHours();
                if ((date >= 0 && date < 9) || date >= 8) {
                    setMenu(data.breakfast);
                    setMeal("Breakfast");
                } else if (date >= 9 && date <= 1) {
                    setMenu(data.lunch);
                    setMeal("Lunch");
                } else if (date > 1 && date < 8) {
                    setMenu(data.dinner);
                    setMeal("Dinner");
                }

                console.log(Menu)
            });

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


        getSchedule();



        const getBlocks = async () => {
            const docRef = doc(db, "Block", userInfo[0]);
            const docSnap = await getDoc(docRef);
            var data = docSnap.data();
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

        // getDailyBulletin();
        // getBlocks();
        // checkupdated();
        // checkOverallUpdated();
        // getMenu();

    }, []);


    const MenuOnclick = () => {
        setIsNews(!isNews)
        console.log(isNews)
        // document.getElementById("name").style.color = "blue";
        console.log("fdasfasd")
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

    }




    return (
        <>
            
            <div>
                {
                    isLoggedin
                        ?
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
                                Hi
                                <div className="home_column home_column_left"><Navbar3 theme={themecolor} /></div>
                                <div className="home_column home_column_center">
                                    <p className="home_hi">Hi Bryan!</p>
                                    <div className="home_center_top">
                                                                <div className="content_title">
                                                                    Current Block
                                                                </div>
                                                                <div className="big_container">
                                                                    <div className="big_block_container">
                                                                        {block}
                                                                    </div>
                                                                    <div className="current_block_name">{blockSubject}</div>
                                                                </div>
                                                                <div className="block_wrapper">
                                                                    <div className="content_box a">Today is: <span style={{ color: themecolor }}>{rotation}</span></div>
                                                                    <div className="content_box b">Next up:  <span style={{ color: themecolor }}>{nextBlock}</span></div>
                                                                </div>
                                    </div>
                                    <div className="home_center_bottom">
                                    <div className="content_title">
                                                                    Current Block
                                                                </div>
                                                                <div className="big_container">
                                                                    <div className="big_block_container">
                                                                        {block}
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
                                    <div className="home_calendar"> <div onClick={() => { navigate("/Calendar") }}>  <Bigcalendar
                                                                localizer={localizer}

                                                                startAccessor="start"
                                                                endAccessor="end"
                                                                style={{ height: "190px" }}
                                                                events={events && events}
                                                                defaultView={'agenda'}
                                                            /></div></div>

                                    </div>
                                    <div className="home_right_bottom">
                                    <div className="news-container">
                                                                            {Object.values(dailyBulletin).map((el, index) => <div key={index} className="news  1">

                                                                                <p className="news_heading">
                                                                                    <Highlighter

                                                                                        searchWords={["NEW", "Important"]}
                                                                                        autoEscape={true}
                                                                                        textToHighlight={el.Title}
                                                                                        highlightStyle={{ color: themecolor, backgroundColor: "white" }} />
                                                                                </p>
                                                                                <p className="news_content">{shortenText(el.Content, 100)}</p>
                                                                            </div>
                                                                            )}
                                                                        </div>                              
                                    </div>


                                </div>
                        </div>
                        </div>
                        :
                        <Login to="/Home" />
                        

                }
            

            </div>
        </>
    )
}

 {/* <div className="col-10 px-0" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '-90px' }}>

                                        <div className="home_container">
                                            <div className="pickers_grid">
                                                <Pop changeBackground={setBackgroundOption} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2} />
                                                <ThemePop changeTheme={adjustTheme} color1={themecolor} setthemecolor={setthemecolor} />
                                            </div>
                                            <div>
                                                <p className="home_title welcome_title " style={{ color: themecolor, WebkitTextFillColor: themecolor }}>Welcome</p>

                                                <p className="home_title welcome_title ">Welcome</p>
                                                <p className="home_title name_title" style={{ color: themecolor, WebkitTextFillColor: themecolor }}> Bryan </p>
                                                <p className="home_title name_title"> Bryan </p>
                                            </div>
                                            <div className="home_inner_container">
                                                <div className="home_left">
                                                    <div className="home_left_top">
                                                        <div className="home_content assignments_home">

                                                            <button className="content_title home_menu_title_2">
                                                                Calendar
                                                            </button>

                                                            <div className="home_calendar"> <div onClick={() => { navigate("/Calendar") }}>  <Bigcalendar
                                                                localizer={localizer}

                                                                startAccessor="start"
                                                                endAccessor="end"
                                                                style={{ height: "190px" }}
                                                                events={events && events}
                                                                defaultView={'agenda'}
                                                            /></div></div>




                                                
                                                        </div>
                                                    </div>
                                                    <div className="home_left_bottom">
                                                        <div className="home_left_bottom_left">
                                                            <div className="home_content current_block">
                                                                <div className="content_title">
                                                                    Current Block
                                                                </div>
                                                                <div className="big_container">
                                                                    <div className="big_block_container">
                                                                        {block}
                                                                    </div>
                                                                    <div className="current_block_name">{blockSubject}</div>
                                                                </div>
                                                                <div className="block_wrapper">
                                                                    <div className="content_box a">Today is: <span style={{ color: themecolor }}>{rotation}</span></div>
                                                                    <div className="content_box b">Next up:  <span style={{ color: themecolor }}>{nextBlock}</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="home_left_bottom_right">
                                                            <div className="home_content">


                                                                <button className="content_title news_title_1" onClick={() => { GradesOnClick() }}>
                                                                    Athletics
                                                                </button>
                                                                <div className="grade_container">

                                                                    <div style={{ overflowY: "scroll", margin: "1px !important" }}><DataTable

                                                                        columns={columns}
                                                                        data={data}
                                                                    /></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="home_right">
                                                    <div className="home_content" id="news_content" >
                                                        {
                                                            isNews
                                                                ?

                                                                <><div className="news_menu_grid">

                                                                    <button className="content_title news_title_1" onClick={MenuOnclick}>
                                                                        News
                                                                    </button>
                                                                    <button className="content_title home_menu_title_1" onClick={MenuOnclick}>
                                                                        Menu
                                                                    </button>
                                                                </div><div style={{ overflowY: "scroll", height: '93%' }}>
                                                                        <div className="news-container">
                                                                            {Object.values(dailyBulletin).map((el, index) => <div key={index} className="news  1">

                                                                                <p className="news_heading">
                                                                                    <Highlighter

                                                                                        searchWords={["NEW", "Important"]}
                                                                                        autoEscape={true}
                                                                                        textToHighlight={el.Title}
                                                                                        highlightStyle={{ color: themecolor, backgroundColor: "white" }} />
                                                                                </p>
                                                                                <p className="news_content">{shortenText(el.Content, 100)}</p>
                                                                            </div>
                                                                            )}
                                                                        </div>
                                                                    </div></>
                                                                :
                                                                <><div className="news_menu_grid">

                                                                    <button className="content_title home_menu_title_2" onClick={MenuOnclick}>
                                                                        Menu
                                                                    </button>
                                                                    <button className="content_title news_title_2" onClick={MenuOnclick}>
                                                                        News
                                                                    </button>
                                                                </div>
                                                                    <div className="home_menu_container">
                                                                        <div style={{ marginLeft: "10px", color: themecolor, marginTop: "10px", fontSize: "18px", fontWeight: 600 }}>{Meal}</div>
                                                                        <div style={{ overflowY: "scroll", height: '93%' }}>
                                                                            <div style={{ marginLeft: "10px" }}>
                                                                                {Object.keys(Menu).sort().map((el, index) =>
                                                                                    <div key={index}>

                                                                                        <div className="news_heading" style={{ fontSize: "15px" }}>
                                                                                            {el}:
                                                                                        </div>
                                                                                        <div className="news_content" style={{ marginLeft: "10px" }}>
                                                                                            {
                                                                                                Menu[el].map((el2, index2) =>
                                                                                                    <div key={index2}>
                                                                                                        {el2}
                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                        </div>


                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>

                                                        }
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div> */}

