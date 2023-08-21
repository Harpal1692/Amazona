const  Jwt = require("jsonwebtoken");

class Authentication{
    async Orderauth(req,res,next){
        try {
            const {token} = req.headers
            // console.log(token);
            if (!token) {
                return res.status(401).send({message:"Unauthorized"})
            }
            return Jwt.verify(token,process.env.JWT_SECRATE,(error,data)=>{

                if (data) {
                    req.body.userinfo = data
                    return next()
                }
                if (error) {
                    console.log(error);
                    return res.status(401).send({message:"Unauthorized"})
                }
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send({message:"Internal server error"})
        }

    }
}


const auth = new Authentication()

module.exports = auth