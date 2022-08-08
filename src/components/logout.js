import React, { useState, createContext, useContext, useMemo }  from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { EncryptStorage } from 'encrypt-storage';

const encryptstorage = new EncryptStorage('asdffdsafdasfdasasdf', {
  prefix: '@instance',
  storageType: 'sessionStorage'
})


export default function Logout(props){
    const logout = () => {
        encryptstorage.clear();
        navigate("/Login", { replace: true, state: props.to })
      }

      let navigate = useNavigate();
      return (
         <div style={{cursor: 'pointer'}} onClick={() => {logout();}}>
                <i class="bi bi-box-arrow-right logout" style={{fontSize: 25, color: 'black'}}></i>
        </div>       
      )
}