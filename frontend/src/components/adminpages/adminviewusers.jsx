import React from 'react'
import AXIOS from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import  Button from 'react-bootstrap/Button'
import Adminnav from './adminnav';

function Adminviewusers() {
    const [users,setUsers]=useState([])
    useEffect(()=>{
    AXIOS.get("http://localhost:9000/user/getUsers")
    .then((res)=>{
        console.log(res.data.userdetails)
        setUsers(res.data.userdetails)
    }).catch((err)=>{
        console.log(err)
    })
    })

    const handleDelete=(id)=>{
         AXIOS.delete("http://localhost:9000/user/deluser",{headers:{id:id}})
         .then((res)=>{
            alert(res.data)
         }).catch((err)=>{
            console.log(err)
         })
    }

  return (
   <>
   <Adminnav/>
    <Table striped="columns" style={{marginTop:'50px'}}>
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((customer,index)=>{
            return(
                <tr key={customer._id}>
                    <td>{index+1}</td>
                    <td>{customer.fullname}</td>
                    <td>{customer.email}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone}</td>
                    <td><Button variant='danger' onClick={()=>{handleDelete(customer._id)}}>Delete</Button></td>
                </tr>
            )
        })}
      </tbody>
    </Table>
   </>
  )
}

export default Adminviewusers