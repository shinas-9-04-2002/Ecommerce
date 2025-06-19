import  Button from 'react-bootstrap/Button'
import React, { useEffect, useState } from 'react'
import Adminnav from './adminnav'
import './adminhome.css'
import AXIOS from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AdminHome(){
  
  const [doc,setDoc]=useState({})
  const navigate=useNavigate()
  useEffect(()=>{
    AXIOS.get("http://localhost:9000/admin/countdoc")
    .then((res)=>{
      console.log(res.data)
      setDoc(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])
    return(
        <>
        <Adminnav/>
         {/* <a href="/adminviewusers"><Button variant="primary">View Users</Button></a>
         <a href="/adminaddproducts"><Button variant="primary">Add Products</Button></a> */}
         <div className="grid1">
            <div className="sub1" onClick={()=>navigate("/adminviewusers")}><h1>Users Count:{doc.user}</h1></div>
            <div className="sub1" onClick={()=>navigate("/adminviewproducts")}><h1>Product Count:{doc.products}</h1></div>
            <div className="sub1" onClick={()=>navigate("/adminorder")}><h1>Orders Pending:</h1></div>
            <div className="sub1"><h1>Successfull Deliveries:</h1></div>
         </div>
        </>
    )
}