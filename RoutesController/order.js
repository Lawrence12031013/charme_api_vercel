import { errorMessage } from '../errorMessage.js'
import Order from '../models/Order.js'
import Time from '../models/ReservationTime.js'
import User from '../models/User.js'

// 新增訂單
export const createOrder = async (req, res, next) => {
    const newOrder = new Order (req.body)
    try {
        const saveOrder = await newOrder.save()
        res.status(200).json(saveOrder)
    }catch(err){
        next(errorMessage(404, '建立訂單失敗，請確認格式', error))
    }
}

// 查找資料
export const getOrder = async (req, res, next) => {
    const id = req.params.id
    try {
        const getOrder = await Order.findById(id)
        res.status(200).json(getOrder)
    }catch(err){
        next(errorMessage(404,'查無此訂單', err))
    }
}

// 修改資料
export const updateOrder = async (req, res, next) =>{
    const id = req.params.id
    const body = req.body
    try {
        const updateOrder = await Order.findByIdAndUpdate(id,{ $set:body }, { new: true })
        res.status(200).json(updateOrder)
    }catch(err){
        next(errorMessage(404, '修改資料失敗', err))
    }
}

// 刪除資料
export const deleteOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json('找不到訂單');
        }
        const timeId = order.bookTime;
        if (timeId) {
            await Time.findByIdAndDelete(timeId);
        }
        await Order.findByIdAndDelete(id);
        res.status(200).json('資料已刪除');
    } catch (err) {
        console.log(err);
        next(errorMessage(500, "刪除資料時出錯了", err));
    }
};

// 查看所有訂單
export const getAllOrders = async (req, res, next) => {
    try{
        const OrdersList =  await Order.find()
        res.status(200).json(OrdersList)
    }catch(err) {
        next(errorMessage(500,"取得資料列表時發生錯誤！", err))
    }
}

// 透過顧客ID 查找所有資料
export const getAllOrdersByID = async (req, res, next) => {
    const userId = req.params.userid
    try {
        const userData = await User.findById(userId)
        try{
            const OrdersList = await Promise.all(userData.record.map(
                userId => {
                    return Order.find({"_id":userId})
                }
            ))
            res.status(200).json(OrdersList)
        }catch(err){
            next(errorMessage(404, '尋找訂單發生錯誤', err))
        }
    }catch(err){
        next(errorMessage(404, '找不到該訂單', err))
    }
}