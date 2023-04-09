import React, { useState, createContext, useContext, useMemo }  from 'react';
import Loomis from "../../assets/loomis.png"
import { NavLink, useNavigate } from "react-router-dom";
import { EncryptStorage } from 'encrypt-storage';
import loomis2 from "../../assets/loomis2.png";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit, getDoc, doc, documentId, setDoc, increment } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const encryptstorage = new EncryptStorage('asdffdsafdasfdasasdf', {
  prefix: '@instance',
  storageType: 'sessionStorage'
})

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

export default function Navbar(props){
      const [isShown, setIsShown] = useState(false);
      const handleClick = event => {
          setIsShown(current => !current)
      };
      let navigate = useNavigate();

      const logout = () => {
        encryptstorage.clear();
        navigate("/Login", { replace: true })
      }



      const update = async(type) => {
        var userInfo = encryptstorage.getItem('userInfo')
        const ref = doc(db, 'recommendation', userInfo[0])
        if(type == 'assignments'){
            setDoc(ref, { assignments: increment(1)}, { merge: true} )
        }
        if (type == 'calendar'){
          setDoc(ref, { calendar: increment(1)}, { merge: true} )
        }
        if (type == 'menu'){
          setDoc(ref, { menu: increment(1)}, { merge: true} )
        }
        if (type == 'schedule'){
          setDoc(ref, { schedule: increment(1)}, { merge: true} )
        }
        if (type == 'grades'){
          setDoc(ref, { grades: increment(1)}, { merge: true} )
        }

        const docSnap = await getDoc(ref);
        var userGrade = docSnap.data()['grade']
        if (userGrade == 9 ){
            const ref2 = doc(db, 'recommendation', 'totalClicksForFreshmen')
            if (type == 'assignments'){
              setDoc(ref2, {type: increment(1)}, {merge: true})
            }
            if (type == 'calendar'){
              setDoc(ref2, { calendar: increment(1)}, { merge: true} )
            }
            if (type == 'menu'){
              setDoc(ref2, { menu: increment(1)}, { merge: true} )
            }
            if (type == 'schedule'){
              setDoc(ref2, { schedule: increment(1)}, { merge: true} )
            }
            if (type == 'grades'){
              setDoc(ref2, { grades: increment(1)}, { merge: true} )
            }
        }
        else if (userGrade == 10){
          const ref2 = doc(db, 'recommendation', 'totalClicksForSophomores')
          if (type == 'assignments'){
            setDoc(ref2, {type: increment(1)}, {merge: true})
          }
          if (type == 'calendar'){
            setDoc(ref2, { calendar: increment(1)}, { merge: true} )
          }
          if (type == 'menu'){
            setDoc(ref2, { menu: increment(1)}, { merge: true} )
          }
          if (type == 'schedule'){
            setDoc(ref2, { schedule: increment(1)}, { merge: true} )
          }
          if (type == 'grades'){
            setDoc(ref2, { grades: increment(1)}, { merge: true} )
          }
        }
          else if (userGrade == 11){
            const ref2 = doc(db, 'recommendation', 'totalClicksForJuniors')
            if (type == 'assignments'){
              setDoc(ref2, {type: increment(1)}, {merge: true})
            }
            if (type == 'calendar'){
              setDoc(ref2, { calendar: increment(1)}, { merge: true} )
            }
            if (type == 'menu'){
              setDoc(ref2, { menu: increment(1)}, { merge: true} )
            }
            if (type == 'schedule'){
              setDoc(ref2, { schedule: increment(1)}, { merge: true} )
            }
            if (type == 'grades'){
              setDoc(ref2, { grades: increment(1)}, { merge: true} )
            }
          }
          else if (userGrade == 12){
            const ref2 = doc(db, 'recommendation', 'totalClicksForSeniors')
            if (type == 'assignments'){
              setDoc(ref2, {type: increment(1)}, {merge: true})
            }
            if (type == 'calendar'){
              setDoc(ref2, { calendar: increment(1)}, { merge: true} )
            }
            if (type == 'menu'){
              setDoc(ref2, { menu: increment(1)}, { merge: true} )
            }
            if (type == 'schedule'){
              setDoc(ref2, { schedule: increment(1)}, { merge: true} )
            }
            if (type == 'grades'){
              setDoc(ref2, { grades: increment(1)}, { merge: true} )
            }
        }




      }

    return(
        <div className="hidden_until_hover col-1 d-flex flex-column flex-shrink-4 px-0 navbar_style" id="navbar_bg" style={{backgroundColor: props.theme}}>
          <div>
              <div style={{padding: 10}}>
                  <img className="lc_logo" src={loomis2} style={{width: '70%', height: '50%'}}/>
              </div>
          
        </div>
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center" style ={{flex: 1, justifyContent: 'center'}}>
          <li className="nav-item">
            <NavLink to = "/Home" className='navbar_item_container ' > 
                <i className="bi bi-house navbar_item" style={{ fontSize: '27px'}}></i> 
            </NavLink>
          </li>
          <li>
              <NavLink to = "/Calendar" className='navbar_item_container'onClick={() => update("calendar")}>
                  <i className="bi bi-calendar navbar_item" ></i>
              </NavLink>
          </li>
            <li>
              <NavLink to = "/Menu" className='navbar_item_container' onClick={() => update("menu")}>
              <i className="bi bi-table navbar_item" ></i>
              </NavLink>
            </li>

            <li>
              <NavLink to = "/Schedule" className='navbar_item_container' onClick={() => update("schedule")}>
              <i className='bi bi-dribbble navbar_item' ></i>
              </NavLink>
            </li>
            <li>

            </li>
        </ul>

  </div>

  


    )
}