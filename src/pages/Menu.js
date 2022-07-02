import React, {useState, useContext, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import disableScroll from 'disable-scroll';
import Pop from "../components/popup";
import{bgimage} from "../components/popup";
import{background} from "../components/popup";
import { useSelector } from 'react-redux';
import { UserContext} from '../components/popup';
import moment from 'moment';

import { HexColorPicker } from "react-colorful";
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



export default function Menu() {

    const [backgroundOption, setBackgroundOption] = useState("change_bg_option_1");
    const [color1, setColor1] = useState("efefef");
    const [color2, setColor2] = useState("efefef");

    const [breakfastMenu, setBreakfastMenu] = useState([{},{}]);
    const [lunchMenu, setLunchMenu] = useState([{},{},{}]);
    const [dinnerMenu, setDinnerMenu] = useState([{},{},{}]);

    const [dailyBulletin, setDailyBulletin] = useState([{},{},{},{},{},{},{},{}]);

    const [grade, setgrade] = useState({});

    const [block, setBlock] = useState();
    const [blockSubject, setBlockSubject] = useState();
    const [nextBlock, setNextBlock] = useState("");
    const [rotation, setRotation] = useState("");
    const classindex = ['class_1', 'class_2', 'class_3', 'class_4', 'class_5', 'class_6', 'class_7']

    useEffect(()=> {
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
                console.log(data)
                setDailyBulletin(data);
            })
        };

        const getMenu = async () => {
            const collectionRef = collection(db, "menu");
            const q = query(collectionRef);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                setBreakfastMenu(data.breakfast);
                setLunchMenu(data.Lunch);
                setDinnerMenu(data.dinner);
                console.log(data.breakfast)
                })
                
                    

        }

        const getGrades = async () => {
            const collectionRef = collection(db, "grades");
            const q = query(collectionRef);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                setgrade(data);
                console.log(data)
                })
            
                
            };

        const getBlocks = async() => {
            const querySnapshot = await getDocs(collection(db, "Block"));
            querySnapshot.forEach((doc)=>{
                var data = doc.data();
                setRotation(data['rotationDay']);
                delete data['rotationDay'];

                console.log(data)
                
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
            

            })
        }

        getDailyBulletin();
        getMenu();
        getGrades();
        getBlocks();
        
    }, []);

    console.log(lunchMenu)
    console.log(dailyBulletin)

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
                
                <div className="col-10 px-0" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop:'-90px'}}>

                    <div className="home_container" style={{overflow: 'hidden', height: '100%', width: '4000px'}}>
                    <div>
                        <p className="home_title welcome_title ">Menu</p>
                        <p className="home_title welcome_title ">Menu</p>
                    </div>
                        <div className="menu_inner_container">
                            <div className="menu_top menu_content">

                            <div className="meal_title">
                                Breakfast
                            </div>
                            <div className="meal_content">
                                Main:
                                <div className="meal_content_details">
                                Sample Menu
                                </div>
                            </div>

                            <div className="meal_content">
                                Gluten-aware:
                            </div>


                            </div>
                            <div className="menu_center menu_content">

                            <div className="meal_title">
                                Lunch
                            </div>

                            <div className="meal_content">
                                Main:
                                <div className="meal_content_details">
                                Sample Menu
                                </div>
                            </div>

                            <div className="meal_content">
                                Gluten-aware:
                            </div>

                            <div className="meal_content">
                                Vegan:
                            </div>


                            </div>
                            <div className="menu_bottom menu_content">

                            <div className="meal_title">
                                Dinner
                            </div>

                            <div className="meal_content">
                                Main:
                                <div className="meal_content_details">
                                Sample Menu
                                </div>
                            </div>

                            <div className="meal_content">
                                Gluten-aware:
                            </div>

                            <div className="meal_content">
                               Vegan/Vegetarian:
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
