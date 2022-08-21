import React, {useState, useEffect} from "react";
import Navbar from "../components/navbar/navbar"
import { Calendar as Bigcalendar, momentLocalizer} from 'react-big-calendar';
import Pop from "../components/popup";
import Logout from "../components/logout";
import Login from "./Login";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { encryptstorage } from '../components/encrypt'
import ChromeDinoGame from 'react-chrome-dino';
import ThemePop from "../components/popup2";

const firebaseConfig = {
    apiKey: "AIzaSyBDh3yxYRLCaikdnMXYrCuVc0iGL5qn0js",
    authDomain: "dashboard-2a1a3.firebaseapp.com",
    projectId: "dashboard-2a1a3",
    storageBucket: "dashboard-2a1a3.appspot.com",
    messagingSenderId: "354314041590",
    appId: "1:354314041590:web:32b771d8e2a2d4ce4ad4d7",
    measurementId: "G-W02KFP0FY8"
  };



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Calendar(){

    const [isLoggedin, setIsLoggedIn] = useState(false);

    const [backgroundOption, setBackgroundOption] = useState("change_bg_option_1");
    const [color1, setColor1] = useState("#efefef");
    const [color2, setColor2] = useState("#efefef");
    const [isLoading, setIsLoading] = useState(false);

    const [themecolor, setthemecolor] = useState("#8b000da8");

    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);

    useEffect(()=> {

        var loggedIn = encryptstorage.getItem("status");

        if (loggedIn == "logged in"){
            setIsLoggedIn(true)
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
                for (var i = 0; i < Object.keys(data).length; i++){
                    if (newData[i].events == "No Events"){
                        continue;
                    }
                    else{
                        for (var j = 0; j < newData[i].events.length; j++){
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

      
        getCalendar();

        
    }, []);

    const adjustTheme = (newTheme) => {
        setthemecolor(newTheme);
        root.style.setProperty("--main", newTheme);
        message.success("Theme succesfully changed to " + newTheme);
    } 


    return(
        <div>


        {
        isLoggedin
        ?




        <div className="all">
            <div className="container-fluid blur" style={{ 
            backgroundColor: "rgb(254, 254, 254)", 
            backgroundImage: backgroundOption === "change_bg_option_1" ?  "none" : 
                            backgroundOption === "change_bg_option_2" ? "linear-gradient(62deg, #8ec5fc, #e0c3fc, #86a8e7, #eaafc8)" :
                            backgroundOption === "change_bg_option_3" ? "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" :
                            backgroundOption === "change_bg_option_4" ? "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)":
                            backgroundOption === "change_bg_option_5" && (`linear-gradient(120deg, ${color1} 0%, ${color2} 100%)`),
            animation: "gradient 5s ease infinite !important",
            WebkitAnimation: "gradient 5s ease infinite !important",
            }}>
            


            <div className="row">

                <Navbar theme={themecolor}/>
                <Logout />


                
                <div className="col-10 px-0" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop:'-90px'}}>

                    <div className="home_container">
                    <div className="pickers_grid">
                <Pop changeBackground={setBackgroundOption} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2}/>
                <ThemePop changeTheme={adjustTheme} color1={themecolor} setthemecolor={setthemecolor}/>
                </div>
                    <div>
                        <p className="home_title welcome_title ">Calendar</p>
                        <p className="home_title welcome_title " style={{color: themecolor, WebkitTextFillColor: themecolor}}>Calendar</p>
                       
                    </div>
                        <div className="calendar_page_container">
                        {isLoggedin
                                    ?
                                <div>

                                <Bigcalendar
                                localizer={localizer}

                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 420 }}
                                events = {events && events}
                                />
                                </div>
                                :
                                <ChromeDinoGame/>
                        }
                        </div>


                    </div>
                </div>
            </div>
        </div>
        </div>
        :
        <Login to="/Calendar"/>

                                        }

        </div>
            
            
        
            )
        }


