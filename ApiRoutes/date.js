import express from 'express'
import {createTime, deleteTimeByOrder, getTimeByDate, updateTime} from '../RoutesController/date.js'
import { verifyAdmin, verifyUser } from '../JWT_Token.js'

const router = express.Router()

// 新增預約時間
router.post('/:orderId', createTime)

// 透過日期查詢可預約時間
router.get('/:date', getTimeByDate)

// 當刪除訂單時刪除日期資料
router.delete('/:id', deleteTimeByOrder)

// 修改預定時間資料
router.put('/:id', updateTime)

export default router;