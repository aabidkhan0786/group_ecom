import express from 'express'
import Product from '../Models/Product.js';
import { verifyAndAuth, verifyToken, verifyAndAdmin } from './verifyToken.js';


const route = express.Router();

// create product
 route.post("/",verifyAndAdmin,async (req,res)=>{
     const newProduct = new Product(req.body);

     try {
         const savedProduct = await newProduct.save()
         res.status(200).json(savedProduct)
     } catch (error) {
         console.log(error);
         res.status(500).json(error)
     }
 })

// //update users

// route.put("/:id", verifyAndAuth, async (req, res) => {
//     if (req.body.password) {
//         req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString()
//     }

//     try {
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, {
//             $set: req.body,
//         },
//             { new: true }
//         )
//         res.status(200).json(updatedUser)
//     } catch (error) {
//         res.status(500).json(error)
//     }

// })

// // delete users

// route.delete("/:id", verifyAndAuth, async (req,res)=>{
//     try {
//         await User.findByIdAndDelete(req.params.id)
//         res.status(200).json("User deleted successfully!")
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

// get products
route.get("/find/:id", async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})


// get all products sort by categories and new query
route.get("/", async (req,res)=>{
    const queryNew = req.query.new
    const querycategory = req.query.category

    let products;
    try {
        if(queryNew){
            products = await Product.find().sort({createdAt:-1}).limit(5)
        }else if(querycategory){
            products = await Product.find({
                categories:{
                    $in:[querycategory]
                } 
            })
        }else{
            products = await Product.find()
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})

route.get("/stats", verifyAndAdmin, async (req,res)=>{
    
})

export default route;