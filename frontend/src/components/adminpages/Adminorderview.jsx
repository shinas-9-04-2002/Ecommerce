import React from 'react'
import { useEffect } from 'react'
import AXIOS from 'axios'
import Table from 'react-bootstrap/Table';
import { useState } from 'react'
import Adminnav from './adminnav';

export default function Adminvieworder(){
  const token=localStorage.getItem('token') 

    const [order,setOrder]=useState([])
    useEffect(()=>{
       AXIOS.get("http://localhost:9000/admin/fetchorder")
       .then((res)=>{
        console.log(res.data)
        setOrder(res.data)
       }).catch((err)=>{
        console.log(err)
       })
    },[])

        const handleStatus=(id,status)=>{
        AXIOS.put("http://localhost:9000/admin/updatestatus",{status},{headers:{id:id,token:token}})
        .then((res)=>{
          alert(res.data)
        }).catch((err)=>{
          console.log(err)
        })
    }

    
    return(
        <>
    <Adminnav/>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Products</th>
          <th>Delivery Address</th>
          <th>Total Amount</th>
          <th>Payment Details</th>
          <th>Status</th>
          <th>Action</th>
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
          <td><select name="status"  onChange={(e)=>handleStatus(orderdetails._id,e.target.value)}>
            <option value="shipped">Shipped</option>
            <option value="out for delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
              <option selected>--select a option--</option>
            </select></td>
        </tr>
)})}
      </tbody>
    </Table>
        </>
    )
}