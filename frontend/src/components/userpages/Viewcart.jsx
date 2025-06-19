import React from 'react'
import AXIOS from 'axios'
import { useEffect } from 'react'
import UserNav from './usernavbar'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'





export default function Cart(){
  const [cart,setCart]=useState([])
  const [cartId,setCartId]=useState("")
  const [deliveryAddress,setDeliveryAddress]=useState("")
  const [payment,setPayment]=useState("")
  const token=localStorage.getItem("token")
  const decodedToken=jwtDecode(token)
  const navigate = useNavigate()

    useEffect(()=>{
      
        AXIOS.get("http://localhost:9000/user/cartitems",{headers:{id:decodedToken.id}})
        .then((res)=>{
            console.log(res.data)
            setCart(res.data.product)
            setCartId(res.data._id)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    
    const handleRemove=(id)=>{
      AXIOS.delete("http://localhost:9000/user/delproduct",{headers:{id:decodedToken.id,productId:id}})
        .then((res)=>{
            alert(res.data)

          
        }).catch((err)=>{
            console.log(err)
        })
    }
    const totalAmount=cart.reduce((total,items)=>total+(items.quantity * items.productId.productPrice),0)
    
   const placeOrder=(e)=>{
    e.preventDefault()
    console.log("Order-Details:",{
      cartId,
      totalAmount,
      deliveryAddress,
      payment
    })
    AXIOS.post("http://localhost:9000/user/placeorder",{cartId,totalAmount,deliveryAddress,payment},{
      headers:{id:decodedToken.id}
    }).then((res)=>{
      alert(res.data)
       navigate("/order")
    }).catch((err)=>{
      console.log(err)
    })

    
   }


    return(
        <>
        <UserNav/>
         {cart.length > 0 ? <>
           <div className="cartpage">
      <div className="order">
         
        <h1>Cart Page</h1>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((items,index)=>{
            return(
                <tr key={items._id}>
                 <td>{index+1}</td>
                 <td><img src={`http://localhost:9000/uploads/${items.productId.image}`} alt={items.productId.image} style={{height:"100px",width:"100px"}} /></td>
                 <td>{items.productId.productName}</td>
                 <td>{items.quantity}</td>
                 <td>{items.productId.productPrice}</td>
                 <td>{items.quantity * items.productId.productPrice} </td>
                 <td><Button variant="danger" onClick={(e)=>{handleRemove(items.productId._id)}}>Delete</Button></td>
                </tr>
            )
        })}
      </tbody>
    </Table>
     </div>
   <div className="order1">
    <h1>Total Amount:{totalAmount}</h1>
    <Form onSubmit={placeOrder}>
      <FloatingLabel controlId="floatingTextarea2" label="Enter your delivery address">
        <Form.Control
          as="textarea"
          placeholder="Enter your delivery address"
          style={{ height: '100px',width:"400px" }}
          onChange={(e)=>setDeliveryAddress(e.target.value)}
        />
      </FloatingLabel>
      <Form.Check type="radio" aria-label="radio 1" name='payment' value="COD"  label="Cash On Delivery" onChange={(e)=>setPayment(e.target.value)} />
      <Form.Check type="radio" aria-label="radio 1" name='payment' value="onlinepayment" label="Online Payment" onChange={(e)=>setPayment(e.target.value)} />
     <Button variant="warning" type='submit'>PLACE ORDER</Button>
    </Form>
   </div>
     </div>
         </>:
         <>
         <h1 style={{textAlign:"center"}}>Cart Is Empty</h1>
         </>}
        </>
    )
}