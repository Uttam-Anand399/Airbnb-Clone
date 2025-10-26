import React, { useContext, useState } from 'react'
import { userDataContext } from '../Context/UserContext'
import { listingDataContext } from '../Context/ListingContext'
import { useNavigate } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { bookingDataContext } from '../Context/BookingContext';


const Card = ({title,landmark,image1,image2,image3,rent,city,id,ratings,isBooked,host}) => {
  let navigate = useNavigate()
  let { userData } = useContext(userDataContext)
  let { handleViewCard } = useContext(listingDataContext)
  let [popUp,setPopup]=useState(false)
  let {cancelBooking}=useContext(bookingDataContext)

  const handleClick = () => {
    if (userData) {
      handleViewCard(id)
    } else {
      navigate("/login")
    }
  }

  return (
    <div 
      className='w-[330px] max-w-[90%] h-[460px] rounded-lg cursor-pointer relative shadow-md bg-white hover:shadow-lg transition-all'
      onClick={()=>!isBooked?handleClick():null}
    >

      {/* ✅ Booked Badge */}
      {isBooked && (
        <div className='absolute top-2 right-2 bg-white text-green-600 text-xs px-2 py-1 rounded-md shadow flex'>
          <GiConfirmed  className=' w-[20px] h-[20px]'/>
          Booked
        </div>
      )}
      {isBooked && host ==userData?._id && (<div className='absolute top-11 right-2 bg-white text-red-600 text-xs px-2 py-1 rounded-md shadow flex'
      onClick={()=>setPopup(prev => !prev)}
      >
        <FcCancel  className=' w-[20px] h-[20px] ' />
        Cancel Booking
      </div>)} 

      {popUp && <div className='w-[300px] h-[100px] bg-[#ffffffdf] absolute top-[110px] left-[13px] rounded-lg '>
        <div className='w-[100%] h-[50%] text-[#2e2d2d] flex items-start justify-center rounded-lg overflow-auto text-[20px] p-[10px] '>Booking Cancel!</div>
        <div className='w-[100%] h-[50%] text-[18px] font-semibold flex items-start justify-center gap-[10px] text-[#986b6b] '>Are You Sure?
           <button className='px-[20px] bg-[red] text-white rounded-lg hover:bg-slate-600  '
           onClick={()=>{cancelBooking(id);setPopup(prev=>!prev)}}
           >Yes</button>
           <button className='px-[10px] bg-[red] text-white rounded-lg hover:bg-slate-600  '
           onClick={()=>setPopup(prev=>!prev)}
           >No</button>
           </div>
      </div>}

      {/* ✅ Images (Swipe Like Layout) */}
      <div className='w-full h-[67%] rounded-lg overflow-hidden flex'>
        <img src={image1} alt="" className='w-full h-full object-cover flex-shrink-0' />
        <img src={image2} alt="" className='w-full h-full object-cover flex-shrink-0' />
        <img src={image3} alt="" className='w-full h-full object-cover flex-shrink-0' />
      </div>

      {/* ✅ Details */}
      <div className='w-full h-[33%] py-4 px-1 flex flex-col gap-1'>
        <div className='flex items-center justify-between text-[18px]'>
          <span className='w-[75%] text-ellipsis overflow-hidden text-nowrap font-semibold text-[#392f2f]'>
            In {landmark.toUpperCase()}, {city.toUpperCase()}
          </span>
          <span className='flex items-center gap-1 text-[16px]'>
            <FaStar className='text-[#eb6262]' /> {ratings}
          </span>
        </div>

        <span className='text-[15px] w-[80%] overflow-hidden text-nowrap text-ellipsis'>
          {title.toUpperCase()}
        </span>

        <span className='text-[17px] font-semibold text-[#986b6b]'>
          ₹{rent}/day
        </span>
      </div>

    </div>
  )
}

export default Card
