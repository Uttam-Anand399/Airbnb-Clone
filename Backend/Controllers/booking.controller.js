import Booking from "../Model/booking.model.js"
import Listing from "../Model/listing.model.js"
import User from "../Model/user.model.js"


export const createBooking=async (req,res) => {
    try {
        let {id}=req.params
        let {checkIn,checkOut,totalRent}=req.body

        let listing=await Listing.findById(id)
        if(!listing){
            return res.status(404).json({message:"Listing is not found"})
        }
        if(new Date(checkIn) >= new Date(checkOut)){
            return res.status(400).json({message:"Invalid checkIn/checkOut Date"})
        }
        if(listing.isBooked){
            return res.status(400).json({message:"Listing is already booked"})
        }

        let booking=await Booking.create({
            checkIn,
            checkOut,
            totalRent,
            host:listing.host,
            guest:req.userId,
            listing:listing._id

        })
        await booking.populate("host","email");
        let user=await User.findByIdAndUpdate(req.userId,{
            $push:{booking:booking._id}
        },{new:true})
         if(!user){
            return res.status(404).json({message:"user is not found"})
        }
        listing.guest=req.userId
        listing.isBooked=true
        await listing.save()
        return res.status(201).json(booking)
    } catch (error) {
        return res.status(500).json({message:`booking error ${error}`})
    }
}
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find listing and mark as not booked
    const listing = await Listing.findByIdAndUpdate(
      id,
      { isBooked: false, guest: null },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Remove booking reference from user
    await User.findByIdAndUpdate(
      listing.guest,
      { $pull: { booking: listing._id } },
      { new: true }
    );

    return res.status(200).json({ message: "Booking Cancelled Successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Booking Cancel Error" });
  }
};
