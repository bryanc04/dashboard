
import { HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, createContext, useContext, useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import { BlockPicker, ChromePicker, SketchPicker } from 'react-color';


export default function ThemePop(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    props.changeBackground("change_bg_option_5");
  }
  const handleShow = () => setShow(true);


  const [isShown, setIsShown] = useState(false);
  const handleClick = event => {
    setIsShown(current => !current)
    console.log("fdsafas")

  };


  return (

    <div className="theme_popup">
      <button className="theme_button hvr-grow" onClick={handleClick}></button>

      {isShown && (
        <div>

          <div className="color_picker">
            <span><button className="color_option theme_1" onClick={() => { props.changeTheme("#8b000da8") }}></button></span>
            <span><button className="color_option theme_2" onClick={() => { props.changeTheme("maroon") }}></button></span>
            <span><button className="color_option theme_3" onClick={() => { props.changeTheme("#000000") }}></button></span>
            <span><button className="color_option theme_4" onClick={() => { props.changeTheme("#cdb4db") }}></button></span>

            <div><button className="color_option_custom" onClick={() => { handleShow() }}>Create My Own!</button></div>
            <div className="modal">
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className="bgselect1container">
                  <div className="wrapper">
                    <div className="box a"> Choose Color 1
                      <div className="colorpickergap"></div>
                      <HexColorPicker
                        color={props.color1}
                        onChange={(color) => { props.setColor1(color); }}
                      />
                    </div>
                    <div className="box b"> Choose Color 2
                      <div className="colorpickergap"></div>
                     
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
        </div>
      )}
      {isShown}

    </div>
  );
}

