import Date from "../models/ReservationTime.js";
import Order from '../models/Order.js'
import { errorMessage } from '../errorMessage.js'

//新增預約時間
export const createTime = async (req, res, next) => {
    const orderId = req.params.orderId
    const newTime = new Date(req.body)
    try {
        const saveTime = await newTime.save()
        try{
            await Order.findByIdAndUpdate(orderId,{$push:{ bookTime:saveTime._id}})
        }catch(error) {
            next(errorMessage(500, '無法辨識Order ID，更新失敗', error))
        }
        res.status(200).json(saveTime)
    }catch(err){
        // next(errorMessage(500, '預約時間上傳失敗', err))
        res.json(err)
    }
}

// 修改預定時間資料
export const updateTime = async (req, res, next) => {
    const id = req.params.id
    try{
        const updateTime = await Date.findByIdAndUpdate(timeId, {$set:req.body}, {new:true})
        res.status(200).json(updateTime)
    }catch(err){
        next(errorMessage(400, '更新日期資料失敗', err))
    }
}

//透過日期查詢可預約時段
export const getTimeByDate =  async (req, res, next) => {
    try {
      const timeList = await Date.find({ date: req.params.date });
      res.status(200).json(timeList);
    } catch (err) {
        next(errorMessage(400, '查詢可預約時段失敗', err))
    }
  };

//刪除日期資料
export const deleteTime = async (req, res, next) => {
    const orderId = req.params.orderId
    try{
        const deleteDate = await Date.findByIdAndDelete(req.params.id)
        try{
            await Order.findByIdAndDelete(orderId,{ $pull:{bookTime:req.params.id}})
        }catch(err){
            next(err)
        }
    }catch(err){
        next(errorMessage(400, '刪除日期資料失敗', err))
    }
}

// 當刪除訂單時刪除日期資料
export const deleteTimeByOrder = async(req, res, next) => {
    const id = req.params.id
    try{
        await Date.findByIdAndDelete(id)
        res.status(200).json('預定時間資料已刪除')
    }catch (error) {
        next(errorMessage(500, '刪除失敗', error))
    }
}