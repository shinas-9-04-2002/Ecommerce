import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Registration() {
    const[user,setUser]=useState({
        fullname:"",
        email:"",
        password:"",
        address:"",
        phone:null
    })

  const handleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  const navigate=useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
    Axios.post("http://localhost:9000/user/register",user)
    .then((res)=>{
        alert(res.data.message)
        if(res.data.status==200){
          navigate("/")
        }
    }).catch((err)=>{
        console.log(err)
    })
  }
  return (
    <>
     <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Fullname</Form.Label>
        <Form.Control type="text" placeholder="Enter fullname" name='fullname' onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter address" name='address' onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="number" placeholder="Phone number" name='phone' onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  )
}

export default Registration