import React, { useState, createContext, useContext, useMemo }  from 'react';
import Loomis from "../../assets/loomis.png"
import { NavLink, useNavigate } from "react-router-dom"
import { EncryptStorage } from "encrypt-storage";

const encryptstorage = new EncryptStorage('asdffdsafdasfdasasdf', {
  prefix: '@instance',
  storageType: 'sessionStorage'
})

export default function Navbar(){
      const [isShown, setIsShown] = useState(false);
      const handleClick = event => {
          setIsShown(current => !current)
      };

      let navigate = useNavigate();

      const logout = () => {
        encryptstorage.clear();
        navigate("/login", {replace: true});
      }
    return(
        <div className="hidden_until_hover col-1 d-flex flex-column flex-shrink-4 px-0 navbar_style" id="navbar_bg">
          <div>
              <div style={{padding: 10}}>
                  <img className="lc_logo" src={Loomis} style={{width: '70%', height: '50%'}}/>
              </div>
          
        </div>
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center" style ={{flex: 1, justifyContent: 'center'}}>
          <li className="nav-item">
            <NavLink to = "/Home" className='navbar_item_container ' > 
                <i className="bi bi-house" style={{color: "maroon", fontSize: '25px'}}></i> 
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
              <div style={{cursor: 'pointer'}} onClick={() => logout()}>
                <i class="bi bi-box-arrow-right" style={{fontSize: 20, color: 'black'}}></i>
              </div>
            </li>
        </ul>
  </div>

  


    )
}