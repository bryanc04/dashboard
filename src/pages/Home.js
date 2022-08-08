import React, {useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components";

import Navbar from "../components/navbar/navbar";
import Pop from "../components/popup";
import Logout from "../components/logout";
import{bgimage} from "../components/popup";
import{background} from "../components/popup";
import { useSelector } from 'react-redux';
import { UserContext} from '../components/popup';
import moment from 'moment';
import Login from "./Login";
import { Link, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { GridLoader, PulseLoader } from "react-spinners";
import { HexColorPicker } from "react-colorful";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
import {  useNavigate, Route, Routes } from "react-router-dom";
import PageTransition from "../components/PageTransition"
import Assignments from "./Assignments";
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


export default function Home() {

    const [isLoggedin, setIsLoggedIn] = useState(false);

    const [backgroundOption, setBackgroundOption] = useState("change_bg_option_1");
    const [color1, setColor1] = useState("#efefef");
    const [color2, setColor2] = useState("#efefef");

    const [theme, setTheme] = useState("change_theme_option_1");
    const [themecolor, setthemecolor] = useState("#8b000da8");

    const [dayArray, setDayArray] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);

    const [isLoading, setIsLoading] = useState(false);

    const [dailyBulletin, setDailyBulletin] = useState([{},{},{},{},{},{},{},{}]);

    const [grade, setgrade] = useState({});

    const [isNews, setIsNews] = useState(true);

    const [assignments, setAssignments] = useState();
    const [displayAssignments, setDisplayAssignments] = useState();
    const [checkflag, setCheckFlag] = useState(false);
    const [checked, setChecked] = useState([]);

    const [block, setBlock] = useState();
    const [blockSubject, setBlockSubject] = useState();
    const [nextBlock, setNextBlock] = useState("");
    const [rotation, setRotation] = useState("");

    const [Menu, setMenu] = useState();
    const [Meal, setMeal] = useState();


    
    let navigate = useNavigate();
    const location = useLocation();

    const navigateTo = (destination) => {
        navigate(destination)
    }

    useEffect(()=> {

        
        var loggedIn = encryptstorage.getItem("status");

        var userInfo = encryptstorage.getItem("userInfo")
        console.log(userInfo)

        if (loggedIn == "logged in"){
            setIsLoggedIn(true)
        }

        const checkupdated = async () => {
            var date = new Date();
            console.log(date.toString().substring(0,10))
            const docRef = doc(db, "last_updated", userInfo[0]);
            const docSnap = await getDoc(docRef);
            var data = docSnap.data();
            if (!docSnap.exists()){
                await setDoc(doc(db, "last_updated", userInfo[0]), {
                    last_updated: date
                  });
                console.log("fakjsdhfjkdsahkj")
            }
            else{

                console.log(data['last_updated'].toDate().getDay());
                if (data['last_updated'].toDate().toString().substring(0,10) != date.toString().substring(0,10)){
                    console.log("date mismatch")
                    //run update grades
                        axios.post('https://loomis.herokuapp.com/updateGrades', {
                            username: userInfo[0],
                            password: userInfo[1]
                        })
                        .then(function(response) {
                            message.success("Grades were succesfully updated")
                            axios.post('https://loomis.herokuapp.com/updateAssignments', {
                                username: userInfo[0],
                                password: userInfo[1]
                            })
                            .then(async function(response) {
                                message.success("Assignments were succesfully updated")
                                await setDoc(doc(db, "last_updated", userInfo[0]), {
                                    last_updated: date
                                });
                                
                            })
                            .catch(function(error){
                                console.log (error);
                            })
                            
                        })
                        .catch(function(error){
                            console.log (error);
                        })
                }

            }
        }


        const checkOverallUpdated = async () => {
            var date = new Date();
            console.log(date.toString().substring(0,10))
            const docRef = doc(db, "last_updated", "Overall");
            const docSnap = await getDoc(docRef);
            var data = docSnap.data();
            if (!docSnap.exists()){
                await setDoc(doc(db, "last_updated", "Overall"), {
                    last_updated: date
                  });
            }
            else{

                console.log(data['last_updated'].toDate().toString().substring(0,10));
                if (!dayjs().isSame(data['last_updated'].toDate().toISOString().split('T')[0], 'week')){
                    console.log("overall date mismatch")
                    //run updates
                    axios.get('https://loomis.herokuapp.com/updateNews')
                        .then(function(response) {
                            message.success("The Daily Bulletin was succesfully updated")
                            axios.get('https://loomis.herokuapp.com/updateMenu')
                            .then(function(response) {
                                message.success("Menu was succesfully updated")
                                axios.get('https://loomis.herokuapp.com/updateAthleticSchedule')
                                .then(async function(response) {
                                    message.success("Althetic Schedule was succesfully updated")
                                    await setDoc(doc(db, "last_updated", "Overall"), {
                                        last_updated: date
                                    });
                                    
                                    
                                })
                                .catch(function(error){
                                    console.log (error);
                                })
                            
                                
                            })
                            .catch(function(error){
                                console.log (error);
                            })
                            
                        })
                        .catch(function(error){
                            console.log (error);
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

        const getGrades = async () => {
            const docRef = doc(db, "grades", userInfo[0]);
            const docSnap = await getDoc(docRef);
            var data = docSnap.data();
            console.log(data)
            console.log(data.size)
            if (data){
                setgrade(data)
            }
            else{
                setgrade([])
            }

            
                
        };
        const getMenu = async () => {
            const collectionRef = collection(db, "menu");
            const q = query(collectionRef);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                var date = new Date();
                date = date.getHours();
                if(( date >= 0 && date < 9 ) || date >= 8) {
                    setMenu(data.breakfast);
                    setMeal("Breakfast");
                }else if (date >= 9 && date <= 1){
                    setMenu(data.lunch);
                    setMeal("Lunch");
                }else if (date > 1 && date < 8){
                    setMenu(data.dinner);
                    setMeal("Dinner");
                }

                console.log(Menu)
            });
                
        }

        const getAssignments = async () => {
                setIsLoading(true);
                const docRef = doc(db, "assignments", userInfo[0]);
                const docSnap = await getDoc(docRef);
            
                var newArray = [];
                var checkArray = [];
                var aarray = [];
                var count = 0;
                var date;
                var data = docSnap.data();
                var keys = Object.keys(data).sort();
                for (var i = 0; i < keys.length; i++){
                        if (count == 0){
                            date = Object.keys(data).sort()[0]
                            console.log()
                        }
                        count = count + 1;
                        newArray.push(data[keys[i]][0])
                        checkArray.push(false)
                        if (data[keys[i]][0]['end_at'].substring(0, 10) == date){
                            aarray.push(data[keys[i]][0])
                        }
                }

                setChecked(checkArray);
                setAssignments(newArray);
                setDisplayAssignments(aarray);
                setIsLoading(false);
                
                
        };
    
            
            getAssignments();
            

        const getBlocks = async() => {
           const docRef = doc(db, "Block", userInfo[0]);
           const docSnap = await getDoc(docRef);
           var data = docSnap.data();
           setRotation(data['rotationDay']);
           delete data['rotationDay'];
           for(var i = 0; i < Object.keys(data).length; i++)
           {
               if(i < Object.keys(data).length - 1)
               {
                   var nowClassTime = moment(data[i]['time'], 'hh:mmA');
                   var nextClassTime = moment(data[i+1]['time'], 'hh:mmA');
                   var nowTime = moment();
               
                   if(nowTime.isBetween(nowClassTime, nextClassTime))
                   {
                       if(data[i]['subtitle'].includes("•"))
                       {
                           let gIndex = data[i]['subtitle'].indexOf("•");
                           let blockString = data[i]['subtitle'].substring(gIndex+1, gIndex+3)
                           setBlock(blockString);
                       }
                       else
                       {
                           setBlock(data[i]['subtitle'])
                       }
       
                       if(data[i+1]['subtitle'].includes("•"))
                       {
                           let gIndex = data[i+1]['subtitle'].indexOf("•");
                           let blockString = data[i+1]['subtitle'].substring(gIndex+1, gIndex+3)
                           setNextBlock(blockString);
                       }
                       else
                       {
                           setNextBlock(data[i+1]['subtitle'])
                       }
                       setBlockSubject(data[i]['description'].slice(0, -3));
                       break;
                   }
               }
               else
               {
                   if(data[i]['subtitle'].includes("•"))
                       {
                           let gIndex = data[i]['subtitle'].indexOf("•");
                           let blockString = data[i]['subtitle'].substring(gIndex+1, gIndex+3)
                           setBlock(blockString);
                       }
                       else
                       {
                           setBlock(data[i]['subtitle'])
                       }
       
                       setNextBlock("")
                       setBlockSubject(data[i]['description'].slice(0, -3));
                       
               }
    
           }


        }

        getDailyBulletin();
        getGrades();
        getAssignments();
        getBlocks();
        checkupdated();
        checkOverallUpdated();
        getMenu();

    }, []);


    const MenuOnclick = () => {
        setIsNews(!isNews)
        console.log(isNews)
        // document.getElementById("name").style.color = "blue";
        console.log("fdasfasd")
    }



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
        return text ;
    }

    const adjustTheme = (newTheme) => {
        setthemecolor(newTheme);
        root.style.setProperty("--main", newTheme);
        message.success("Theme succesfully changed to " + newTheme);
    } 
    const Wrapper = styled.div`
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }

  div.transition-group {
    position: relative;
  }

  section.route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
`;



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
                <Logout to="/Home"/>


                
                <div className="col-10 px-0" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop:'-90px'}}>

                    <div className="home_container">
                    <div className="pickers_grid">
                <Pop changeBackground={setBackgroundOption} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2}/>
                <ThemePop changeTheme={adjustTheme} color1={themecolor} setthemecolor={setthemecolor}/>
                </div>
                    <div>
                    <p className="home_title welcome_title " style={{color: themecolor, WebkitTextFillColor: themecolor}}>Welcome</p>

                        <p className="home_title welcome_title ">Welcome</p>
                        <p className="home_title name_title" style={{color: themecolor, WebkitTextFillColor: themecolor}}> Bryan </p>
                        <p className="home_title name_title"> Bryan </p>
                    </div>
                        <div className="home_inner_container">
                            <div className="home_left">
                                <div className="home_left_top">
                                    <div className="home_content assignments_home">
                                        <div className="content_title">

                                            <Link to="/Assignments" style={{color: "black"}}>
                                            Assignments
                                            </Link>
                                            <Wrapper>
                                            <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames="fade"
        >
          <section className="route-section">
            <Routes location={location}>
              <Route exact path="/Assignments" component={Assignments} />
              Assignments

            </Routes>
          </section>
        </CSSTransition>
      </TransitionGroup>
      </Wrapper>
                                                 </div>
                                            <div className="assignments_content" style={{marginLeft: "20px"}}>Due {
                                                isLoading ? <div></div> : assignments && <span style={{color: themecolor, WebkitTextFillColor: themecolor}}>{dayArray[new Date(Object.values(assignments)[0]['end_at']).getDay()]}</span>
                                            }</div>
                                            <div className="assignments_all_container">
                                            {
                                                isLoading ?
                                                <div class="container">

                                                    <PulseLoader/>

                                                    </div>
                                                :
                                                displayAssignments && displayAssignments.map( (el, index) => 
                                                <div key={index}>
                                                    <div className="assignments_container" style={{borderColor: themecolor}}>
                                                    <div className="assignments_assignments">{el.title}</div>
                                                    <div className="assignments_detail">{el.class}</div>
                                                </div>
                                                </div>
                
                                           
                                           
                                              
                                        
                                            
                                                       
                                                )
                                            }
                                        </div>            
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
                                            <div className="content_box a">Today is: <span style={{color: themecolor}}>{rotation}</span></div>
                                            <div className="content_box b">Next up:  <span style={{color: themecolor}}>{nextBlock}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="home_left_bottom_right">
                                        <div className="home_content">
                                            <div className="content_title" style={{marginBottom: 10}}>My Grades</div>
                                            <div className="grade_container">

{
                                            Object.values(grade).map( (el, index) => 
                                                <div key={index}>
                                                    <div className="grade_content_format">
                                                        <div className='class_1'  style={{borderColor: themecolor}}>{el.class_name}</div>
                                                        <div className="class_grade">{el.ptd_letter_grade}</div>
                                                    </div>
                                                </div>
                                            )
                                        }
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
                                <div style={{marginLeft: "10px", color: themecolor, marginTop: "10px", fontSize: "18px", fontWeight: 600}}>{Meal}</div>
                                <div style={{ overflowY: "scroll", height: '93%' }}>
                                        <div  style={{marginLeft: "10px"}}>
                                            {Object.keys(Menu).sort().map((el, index) => 
                                            <div key={index}>

                                                <div className="news_heading" style={{fontSize: "15px"}}>
                                                    {el}:
                                                </div>
                                                <div className="news_content" style={{marginLeft: "10px"}}>
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
            </div>
        </div>
        </div>
        :
<Login to="/Home"/>
        
                                        }

</div>
    )
}

