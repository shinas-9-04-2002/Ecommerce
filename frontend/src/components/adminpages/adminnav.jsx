import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Adminnav() {
     const navigate=useNavigate()
    
        const handleLogout=()=>{
            localStorage.clear()
            navigate("/")
        }
  return (
   <>
   <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">ADMIN DASHBOARD</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="/adminprofile">Admin</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
       <Nav className="me-auto">
             <Nav.Link  onClick={handleLogout}>Logout</Nav.Link>
           </Nav>
    </Navbar>
   </>
  )
}
