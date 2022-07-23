import React, {useState, useContext, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import Pop from "../components/popup";
import{bgimage} from "../components/popup";
import{background} from "../components/popup";
import { useSelector } from 'react-redux';
import { UserContext} from '../components/popup';
import moment from 'moment';
import { GridLoader } from "react-spinners";
import '../index.less';
import Pacman from 'react-pacman';
import { HexColorPicker } from "react-colorful";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit, where, documentId, doc } from "firebase/firestore"
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


export default function Assignments() {

    const [backgroundOption, setBackgroundOption] = useState("change_bg_option_1");
    const [color1, setColor1] = useState("#efefef");
    const [color2, setColor2] = useState("#efefef");
    const [isLoading, setIsLoading] = useState(false);
    
    const [checkflag, setCheckFlag] = useState(false);
    const [checked, setChecked] = useState([]);

    const [ToDo, setTodo] = useState(true);
    const [completed, setCompleted] = useState(false);

    const [assignments, setAssignments] = useState();
    const [completedAssignments, setCompletedAssignments] = useState([]);
    



    useEffect(()=> {
     
        const getAssignments = async () => {
            setIsLoading(true);
            const collectionRef = collection(db, "assignments");
            const q = query(collectionRef);
            const querySnapshot = await getDocs(q);
            var newArray = [];
            var checkArray = [];
            var count;
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                count = count + 1;
                newArray.push(data.data[0])
                checkArray.push(false)
                })
            setChecked(checkArray);
            setAssignments(newArray);
            setIsLoading(false);
            
            
            };

        
        getAssignments();
        
    }, []);


        const handleOnChange = (position) => {
            const updatedCheckedState = checked.map((item, index) =>
          index === position ? !item : item
        );

            setChecked(updatedCheckedState);
        };

        const ButtonOnClick = event => {
            if (ToDo == true){
                return;
            }else{
                setTodo(current => !current)
                setCompleted(false)
            }
          };

          const completedOnClicked = event => {
            console.log(ToDo)
            if (completed == true){
                return;
            }
            else{
                setCompleted(true);
                setTodo(false);
            }
          };

          function moveToCompleted(index) {
            if (!checked[index]){
                var temparr = completedAssignments;
                temparr.push(Object.values(assignments)[index])
                setCompletedAssignments(temparr)
                console.log(completedAssignments)
                var temparr2 = assignments
                temparr2.splice(index, 1)
                setAssignments(temparr2)
            }
            else if (checked[index]){
                var temparr = assignments
                temparr.push(Object.values(completedAssignments)[index])
                setAssignments(temparr)
                var temparr2 = completedAssignments
                temparr2.splice(index, 1)
                setCompletedAssignments(temparr2)
            }
          }

          function moveToToDo(index) {
            if (checked[index]){
                var temparr = assignments
                temparr.push(Object.values(assignments)[index])
                setAssignments(temparr)
                var temparr2 = completedAssignments
                temparr2.splice(index, 1)
                setCompletedAssignments(temparr2)
                console.log(completedAssignments)
            }
            else if (!checked[index]){
                var temparr = completedAssignments
                temparr.splice(index, 1)
                setCompletedAssignments(temparr)
                var temparr2 = assignments
                temparr2.push(completedAssignments[index])
                setAssignments(temparr2)
                console.log(assignments)
            }
          }

          


    
    




      



    return(


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
                
                <div className="col-10 px-0 assignments_page_main" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '175px'}}>

                    <div className="assignments_big_title ">
                    <div className="assignments_page_big_container">
                        Assignments
                        <div className="assignments_button_grid">
                            <button type="submit" className='btn btn-primary shadow-none' style={{width: '10%'}} onClick={ButtonOnClick}>
                                To-Do
                            </button>
                            <button type="submit" className='btn btn-primary shadow-none' style={{width: '13%', marginLeft: 10}} onClick={completedOnClicked}>
                                Completed
                            </button>
                        </div>
                        <div className="assignments_page_container">
                                            {
                                                isLoading ?
                                                <Pacman/>
                                                :
                                                ToDo ?
                                                assignments && assignments.map( (el, index) => 
                                                    <div key={index}>
                                                        <div className="assignments_container top_c" 
                                                        // style={ checked[index] ? ({ display:'none'})  : {display : 'block'}}
                                                        >
                                                            <div className="assignments_page_container_time">
                                                                {el.end_at.substring(0,10)}
                                                            </div>
                                                            <div className="assignments_page_assignments">{el.title}</div>
                                                            <div className="assignments_page_detail">{el.class}</div>
                                                            <label className="assignments_checkbox"><input type="checkbox" checked={checked[index]} onChange={() => {handleOnChange(index); moveToCompleted(index)}}/></label>
                                                        </div>
                                                    </div>                                  
                                                )
                                                :
                                                assignments && 
                                                completedAssignments.map( (el, index) => 
                                                <div>
                                                <div key={index}>
                                                    <div className="assignments_container top">
                                                        <div className="assignments_page_container_time">
                                                            {el.end_at.substring(0,10)}
                                                        </div>
                                                        <div className="assignments_page_assignments">{el.title}</div>
                                                        <div className="assignments_page_detail">{el.class}</div>
                                                        <label className="assignments_checkbox"><input type="checkbox" checked={checked[index]} onChange={() => {handleOnChange(index); moveToToDo(index)}}/></label>
                                                    </div>
                                                </div>   
                                                </div>
                                                )
                                                
                                            }

                        </div>
                        {/* <div className="assignments_page_container">

                        </div>
                        <div className="assignments_page_container">

                        </div>
                        <div className="assignments_page_container">

                        </div> */}
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
        
        
     

    )
}
