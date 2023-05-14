import styles from "./navbar2.css"
import React, { useState } from 'react';
import Logout from "../logout";
import { Navbar, Nav, Container } from 'react-bootstrap';

export function Navbar2(props) {
  const [selected, setSelected] = useState("/Home");
  return (
    <Navbar
      style={{
        backgroundColor: props.theme,
      }}
      expand="lg"
      fixed="top"
    >
      <Container fluid>
        <Navbar.Brand href="#home">LC DASHBOARD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            activeKey={selected}
            className="me-auto"
            onSelect={(selectedKey) => setSelected(selectedKey)}
          >
            <Nav.Link href="/Home">Home</Nav.Link>
            <Nav.Link href="/Menu">Menu</Nav.Link>
            <Nav.Link href="/Calendar">Calendar</Nav.Link>
            <Nav.Link href="/Schedule">Athletics</Nav.Link>
          </Nav>
          <Nav>
            <Logout to="/Home" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};