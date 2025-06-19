import React, { useContext, useEffect, useState } from 'react'
import UserNav from './usernavbar'
import { useNavigate } from 'react-router-dom';
import AXIOS from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import '../userpages/userhome.css'
import Herosection from './herosection';
import Footer from './footer';
import { SearchContext } from './search';


function Userhome() {

  
  const {search}=useContext(SearchContext)
  const [product,setProduct]=useState([])
      const token=localStorage.getItem('token')
    
      const navigate=useNavigate()
    
      useEffect(()=>{
        if(!token)
      {
         setTimeout(() => navigate("/"), 3000);
         return;
        
      }

      AXIOS.get("http://localhost:9000/admin/fetchproduct",{headers:{token:token}})
      .then((res)=>{
          console.log(res.data)
          setProduct(res.data)
      }).catch((err)=>{
          console.log(err)
      })
      },[])
      
      const handleCart=(id)=>{
        const decodedToken=jwtDecode(token)
        console.log(id)
        Axios.post("http://localhost:9000/user/addtocart",{productId:id,quantity:1},{headers:{id:decodedToken.id}})
        .then((res)=>{
          alert(res.data)
        }).catch((err=>{
          console.log(err)
        }))
      }

  
const filteredproducts=product.filter((items)=>{
 return items.productName.toLowerCase().includes(search.toLowerCase())
})
console.log(filteredproducts)


  return (
    <>

    <UserNav/>
    <div className="user-body">
        <Herosection/>
    <Container className="mt-4 ">
    <Row  xs={1} md={3} className="g-5">   
    {filteredproducts.map((items)=>{
      return(
      <Col>
        <Card style={{ width: '22rem' }}>
      <Card.Img variant="top" src={`http://localhost:9000/uploads/${items.image}`} style={{height:"250px"}}/>
      <Card.Body>
        <Card.Title>{items.productName}</Card.Title>
        <Card.Text>
          {items.productDescription}
        </Card.Text>
         <Card.Title>{items.productPrice}  <button > + </button>  <button> - </button></Card.Title>
        <Button variant="primary" onClick={()=>handleCart(items._id)}>Add Cart</Button> <Button variant="warning">Buy Now</Button>
      </Card.Body>
    </Card>
      </Col>
      )
    })}
     </Row>
    </Container>
    </div>
  
    <Footer/>
  
    </>
  )
}
export default Userhome