import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import { Navbar3 } from "../components/navbar/navbar3";
import Pop from "../components/popup";
import { bgimage } from "../components/popup";
import { background } from "../components/popup";
import { useSelector } from 'react-redux';
import { UserContext } from '../components/popup';
import moment from 'moment';
import ChromeDinoGame from 'react-chrome-dino';
import DataTable from 'react-data-table-component';
import { HexColorPicker } from "react-colorful";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit, doc } from "firebase/firestore";
import { encryptstorage } from '../components/encrypt';
import Login from "./Login";
import Logout from "../components/logout";
import ThemePop from "../components/popup2";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

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





export default function Schedule() {

    const [isLoggedin, setIsLoggedIn] = useState(false);

    const [backgroundOption, setBackgroundOption] = useState("change_bg_option_1");
    const [color1, setColor1] = useState("#efefef");
    const [color2, setColor2] = useState("#efefef");

    const [themecolor, setthemecolor] = useState("#ffffff");
    const [data, setData] = useState([]);

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) {
            navigate('/Login');
        }
    }, [user, loading])

    // const columns = [
    //     {
    //         name: 'Team',
    //         selector: row => row.Team,
    //     },
    //     {
    //         name: 'Opponent',
    //         selector: row => row.Opponent,
    //     },
    //     {
    //         name: 'Date',
    //         selector: row => row.Date,
    //     },
    //     {
    //         name: 'Time',
    //         selector: row => row.Time,
    //     },
    //     {
    //         name: 'Location',
    //         selector: row => row.Location,
    //     },
    //     {
    //         name: 'Advantage',
    //         selector: row => row.Advantage,
    //     },
    // ];
    const columns = [
        {
            field: 'Team',
            headerName: 'Team',
            width: 200
        },
        {
            field: 'Opponent',
            headerName: 'Opponent',
            width: 200
        },
        {
            field: 'Date',
            headerName: 'Date',
            width: 150
        },
        {
            field: 'Time',
            headerName: 'Time',
            width: 100
        },
        {
            field: 'Location',
            headerName: 'Location',
            width: 200
        },
        {
            field: 'Advantage',
            headerName: 'Advantage',
            width: 100
        },
    ];



    const [schedule, setSchedule] = useState();




    useEffect(() => {

        var loggedIn = encryptstorage.getItem("status");

        if (loggedIn == "logged in") {
            setIsLoggedIn(true)
        }


        // const getGrades = async () => {
        //     const collectionRef = collection(db, "grades");
        //     const q = query(collectionRef);
        //     const querySnapshot = await getDocs(q);
        //     querySnapshot.forEach((doc) => {
        //         var data = doc.data();
        //         setgrade(data);
        //         })


        //     };

        const getSchedule = async () => {
            const collectionRef = collection(db, "Athletics_schedule");
            const q = query(collectionRef);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                var tempArray = []
                Object.values(data).map((element, index) => {
                    element['id'] = index
                    tempArray.push(element);
                })
                setData(tempArray);
                setSchedule(data);
            })
        }


        getSchedule();




    }, []);


    const adjustTheme = (newTheme) => {
        setthemecolor(newTheme);
        root.style.setProperty("--main", newTheme);
        message.success("Theme succesfully changed to " + newTheme);
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

                    <div className="row g-0 ">

                        <div className="home_column_left">
                            <Navbar3 theme={themecolor} currentPage="Schedule" /></div>




                        {/* <div className="pickers_grid">
                            <Pop changeBackground={setBackgroundOption} color1={color1} setColor1={setColor1} color2={color2} setColor2={setColor2} />
                            <ThemePop changeTheme={adjustTheme} color1={themecolor} setthemecolor={setthemecolor} />
                        </div> */}
                        <div className="viewport_message athletics_table" style={{height: '90%'}}>

                        <div
                            style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                marginBottom: 10
                            }}
                        >
                            Athletics Schedule
                        </div>
                        <div style={{width:"100%"}}>
                            <DataGrid
                                rows={data}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 },
                                    },
                                }}
                                options={{
                                    responsive: 'scroll'
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                            </div>
                            {/* :
                                        <ChromeDinoGame />
                                    } */}
                        </div><div className="fullscreen_msg">Please Switch to Fullscreen</div>




                    </div>
                </div>
            </div>


        </div>



    )
}
