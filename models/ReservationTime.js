import mongoose from 'mongoose'

const ReservationDateSchema = new mongoose.Schema({
      date: { type: String, required: true },
      time: { type: String, required: true },
      booked: { type: Boolean, default: true }
}, {timestamps:true}
)

export default mongoose.model('Date', ReservationDateSchema)