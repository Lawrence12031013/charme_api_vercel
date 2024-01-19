import express from 'express'
import { createOrder, getOrder, updateOrder, deleteOrder, getAllOrders } from '../RoutesController/order.js'
import { verifyAdmin, verifyUser } from '../JWT_Token.js'

const router = express.Router()

//新增訂單
router.post('/',createOrder)

// 訂單ID查找資料
router.get('/:id',verifyAdmin, getOrder)

//修改資料
router.put('/:id',verifyAdmin, updateOrder)

//刪除資料
router.delete('/:id', deleteOrder)

//查看所有訂單
router.get('/',verifyAdmin, getAllOrders)

//會員查看消費訂單
router.get('/user/:userId', getAllOrders)

export default router