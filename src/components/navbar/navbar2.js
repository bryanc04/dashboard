import styles from "./navbar2.css"
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export function Navbar2(props){
    return (
<Navbar
      style={{
        backgroundColor: props.theme,
      }}
      expand="lg"
      fixed="top"
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link className={styles['nav-link-no-focus']} href="#">Home</Nav.Link>
          <Nav.Link className={styles['nav-link-no-focus']} href="./Menu">Menu</Nav.Link>
          <Nav.Link className={styles['nav-link-no-focus']} href="./Calendar">Calendar</Nav.Link>
          <Nav.Link className={styles['nav-link-no-focus']} href="./Athletics">Athletics</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};