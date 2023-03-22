const response = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generatorJWT } = require('../helpers/generator-jwt');
const login = async (req, res = response)=>{
    const {email, password} = req.body;

    try {

        //Verify if the email exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: 'User / Password not correct - email'
            })
        }
        // Check if the user is active in my database
        if(!user.state){
            return res.status(400).json({
                msg: 'User / Password not correct - state: false'
            })
        }
        // Verify password
        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'User / Password not correct - password'
            })
        }
        //Generar el JWT
        const token = await generatorJWT(usuario.id)

        res.json({
           user, 
           token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Contact administrator'
        })
    }
 
}

module.exports = {
    login
}