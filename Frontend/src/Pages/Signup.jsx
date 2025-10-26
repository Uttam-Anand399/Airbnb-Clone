import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { useContext } from 'react';
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios'
import { userDataContext } from '../Context/UserContext';
import { toast } from 'react-toastify';

const Signup = () => {
    let navigate=useNavigate()
    let {serverUrl,loading,setLoading}=useContext(authDataContext)
    let {userData,setUserData}=useContext(userDataContext)
    let [name,setName]=useState("")
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")

    const handleSignup=async (e) => {
        setLoading(true)
        try {
            e.preventDefault()
            let result=await axios.post(serverUrl + "/api/auth/signup",{
                name,
                email,
                password
            },{withCredentials:true})
            setLoading(false)
            setUserData(result.data)
            navigate("/")
            console.log(result)
            toast.success("SignUp Successfully")
        } catch (error) {
             setLoading(false)
            console.log(error);
            toast.error(error.response.data.message)
            
        }
    }
  return (
     <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>
        <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%]  left-[20px] rounded-[50%] flex items-center justify-center 'onClick={()=>navigate("/")}><FaArrowLeft className='w-[25px] h-[25px] text-[white] ' /></div>
        <form action="" className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px] ' onSubmit={handleSignup}>
            <h1 className='text-[30px] text-black font-semibold'>Welcome to AirBnb</h1>
            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                <label htmlFor="name" className='text-[20px]'>UserName</label>
                <input 
                type="text" 
                id='name'
                className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]'
                required
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                />
            </div>
            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                <label htmlFor="email" className='text-[20px]'>Email</label>
                <input 
                type="text" 
                id='email' 
                className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]' 
                required 
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                />
            </div>
            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                <label htmlFor="password" className='text-[20px]'>Password</label>
                <input 
                type="password" 
                id='password' 
                className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] ' 
                required 
                onChange={(e)=>setPassword(e.target.value)} 
                value={password}
                />
            </div>
            <button className='px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg 'disabled={loading}>{loading?"loading....":"Signup"}</button>
            <p className='text-[18px]'>Already have account?<span className='text-[19px] text-[red] cursor-pointer'onClick={()=>navigate("/login")}>Login</span></p>
        </form>

     </div>
  )
}

export default Signup