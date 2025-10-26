import uploadOnCloudinary from "../Config/cloudinary.js";
import Listing from "../Model/listing.model.js";
import User from "../Model/user.model.js";

export const addListing = async (req, res) => {
  try {
    let host = req.userId;
    const { title, description, rent, city, landmark, category } = req.body;

    // check if files exist
    if (!req.files?.image1 || !req.files?.image2 || !req.files?.image3) {
      return res.status(400).json({ message: "All images are required" });
    }

    const image1 = await uploadOnCloudinary(req.files.image1[0].path);
    const image2 = await uploadOnCloudinary(req.files.image2[0].path);
    const image3 = await uploadOnCloudinary(req.files.image3[0].path);

    const listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
      host,
    });

    const user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User is not found" }); // ✅ added return
    }

    return res.status(201).json(listing);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `addListing error: ${error.message}` });
  }
};

export const getListing=async (req,res) => {
  try {
    let listing=await Listing.find().sort({createdAt:-1})
   return res.status(200).json(listing)
  } catch (error) {
   return res.status(500).json({
      message:`getlisting error ${error}`
    })
  }
}
export const findListing=async (req,res) => {
  try {
    let {id}=req.params
    let listing=await Listing.findById(id)
    if(!listing){
     return res.status(404).json({message:"listing not found"})
    }
   return res.status(200).json(listing)
  } catch (error) {
   return res.status(500).json(`findListing error ${error}`)
  }
}
export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, rent, city, landmark, category } = req.body;

    const listing = await Listing.findByIdAndUpdate(id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    // Update text fields
    if (title) listing.title = title;
    if (description) listing.description = description;
    if (rent) listing.rent = rent;
    if (city) listing.city = city;
    if (landmark) listing.landmark = landmark;
    if (category) listing.category = category;

    // Update images only if they exist
    if (req.files?.image1) {
      listing.image1 = await uploadOnCloudinary(req.files.image1[0].path);
    }
    if (req.files?.image2) {
      listing.image2 = await uploadOnCloudinary(req.files.image2[0].path);
    }
    if (req.files?.image3) {
      listing.image3 = await uploadOnCloudinary(req.files.image3[0].path);
    }

    await listing.save();

    return res.status(200).json(listing);
  } catch (error) {
    return res.status(500).json({ message: "updateListing error", error });
  }
};
export const deleteListing=async (req,res) => {
  try {
    let {id}=req.params;
    let listing=await Listing.findByIdAndDelete(id)
    let user=await User.findByIdAndUpdate(listing.host,{
      $pull:{listing:listing._id}
    },{new:true})
    if(!user){
      return res.status(404).json({message:"User is not found"})
    }
    return res.status(201).json({
      message:"Listing Deleted"
    })
  } catch (error) {
    return res.status(500).json({ message: "deleteListing error", error });
  }
  
}

export const ratingListing=async (req,res) => {
  try {
    let {id}=req.params
    let {ratings}=req.body
    let listing=await Listing.findById(id)
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    listing.ratings=Number(ratings)
    await listing.save();
    return res.status(200).json({ratings:listing.ratings})

  } catch (error) {
    return res.status(500).json({message:`Rating error ${error}`})
  }
  
}

export const search=async (req,res) => {
  try {
    const {query}=req.query
    if(!query){
      return res.status(400).json({message:"Search Query is required"})
    }
    const listing=await Listing.find({
      $or:[
        {landmark:{ $regex: query,$options:"i"}},
        {city:{ $regex: query,$options:"i"}},
        {title:{ $regex: query,$options:"i"}}
      ]
    })
    return res.status(200).json(listing);
  } catch (error) {
    console.error("Search error:",error);
    return res.status(500).json({message:"Internal server error"})
  }
  
}