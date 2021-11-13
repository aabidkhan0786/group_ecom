import express from 'express'
import User from '../Models/User.js';
import { verifyAndAuth, verifyToken, verifyAndAdmin } from './verifyToken.js';


const route = express.Router();


//update users

route.put("/:id", verifyAndAuth, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true }
        )
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }

})

// delete users

route.delete("/:id", verifyAndAuth, async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted successfully!")
    } catch (error) {
        res.status(500).json(error)
    }
})

// get users by admin
route.get("/find/:id", verifyAndAdmin, async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


// get all users by admin
route.get("/", verifyAndAdmin, async (req,res)=>{
    const query = req.query.new
    try {
        const users = query ? await User.find().sort({_id:-1}).limit(5) :await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

route.get("/stats", verifyAndAdmin, async (req,res)=>{
    
})

export default route;