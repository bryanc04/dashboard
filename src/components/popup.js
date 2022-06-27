
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, createContext, useContext, useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import { BlockPicker, ChromePicker, SketchPicker } from 'react-color';


export default function Pop(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [isShown, setIsShown] = useState(false);
  const handleClick = event => {
    setIsShown(current => !current)

  };
  
  return (
    
    <div className="popup">
      <button className="color_button hvr-grow" onClick={handleClick}></button>
     
      {isShown && (
        <div>
       
        <div className="color_picker">
        <span><button className="color_option option_1"  onClick={()=> {props.changeBackground("change_bg_option_1")}}></button></span> 
        <span><button className="color_option option_2" onClick={()=> {props.changeBackground("change_bg_option_2")}}></button></span>
        <span><button className="color_option option_3" onClick={()=> {props.changeBackground("change_bg_option_3")}}></button></span>
        <span><button className="color_option option_4"  onClick={()=> {props.changeBackground("change_bg_option_4")}}></button></span>
        
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
                    {/* <BlockPicker
                      color = {userName}
                      onChangeComplete={ (color) => {setUserName(color.hex)} }
                    /> */}
                  </div>
                  <div class="box b"> Choose Color 2
                    <div className = "colorpickergap"></div>
                      {/* <BlockPicker
                      color = {background_option.slice(35, 42)}
                        // onChangeComplete={ (color) => {setbgcolor2(color.hex)} }
                      /> */}
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

