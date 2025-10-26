import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const listingDataContext = createContext()

const ListingContext = ({ children }) => {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [rent, setRent] = useState("")
  const [city, setCity] = useState("")
  const [landmark, setLandMark] = useState("")
  const [category, setCategory] = useState("")
  const [adding, setAdding] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [listingData, setListingData] = useState([])
  const [backEndImage1, setBackEndImage1] = useState(null)
  const [backEndImage2, setBackEndImage2] = useState(null)
  const [backEndImage3, setBackEndImage3] = useState(null)
  const [newListData,setNewListData]=useState([])
  let [cardDetails,setCardDetails]=useState(null)
  let [searchData,setSearchData]=useState([])

  const addListing = async () => {
    if (!title || !description || !rent || !city || !landmark || !category) {
      console.log("⚠️ Please fill all required fields");
      return;
    }
    if (!backEndImage1 || !backEndImage2 || !backEndImage3) {
      console.log("⚠️ Please upload all 3 images");
      return;
    }

    setAdding(true)
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("rent", rent)
      formData.append("city", city)
      formData.append("landmark", landmark)
      formData.append("category", category)
      formData.append("image1", backEndImage1)
      formData.append("image2", backEndImage2)
      formData.append("image3", backEndImage3)

      const result = await axios.post(
        `${serverUrl}/api/listing/add`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      console.log("✅ Listing added:", result.data)
     
      navigate("/")
      toast.success("AddListing Succesfully")

      // clear form
      setTitle("")
      setDescription("")
      setRent("")
      setCity("")
      setLandMark("")
      setCategory("")
      setBackEndImage1(null)
      setBackEndImage2(null)
      setBackEndImage3(null)
    } catch (error) {
      console.log("❌ Error adding listing:", error.response?.data || error.message)
      toast.error(error.response.data.message)
    } finally {
      setAdding(false)
    }
  }
  const handleViewCard=async (id) => {
    try {
        let result= await axios.get(`${serverUrl}/api/listing/findlistingbyid/${id}`,{withCredentials:true})
        console.log(result.data)
        setCardDetails(result.data)
        navigate("/viewcard")
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch=async (data) => {
    try {
      let result=await axios.get(`${serverUrl}/api/listing/search?query=${data}`)
      setSearchData(result.data)
    } catch (error) {
      setSearchData(null)
      console.log(error)
    }
    
  }

  const getListing = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/listing/get`, {
        withCredentials: true,
      })
      setListingData(result.data)
      setNewListData(result.data)
    } catch (error) {
      console.log("❌ Error fetching listings:", error.response?.data || error.message)
    }
  }

  useEffect(() => {
    getListing()
  }, [adding,updating,deleting])

  const value = {
    title, setTitle,
    description, setDescription,
    rent, setRent,
    city, setCity,
    landmark, setLandMark,
    category, setCategory,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    adding, listingData,
    getListing, addListing,
    newListData,setNewListData,
    handleViewCard,
    cardDetails,setCardDetails,
    updating,setUpdating,
    deleting, setDeleting,
    handleSearch,
    searchData,setSearchData
  }

  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  )
}

export default ListingContext
