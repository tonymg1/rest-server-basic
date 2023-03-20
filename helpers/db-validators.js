const Role = require('../models/role.model');
const User = require('../models/user.model');

const isValidRole = async (role = '')=>{
    const existRole = await Role.findOne({role});
    if (!existRole){
        throw new Error (`${role} is not registered`)
    }
}

const existEmail = async(email='')=>{
    const emailExist = await User.findOne({email});
    if (emailExist){
        throw new Error (`${email} is already registered`);
    }
}

const existUserById = async(id = '')=>{
    const existUser = await User.findById(id);
    if(!existUser){
        throw new Error(`${id} is already registered`)
    }
}
module.exports = {
    isValidRole,
    existEmail,
    existUserById
}