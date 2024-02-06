import User from '../models/User.js'
import { errorMessage } from '../errorMessage.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//註冊會員
export const Register = async (req, res, next) => {
    const registerData = req.body
    try{
        const registerWrong = await User.findOne({phone:registerData.phone})
        if(registerWrong) return (next(errorMessage(400, '錯誤，此號碼已註冊過')))
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(registerData.password, salt)
        const newUser = new User({
            name: registerData.name,
            phone: registerData.phone,
            password: hash,
        })
        const saveUser = await newUser.save()
        res.status(200).json(saveUser)
    }catch(err){
        next(errorMessage(404, '註冊失敗', err))
    }
}

//登入會員
export const Login = async (req,res,next)=>{
    const loginData = req.body
    try{
    const userData =  await User.findOne({name:loginData.account}) || await User.findOne({phone:loginData.account});
    if(!userData)return(next(errorMessage(404,"沒有此使用者")))
    const isPasswordCorrect = await bcrypt.compare(loginData.password,userData.password)
    if(!isPasswordCorrect)return(next(errorMessage(404, "帳號或密碼輸入錯誤")))
    //這邊雖然知道是密碼錯誤、但也可以輸入為 "輸入帳號密碼錯誤" 來防止有心人破解密碼
    // 現在要來處理我們登入以後產生一個專屬於這個用戶的TOKEN憑證
    
    const token = jwt.sign({id: userData._id, isAdmin: userData.isAdmin },process.env.JWT) //process.env.JWT就是你自己知道並設立的金鑰
    console.log(token)
    const {password, isAdmin, ...userDetails} = userData._doc;
    console.log(userData._doc)
    res.cookie('JWT_token',token,{
        httpOnly: true
    })
    .status(200).json({userDetails})
    }
    catch(error){
        next(errorMessage(500, "登入失敗",error))
        console.log(error)
    }
}

//管理者登入
export const AdminLogin = async (req,res,next)=>{
    const loginData = req.body
    try{
    const userData =  await User.findOne({name:loginData.account}) || await User.findOne({phone:loginData.account});
    if(!userData)return(next(errorMessage(404,"沒有此使用者")))
    const isPasswordCorrect = await bcrypt.compare(loginData.password,userData.password)
    if(!isPasswordCorrect)return(next(errorMessage(404, "帳號或密碼輸入錯誤")))
    //這邊雖然知道是密碼錯誤、但也可以輸入為 "輸入帳號密碼錯誤" 來防止有心人破解密碼
    // 現在要來處理我們登入以後產生一個專屬於這個用戶的TOKEN憑證
    
    const token = jwt.sign({id: userData._id, isAdmin: userData.isAdmin },process.env.JWT) //process.env.JWT就是你自己知道並設立的金鑰
    console.log(token)
    const {password, isAdmin, ...userDetails} = userData._doc;
    console.log(userData._doc)
    res.cookie('JWT_token',token,{
        httpOnly: true
    })
    .status(200).json({userDetails})
    }
    catch(error){
        next(errorMessage(500, "登入失敗",error))
        console.log(error)
    }
}