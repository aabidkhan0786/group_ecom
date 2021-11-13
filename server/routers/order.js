import express from 'express'
import Cart from '../Models/Cart.js';
import { verifyAndAuth, verifyToken, verifyAndAdmin } from './verifyToken.js';


const route = express.Router();

// create order
 route.post("/",verifyToken,async (req,res)=>{
     const newOrder = new Order(req.body);
     try {
         const savedOrder = await newOrder.save()
         res.status(200).json(savedOrder)
     } catch (error) {
         console.log(error);
         res.status(500).json(error)
     }
 })

//update order

route.put("/:id", verifyAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true }
        )
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json(error)
    }

})

// delete order

route.delete("/:id", verifyAndAdmin, async (req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order deleted successfully!")
    } catch (error) {
        res.status(500).json(error)
    }
})

// get Order by user id
route.get("/find/:id",verifyAndAuth, async (req,res)=>{
    try {
        const orders = await Order.find({id:req.params.id})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})


// get all cart for admin

route.get("/", verifyAndAdmin, async (req,res)=>{
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
})


export default route;