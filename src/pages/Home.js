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
import { getFirestore, collection, getDocs, query, orderBy, limit, getDoc, doc, documentId, setDoc } from "firebase/firestore"
import '../index.scss';
import ChromeDinoGame from 'react-chrome-dino';
import { ChromePicker } from "react-color";
import { encryptstorage } from '../components/encrypt'
import axios from "axios";
import { message, Space } from 'antd';
import 'antd/dist/antd.css';
import dayjs from "dayjs";
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

    const [isLoading, setIsLoading] = useState(false);

    const [dailyBulletin, setDailyBulletin] = useState([{},{},{},{},{},{},{},{}]);

    const [grade, setgrade] = useState({});

    const [assignments, setAssignments] = useState();
    const [displayAssignments, setDisplayAssignments] = useState();
    const [checkflag, setCheckFlag] = useState(false);
    const [checked, setChecked] = useState([]);

    const [block, setBlock] = useState();
    const [blockSubject, setBlockSubject] = useState();
    const [nextBlock, setNextBlock] = useState("");
    const [rotation, setRotation] = useState("");
    const classindex = ['class_1', 'class_2', 'class_3', 'class_4', 'class_5', 'class_6', 'class_7']

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

                console.log(data['last_updated'].toDate().toString().substring(0,10));
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
                            .then(function(response) {
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
                                .then(function(response) {
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
            if (data){
                for (var i = 0; i < data.length; i++){
                    setgrade(data[i])
                }
            }
            else{
                setgrade([])
            }

            
                
        };

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
        return text ;
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
                <Pop changeBackground={setBackgroundOption} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2}/>
                <Navbar />
                
                <div className="col-10 px-0" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop:'-90px'}}>

                    <div className="home_container" style={{overflow: 'hidden', height: '100%'}}>
                    <div>
                        <p className="home_title welcome_title ">Welcome</p>
                        <p className="home_title welcome_title ">Welcome</p>
                        <p className="home_title name_title"> Bryan </p>
                        <p className="home_title name_title"> Bryan </p>
                    </div>
                        <div className="home_inner_container">
                            <div className="home_left">
                                <div className="home_left_top">
                                    <div className="home_content assignments_home">
                                        <div className="content_title">
                                            Assignments
                                        </div>
                                            <hr className="hr"/>
                                            <div className="assignments_content">Due {
                                                isLoading ? <div></div> : assignments && <span>{Object.values(assignments)[0]['end_at'].substring(0,10)}</span>
                                            }</div>
                                            <div className="assignments_all_container">
                                            {
                                                isLoading ?
                                                <div class="container">

                                                    <div class="h1Container">

                                                        <div class="cube h1 w1 l1">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h1 w1 l2">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h1 w1 l3">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h1 w2 l1">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h1 w2 l2">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h1 w2 l3">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h1 w3 l1">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h1 w3 l2">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h1 w3 l3">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="h2Container">

                                                        <div class="cube h2 w1 l1">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h2 w1 l2">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h2 w1 l3">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h2 w2 l1">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h2 w2 l2">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h2 w2 l3">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h2 w3 l1">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h2 w3 l2">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h2 w3 l3">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="h3Container">

                                                        <div class="cube h3 w1 l1">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h3 w1 l2">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h3 w1 l3">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h3 w2 l1">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h3 w2 l2">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h3 w2 l3">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h3 w3 l1">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h3 w3 l2">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>

                                                        <div class="cube h3 w3 l3">
                                                        <div class="face top"></div>
                                                        <div class="face left"></div>
                                                        <div class="face right"></div>
                                                        </div>
                                                    </div>
                                                    
                                                    </div>
                                                :
                                                displayAssignments && displayAssignments.map( (el, index) => 
                                                <div key={index}>
                                                    <div className="assignments_container top_c">
                                                    <div className="assignments_container_time">
                                                        {el.end_at.substring(0, 10)}
                                                    </div>
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
                                            <div className="content_box a">Today is: {rotation}</div>
                                            <div className="content_box b">Next up: {nextBlock}</div>
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
                                                    <div className='class_1'>{el.class_name}
                                                    <div className="class_grade">{el.ptd_letter_grade}</div></div>
                                                </div>
                                            )
                                        }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="home_right">
                                <div className="home_content" id="news_content">
                                    <div style={{overflowY: "scroll", height: '100%'}}>
                                        <div className="content_title">
                                        News
                                        </div>
                                        <div className="news-container">
                                            {
                                                Object.values(dailyBulletin).map( (el, index) => 
                                                    <div key={index} className="news  1">
                                                        <p className="news_heading">{el.Title}</p>
                                                        <p className="news_content">{shortenText(el.Content, 100)}</p>
                                                    </div>
                                                )
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
        </div>
        :
<ChromeDinoGame/>
        
                                        }

</div>
    )
}
