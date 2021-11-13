import jwt from 'jsonwebtoken'

let verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token

    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_TOKEN,(err,user)=>{
            if(err){
                return res.status(401).json("Token expired!")
            }else{
                req.user = user
                next()
            }
        })
    }else{
        res.status(401).json("Unauthenticated user!")
    }
}

const verifyAndAuth =(req,res,next) =>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin ){
            next()
        }else{
            res.status(403).json("unauthenticated user!")
        }
    })
}


const verifyAndAdmin =(req,res,next) =>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin ){
            next()
        }else{
            res.status(403).json("unauthenticated user!")
        }
    })
}

export {verifyToken, verifyAndAuth, verifyAndAdmin }