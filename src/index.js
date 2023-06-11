import React, { useState, createContext, useContext, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Calendar from './pages/Calendar';
import Menu from './pages/Menu';
import Start from './pages/Start';
import Schedule from './pages/Schedule';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { UserContext} from './components/popup';
import './index.less'
import Signup from './pages/Signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/Home" element={<Home />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Calendar" element={<Calendar />}/>
        <Route path="/Menu" element={<Menu />}/>
        <Route path="/Schedule" element={<Schedule />}/>
        <Route path="/Signup" element={<Signup />}/>
      </Routes>
  </Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export { default as ReactFromModule } from 'react'