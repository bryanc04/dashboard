import styles from "./navbar2.css"
import React from 'react';
import Logout from "../logout";
import { Navbar, Nav, Container } from 'react-bootstrap';

export function Navbar2(props){
    return (
<Navbar
      style={{
        backgroundColor: props.theme,
      }}
      expand="lg"
    >
      <Container>
        <Navbar.Brand href="#home">LC DASHBOARD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="./Menu">Menu</Nav.Link>
            <Nav.Link href="./Calendar">Calendar</Nav.Link>
            <Nav.Link href="./Athletics">Athletics</Nav.Link>
          </Nav>
          <Nav>
            <Logout to="/Home" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};