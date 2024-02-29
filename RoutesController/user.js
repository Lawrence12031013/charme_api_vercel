import { errorMessage } from "../errorMessage.js";
import User from '../models/User.js'
import { ObjectId } from 'mongodb';

//更改User
export const updatedUser = async (req, res, next) => {
    const id = req.params.id
    const body = req.body
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {$set:body}, {new:true})
        res.status(200).json(updatedUser)
    }catch(err){
        next(errorMessage(404, '更改會員資料失敗', err))
    }
}

// 刪除User
export const deleteUser = async (req, res, next) => {
    const id = req.params.id
    try{
        await User.findOneAndDelete(id)
        res.status(200).json('會員資料刪除成功')
    }catch(err){
        next(errorMessage(404, '會員刪除失敗', err))
    }
}

// 讀取所有會員資料
export const getUsers = async (req, res, next) => {
    try{
        const getAllUsers = await User.find()
        res.status(200).json(getAllUsers)
    }catch(err){
        next(errorMessage(404, '獲取會員資料失敗', err))
    }
}

// 讀取會員資料
export const getUser = async (req, res, next) => {
    const userID = req.params.userID;
    try {
        const getUser = await User.find({ '_id': ObjectId(userID) });
        res.status(200).json(getUser);
    } catch (err) {
        next(errorMessage(404, '讀取會員失敗', err));
    }
}