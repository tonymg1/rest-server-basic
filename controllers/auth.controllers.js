const response = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generatorJWT } = require('../helpers/generator-jwt');
const {googleVerify} = require('../helpers/google-verify');
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

const googleSignIn = async (req, res = response)=>{
    const {id_token} = req.body;

    try {
        const {email, name, img} = await googleVerify(id_token);
        
        let user = await User.findOne({correo})
        if(!user){
            //create user
            const data = {
                name,
                email,
                password: ':P',
                img, 
                google: true,
            };
            usuario = new User(data)
            await usuario.save();
        }

        if(!user.state){
            return res.status(401).json({
                msg: 'Contact with the administrator, banned user'
            });
        }
         //Generar el JWT
        const token = await generatorJWT(user.id);
    
        res.json({
           user,
           token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token could not be verified'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}
