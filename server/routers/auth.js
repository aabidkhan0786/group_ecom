import express from 'express'
import user from '../Models/User.js';
import CryptoJS from 'crypto-js';
import User from '../Models/User.js';
import jwt from 'jsonwebtoken';


const route = express.Router();


//REGISTER
route.post("/register", async (req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString()
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
        
    }
})


//LOGIN

route.post("/login", async (req,res)=>{
    try {
        const users = await User.findOne({email:req.body.email})

        if(!users){
            return res.status(401).json("User dont exist!")
        }
        const hasPass = CryptoJS.AES.decrypt(users.password,process.env.PASS_KEY);
        const password = hasPass.toString(CryptoJS.enc.Utf8)

        if(password !== req.body.password)
         return res.status(401).json("wrong credentials")

        // const {pswd, ...details} = users

        const accessToken = jwt.sign({
            id : users._id,
            isAdmin : users.isAdmin
        },
        process.env.JWT_TOKEN,
        {expiresIn:"3d"}
        )

        res.status(200).json({users,accessToken})
    } catch (error) {
        res.status(500).json(error)
    }
})





export default route;