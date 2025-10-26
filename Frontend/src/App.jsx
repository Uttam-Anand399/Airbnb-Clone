import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ListingPage1 from './Pages/ListingPage1'
import ListingPage2 from './Pages/ListingPage2'
import ListingPage3 from './Pages/ListingPage3'
import { userDataContext } from './Context/UserContext'
import { useContext } from 'react'
import MyListing from './Pages/MyListing'
import ViewCard from './Pages/ViewCard'
import MyBooking from './Pages/MyBooking'
import Booked from './Pages/Booked'
import { ToastContainer, toast } from 'react-toastify';

function App() {
 let{userData}=useContext(userDataContext)

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/listingpage1" 
      element={userData != null? <ListingPage1/>:<Navigate to={"/"}/>}/>
      <Route path="/listingpage2" 
      element={userData != null? <ListingPage2/>:<Navigate to={"/"}/>}/>
      <Route path="/listingpage3"
        element={userData != null? <ListingPage3/>:<Navigate to={"/"}/>}/>
      <Route path="/mylisting"
        element={userData != null? <MyListing/>:<Navigate to={"/"}/>}/>
      <Route path="/viewcard"
        element={userData != null? <ViewCard/>:<Navigate to={"/"}/>}/>
      <Route path="/mybooking"
        element={userData != null? <MyBooking/>:<Navigate to={"/"}/>}/>
      <Route path="/booked"
        element={userData != null? <Booked/>:<Navigate to={"/"}/>}/>
    </Routes>
      
    </>
  )
}

export default App
