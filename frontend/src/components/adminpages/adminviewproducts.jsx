import React, { useEffect, useState } from 'react'
import  Button from 'react-bootstrap/Button'
import Adminnav from './adminnav'
import AXIOS from 'axios'
import Table from 'react-bootstrap/Table';
import './addproduct.css'
import { useNavigate } from 'react-router-dom';
export default function Adminviewproducts() {
    const [product,setProduct]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
    AXIOS.get("http://localhost:9000/admin/fetchproduct")
    .then((res)=>{
        console.log(res.data)
        setProduct(res.data)
    }).catch((err)=>{
        console.log(err)
    })
    },[])

  const handleDelete = (id) => {
    AXIOS.delete(`http://localhost:9000/admin/delproduct/${id}`)
    .then((res) => {
        alert(res.data);
        
        setProduct(product.filter(p => p._id !== id));
    }).catch((err) => {
        console.log(err);
    });
};

  return (
  <>
  <Adminnav/>
   <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th> Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {product.map((items,index)=>{
            return (
                <tr key={items._id}>
                   <td>{index+1}</td>
                   <td>{items.productName}</td>
                   <td>{items.productPrice}</td>
                   <td>{items.productDescription}</td>
                   <td>{items.productQuantity}</td>
                   <td><img src={`http://localhost:9000/uploads/${items.image}`} alt={items.image} style={{width:"200px"}} /></td>
                   <td> <Button variant='danger' onClick={() => handleDelete(items._id)}>Delete</Button></td>
                </tr>
            )
        })}
      </tbody>
    </Table>
    <div className="float-btn" onClick={()=>navigate("/adminaddproducts")}>
        <h1>+</h1>
    </div>
  </>
  )
}
