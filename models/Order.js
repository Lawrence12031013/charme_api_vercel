import Mongoose from "mongoose";

const OrderSchema = new Mongoose.Schema({
    userID:{type:String, require:true},
    name:{type:String, require:true},
    phone:{type:String},
    reservationDate:{type:String, require:true},
    reservationTime:{type:String, require:true},
    bookTime:[{type:String}],
    totalPrice:{type:Number, require:true},
    service:{type:String, require:true}
}, {timestamps:true}
)

export default Mongoose.model('Order', OrderSchema)