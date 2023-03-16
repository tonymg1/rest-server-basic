const {response, request} = require('express')

const usersGet = (req = request, res = response)=> {
    const {q, name = 'No name', apiKey, page = 1, limit} = req.query;
    res.json({
        msg: 'Get',
        q,
        name,
        apiKey,
        page,
        limit
    });
  }
const usersPost = (req, res)=> {
    const {name, year} = req.body;
    res.json({
        msg: 'post',
        name, 
        year
    });
  }
const usersPut = (req, res)=> {
    const {userId} = req.params;
    res.json({
        msg: 'Put',
        userId
    });
  }
const usersPatch = (req, res)=> {
    res.json('controller');
  }
const usersDelete = (req, res)=> {
    res.json('controller');
  }
  module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
  }