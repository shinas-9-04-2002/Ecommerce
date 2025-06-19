import React from 'react'
import { useEffect } from 'react'
import AXIOS from 'axios'
import {jwtDecode} from 'jwt-decode'
import UserNav from './usernavbar'
import Table from 'react-bootstrap/Table';
import { useState } from 'react'

export default function Orderpage(){
    const token=localStorage.getItem('token')
    const decodedToken=jwtDecode(token)
    const [order,setOrder]=useState([])
    useEffect(()=>{
       AXIOS.get("http://localhost:9000/user/vieworder",{headers:{id:decodedToken.id}})
       .then((res)=>{
        console.log(res.data)
        setOrder(res.data)
       }).catch((err)=>{
        console.log(err)
       })
    },[])
    return(
        <>
    <UserNav/>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Products</th>
          <th>Delivery Address</th>
          <th>Total Amount</th>
          <th>Payment Details</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
       {order.map((orderdetails,index)=>{
        return(
        <tr key={orderdetails._id}>
          <td>{index+1}</td>
          <td>
            {orderdetails.cartId.product.map((items)=>{
                return(
                 <tr>
                     <td>{items.productId.productName}</td>
                     <td>({items.quantity})</td>
                 </tr>
                )
            })}
          </td>
          <td>{orderdetails.deliveryAddress}</td>
          <td>{orderdetails.totalAmount}</td>
          <td>{orderdetails.payment}</td>
          <td>{orderdetails.status}</td>
        </tr>
)})}
      </tbody>
    </Table>
        </>
    )
}