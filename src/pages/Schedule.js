import React, {useState, useContext, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
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


export default function Schedule() {

    const [backgroundOption, setBackgroundOption] = useState("change_bg_option_1");
    const [color1, setColor1] = useState("#efefef");
    const [color2, setColor2] = useState("#efefef");

    const [schedule, setSchedule] = useState();


    

    useEffect(()=> {
     
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
                setSchedule(data);
                console.log(data)
            })
        }

      
        getSchedule();
        


        
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
                        <p className="grade_page_title welcome_title ">Athletics schedule</p>
                        <p className="grade_page_title welcome_title ">Athletics schedule</p>
                      
                        <div className="schedule_inner_container">
                            
                        <table>
	<thead>
		<tr>
			<th scope="col" class="fsTitle">Team</th>
			<th scope="col" class="fsAthleticsOpponents">Opponent</th>
			<th scope="col" class="fsAthleticsDate">Date</th>
			<th scope="col" class="fsAthleticsTime">Time</th>
			<th scope="col" class="fsAthleticsLocations">Location</th>
			<th scope="col" class="fsAthleticsAdvantage">Advantage</th>
			
			<th scope="col" class="fsAthleticsDetails">Details</th>

			
			
		
		</tr>
	</thead>
	<tbody>

                    			
 			
            {
                                          schedule &&      Object.values(schedule).map( (el, index) => 
                                                    <div key={index} >
                                                                                            <td class="fsTitle">{el.Team}</td>
                                                            <td class="fsAthleticsOpponents">
                                                                <div class="fsAthleticsOpponentNames">
                                                                    <span class="fsAthleticsOpponentName">{el.Opponent}</span>
                                                                </div>
                                                            </td>
                                                            <td class="fsAthleticsDate">
                                                                <div class="fsDateTime">
                                                                    <time datetime="2022-09-11T12:30:00-04:00" class="fsDate"><span class="fsMonth">Sep</span> <span class="fsDay">11</span> <span class="fsYear">2022</span></time>
                                                                </div>
                                                            </td>
                                                            <td class="fsAthleticsTime">
                                                                <div class="fsDateTime">
                                                                        <time datetime="2022-09-11T12:30:00-04:00" class="fsTime"><span class="fsHour">12</span>:<span class="fsMinute">30</span> <span class="fsMeridian">PM</span></time>
                                                                </div>
                                                            </td>
                                                            <td class="fsAthleticsLocations">
                                                                {el.Location}
                                                            </td>
                                                            <td class="fsAthleticsAdvantage">
                                                                {el.Advantage}
                                                            </td>
                                                            <td class="fsAthleticsDetails">
                                                                <a class="fsAthleticsEventDetailLink" data-occurid="389931" data-linktype="popup" data-link-url="#" href="#">Details</a>
                                                            </td>
                                                    </div>
                                                )
            }
			

				

	</tbody>
</table>
                               
                                   
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
    
        
                    
        
     

    )
}
