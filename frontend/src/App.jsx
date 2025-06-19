
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/login'
import Registration from './components/Registration'
import 'bootstrap/dist/css/bootstrap.min.css';
import Userhome from './components/userpages/userhome';
import AdminHome from './components/adminpages/adminhome';
import Adminviewusers from './components/adminpages/adminviewusers';
import Profile from './components/userpages/profile';
import Editprofile from './components/userpages/Editprofile';
import Adminaddproducts from './components/adminpages/adminaddproducts';
import Adminviewproducts from './components/adminpages/adminviewproducts';
import Viewcart from './components/userpages/Viewcart';
import Orderpage from './components/userpages/orderpage';
import Adminvieworder from './components/adminpages/Adminorderview';
import { SearchContext } from './components/userpages/search';
import { useState } from 'react';


function App() {
  const [search,setSearch]=useState('')

  return (
    <>
      <SearchContext.Provider value={{search,setSearch}}>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/registerpage" element={<Registration/>}/>
      <Route path="/userhome" element={<Userhome/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/editprofile/:id" element={<Editprofile/>}/>
      <Route path="/adminhome" element={<AdminHome/>}/>
      <Route path="/adminviewusers" element={<Adminviewusers/>}/>
      <Route path="/adminaddproducts" element={<Adminaddproducts/>}/>
      <Route path="/adminviewproducts" element={<Adminviewproducts/>}/>
      <Route path='/cart' element={<Viewcart/>}/>
      <Route path='/order' element={<Orderpage/>}/>
      <Route path='/adminorder' element={<Adminvieworder/>}/>
     </Routes>
     </SearchContext.Provider>
    </>
  )
}

export default App
