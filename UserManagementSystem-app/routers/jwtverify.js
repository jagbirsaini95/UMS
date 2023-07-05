const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const userSchema = require('../schema/schema')
const tokenKey = 'mynameisjagbirsinghiamadeveloper'

async function verifyToken(req, res, next) {
    try {
        // console.log("hello verfy token")
        
        // taking token from cookies
        const token = req.cookies.x
        // console.log(token)
        if (token) {
            const decode = jwt.verify(token, tokenKey, (err, data) => {
                if (err) return new Error(err)
                else return (data)
            })
            // console.log("inside token", decode)
            const user = await userSchema.findOne({ _id: decode._id, 'tokens.token': token })
            if (!user) {
                return res.send('unauthorized token');
            }
            req.token = token
            req.user = user
            // console.log("token verify end");
            next()
        } else
            // cookie not found redirect to login 
            return res.status(402).send('no token found');
    } catch (error) {
        res.status(401).send("uauthorized: token provided")
        // console.log(error);
    }
}
module.exports = verifyToken