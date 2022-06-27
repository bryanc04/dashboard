
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, createContext, useContext, useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import { BlockPicker, ChromePicker, SketchPicker } from 'react-color';

const hello = createContext({
  bgcolor1: '',
  setbgcolor1: () => {}
});

const UserContext = createContext({
  userName: "efefef",
  setUserName: () => {}
});

export default function Pop() {
  const background_option = useSelector( (state=> state));
  const [userName, setUserName] = useState(useContext(UserContext).userName);
  const value = useMemo(() => ({ userName, setUserName }), [userName]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch()
  // const [bgcolor1, setbgcolor1] = useState("ffffff");
  // const [bgcolor2, setbgcolor2] = useState("efefef");
  // const value = useMemo(
  //   () => ({ bgcolor1, setbgcolor1 }), 
  //   [bgcolor1]
  // );


  const [isShown, setIsShown] = useState(false);
  const handleClick = event => {
    setIsShown(current => !current)

    // or simply set it to true
    // setIsShown(true);
  };
  console.log(userName)
  console.log(useContext(UserContext).userName)
  
  return (
    
    <div className="popup">
      <button className="color_button hvr-grow" onClick={handleClick}></button>
     
      {isShown && (
        <div>
       
        <div className="color_picker">
        <span><button className="color_option option_1"  onClick={()=> {dispatch({type : "change_bg_option_1"})}}></button></span> 
        <span><button className="color_option option_2" onClick={()=> {dispatch({type : "change_bg_option_2"})}}></button></span>
        <span><button className="color_option option_3" onClick={()=> {dispatch({type : "change_bg_option_3"})}}></button></span>
        <span><button className="color_option option_4"  onClick={()=> {dispatch({type : "change_bg_option_4"})}}></button></span>
        
        <div><button className="color_option_custom" onClick={() => {handleShow()}}>Create My Own!</button></div>
              <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Create Gradient</Modal.Title>
              </Modal.Header>
              <Modal.Body className = "bgselect1container">
                <div class="wrapper">
                  <div class="box a"> Choose Color 1
                    <div className = "colorpickergap"></div>
                    <hello.Provider value = {value}>
                    <BlockPicker
                      color = {userName}
                      onChangeComplete={ (color) => {setUserName(color.hex)} }
                    />
                    </hello.Provider>
                  </div>
                  <div class="box b"> Choose Color 2
                    <div className = "colorpickergap"></div>
                      <BlockPicker
                      color = {background_option.slice(35, 42)}
                        onChangeComplete={ (color) => {setbgcolor2(color.hex)} }
                      />
                  </div>
                  
                </div>
               
              </Modal.Body>

              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  Apply
                </Button>
              
              </Modal.Footer>
            </Modal>
        

        </div>
        
        
        
        </div>
      )}
      {isShown}
      
    </div>
  );
}

export { UserContext }

