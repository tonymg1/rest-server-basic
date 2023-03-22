const {request, response} = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model')

const validateJWT = async (req = request, res = response, next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'There is not token at request'
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //READ THE USER CORRESPONDING TO THE UID
        const user = await User.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg : 'Token not valid -user is not on DB'
            })
        }

        //Verify if the state of uid is true
        if(!user.state){
            return res.status(401).json({
                msg : 'Token not valid -user with state -false'
            })
        }

        req.user = user;
 

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token not valid'
        })
    }
}

module.exports = {
validateJWT
}