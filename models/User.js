import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type:String, required: true, unique: true },
    password: { type:String, required: true },
    email:{type:String},
    isAdmin: { type:Boolean, default: false},
    comment:{type:String, default: () => `${new Date().getFullYear}-${new Date().getMonth}-${new Date().getDay}  註冊帳號`}
})

export default mongoose.model('User', UserSchema)