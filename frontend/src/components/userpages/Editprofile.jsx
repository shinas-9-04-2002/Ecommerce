import React, { useEffect, useState } from 'react'
import AXIOS from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Editprofile() {
    const [user,setUser]=useState({})
    const params=useParams()

     useEffect(()=>{
         AXIOS.get("http://localhost:9000/user/getuserbyid",{headers:{id:params.id}})
      .then((res)=>{
        setUser(res.data.userdetails)
      }).catch((err)=>{
        console.log(err)
      })
    },[])

    const handleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

const navigate=useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
    Axios.put("http://localhost:9000/user/update",user,{headers:{id:params.id}})
    .then((res)=>{
        alert(res.data.message)
        if(res.data.status==200){
         navigate("/profile")
        }
    }).catch((err)=>{
        console.log(err)
    })
  }


  return (
   <>
   <h1>Edit profile</h1>
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Fullname</Form.Label>
        <Form.Control type="text" placeholder="Enter fullname" name='fullname' value={user.fullname} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={user.email} onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={user.password} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter address" name='address' value={user.address} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="number" placeholder="Phone number" name='phone' value={user.phone} onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
       Update
      </Button>
    </Form>
   </>
  )
}
