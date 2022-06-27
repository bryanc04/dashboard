import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Calendar from './pages/Calendar';
import Menu from './pages/Menu';
import Grades from './pages/Grades';
import Schedule from './pages/Schedule';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

let background = "none";
let custombg1 = "none";

function reducer(state = background, action){
  if (action.type === "change_bg_option_1"){
    state =  "none";
    return state
  }
  if(action.type === "change_bg_option_2"){
    state = "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)";
    return state
  }
  if (action.type === "change_bg_option_3"){
    state = "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)";
    return state
  }
  if (action.type === "change_bg_option_4"){
    state = "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)";
    return state
  }
  else{
    state = "none"
    return state
  }
}


let store =createStore(reducer)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Router>
    <Provider store={store}>
      <App />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Calendar" element={<Calendar />}/>
        <Route path="/Menu" element={<Menu />}/>
        <Route path="/Grades" element={<Grades />}/>
        <Route path="/Schedule" element={<Schedule />}/>
      </Routes>
      </Provider>
  </Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export { default as ReactFromModule } from 'react'