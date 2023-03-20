const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');

const usersGet = async (req = request, res = response)=> {
  const {limit = 5, from= 0} = req.query;
  const query = {state: true};

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(from))
      .limit(Number(limit))
  ]);
    res.json({
     total, 
     users
    });
  }
const usersPost = async (req, res)=> {
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role})

    const salt = bcryptjs.genSaltSync();
    user.password =  bcryptjs.hashSync(password, salt);
    
    await usuario.save();

    res.json({
       user
    });

  
  }
const usersPut = async (req, res)=> {
   const {id} = req.params;
   const {_id, password, google, email, ...rest} = req.body;

   if(password){
    const salt = bcryptjs.genSaltSync();
    res.password = bcryptjs.hashSync(password, salt);
   }

   const user = await User.findByIdAndUpdate(id, rest);

    res.json(user);
  }
const usersPatch = (req, res)=> {
    res.json('controller');
  }
const usersDelete = async (req, res)=> {
  const {id} = req.params;
  const user = await User.findByIdAndUpdate(id, {state: false})
    res.json('controller');
  }
  module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
  }