import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type:String, required: true, unique: true },
    password: { type:String, required: true },
    email:{type:String},
    isAdmin: { type:Boolean, default: false},
    comment: {
        type: String,
        default: () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            return `${year}-${month}-${day} 註冊帳號`;
        }
    }
})

export default mongoose.model('User', UserSchema)