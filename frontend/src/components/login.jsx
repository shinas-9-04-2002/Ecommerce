import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
     const[user,setUser]=useState({
            email:"",
            password:"",
        })
    
      const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
      }

      const navigate = useNavigate()
    
      const handleSubmit=(e)=>{
        e.preventDefault()
          Axios.post("http://localhost:9000/user/login",user)
        .then((res)=>{
            alert(res.data.message)
            if(res.data.status==200 && res.data.role=="admin"){
                 localStorage.setItem("token",res.data.token)
                  navigate("/adminhome")
            } else if(res.data.status==200 && res.data.role=="user"){
               localStorage.setItem("token",res.data.token)
               navigate("/userhome")
            }
            else {
               console.log(res.data.message)
            }
        }).catch((err)=>{
            console.log(err)
        })       
      }
  return (
   <>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{color:"white"}}>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{color:"white"}}>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button><br />
      <a href="/registerpage">Don't have an account?</a>
    </Form>
   </>
  )
}

export default Login


