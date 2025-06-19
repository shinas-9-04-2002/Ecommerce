import React, { useEffect, useState } from 'react'
import UserNav from './usernavbar'
import { jwtDecode } from 'jwt-decode'
import AXIOS from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


export default function Profile(){

    const [user,setUser]=useState({})
    const token=localStorage.getItem("token")
    const decodedToken=jwtDecode(token)
    
    useEffect(()=>{
         AXIOS.get("http://localhost:9000/user/getuserbyid",{headers:{id:decodedToken.id}})
      .then((res)=>{
        setUser(res.data.userdetails)
      }).catch((err)=>{
        console.log(err)
      })
    },[])

const navigate=useNavigate()

    const handleEdit=(id)=>{
        navigate(`/editprofile/${id}`)
    }

    return(
        <>
        <UserNav/>
        <Card style={{ width: '100%',height:"50vh",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"75px" }}>
       <Card.Body  style={{border:"1px solid black",padding:"25px",borderRadius:"10px",height:"100%",width:"50%"}}>
        <Card.Title>{user.fullname}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{user.phone}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{user.address}</Card.Subtitle>
        <Button variant="warning" onClick={()=>handleEdit(user._id)}>Edit Profile</Button>
        </Card.Body>
    </Card>

        </>
    )
}