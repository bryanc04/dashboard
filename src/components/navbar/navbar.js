import React, { useState, createContext, useContext, useMemo }  from 'react';
import Loomis from "../../assets/loomis.png"
import { NavLink, useNavigate } from "react-router-dom";
import { EncryptStorage } from 'encrypt-storage';
import loomis2 from "../../assets/loomis2.png";

const encryptstorage = new EncryptStorage('asdffdsafdasfdasasdf', {
  prefix: '@instance',
  storageType: 'sessionStorage'
})

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
            <NavLink to = "/Assignments" className='navbar_item_container'>
              <i className="bi bi-journal-text navbar_item"></i>
            </NavLink>
          </li>
          <li>
              <NavLink to = "/Calendar" className='navbar_item_container'>
                  <i className="bi bi-calendar navbar_item" ></i>
              </NavLink>
          </li>
            <li>
              <NavLink to = "/Menu" className='navbar_item_container'>
              <i className="bi bi-table navbar_item" ></i>
              </NavLink>
            </li>
            <li>
              <NavLink to = "/Grades" className='navbar_item_container'>
              <i className="bi bi-mortarboard navbar_item" ></i>
              </NavLink>
            </li>
            <li>
              <NavLink to = "/Schedule" className='navbar_item_container'>
              <i className='bi bi-dribbble navbar_item' ></i>
              </NavLink>
            </li>
            <li>

            </li>
        </ul>

  </div>

  


    )
}