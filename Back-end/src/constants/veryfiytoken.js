const { verify } = require('jsonwebtoken')

require('dotenv').config()

const  verifyToken = (req,res,next)=>{
    const token = req.headers.authorization

    if(token){
        try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = decoded
    next()
            
        } catch (error) {
            res.status(401).json({message : "invalid token !"})
        }
    }
    else{

        res.status(401).json({message : "no token prodvied "})
    }
}

const  verifyTokenAndAuthorization = (req,res,next)=>{


    verifyToken(req ,res , ()=>{
        if (req.user.id !== req.params.id || req.user.isAdmin) {
           next()
            
        }else{
            res.status(403).json({message : "yu are not allowed  "})
        }
        
    })
}
    

const  verifyTokenAdmin = (req,res,next)=>{
    verifyToken(req ,res , ()=>{
        if (req.user.isAdmin) {
            next()
        }else{
         res.status(403).json({message : "yu are not allowed  ,  only Admin can do this !  "})
        }
    })
}








module.exports = { verifyToken , verifyTokenAndAuthorization , verifyTokenAdmin};