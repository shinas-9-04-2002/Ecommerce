import { createContext, useContext, useEffect,useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {jwtDecode} from 'jwt-decode'
import Axios from 'axios'
import Nav from 'react-bootstrap/Nav';
import { useNavigate, useNavigation } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import ("../userpages/usernav.css")
import { IoSearch } from "react-icons/io5";
import { SearchContext } from './search';


function UserNav() {
  
   const {search,setSearch}=useContext(SearchContext)
    const [user,setUser]=useState({})
    const navigate=useNavigate()

  

    useEffect(()=>{
     const token=localStorage.getItem("token")
     if(!token){
      setTimeout(()=>{
        navigate('/')
      },500)
      return
     }
     const decodedToken=jwtDecode(token)
      Axios.get("http://localhost:9000/user/getuserbyid",{headers:{id:decodedToken.id}})
      .then((res)=>{
        console.log(res.data.userdetails)
        setUser(res.data.userdetails)
      }).catch((err)=>{
        console.log(err)
      })
    },[])



    const handleLogout=()=>{
        localStorage.clear()
        navigate("/")
    }

  return (
    <Navbar className="bg-body-tertiary" style={{height:"75px",}}>
      <Container >
        <Navbar.Brand href="#home">My Website</Navbar.Brand>
        <input type="text" placeholder='Search' name='search' className='search' onChange={(e)=>{setSearch(e.target.value)}}/>
        <IoSearch style={{fontSize:"28px"} } />
        <Navbar.Toggle />
        <a href="/order">order</a>
        <Navbar.Collapse className="justify-content-end">
          <a href="/cart"><FaCartShopping /></a>
          <Navbar.Text style={{marginLeft:"10px"}}>
            Signed in as: <a href="/profile">{user.fullname}</a>
          </Navbar.Text>
          
        </Navbar.Collapse>
      </Container>
       <Nav className="me-auto">
             <Nav.Link  onClick={handleLogout}>Logout</Nav.Link>
           </Nav>
    </Navbar>
  );
}

export default UserNav;