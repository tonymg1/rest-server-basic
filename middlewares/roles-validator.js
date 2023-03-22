const { response } = require("express")


const isAdminRole = (req, res = response, next)=>{
    if(!req.user){
        return res.status(500).json({
            msg: 'You want to verify the without validating the token first'
        });
    }

    const {role, nombre} = req.usuario;
    if(role !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `${nombre} is not a administrator - No permission for this action`
        });

    }

    next();
}

const hasRole = (...roles)=>{
    return (req, res = response, next)=>{
        if(!req.user){
            return res.status(500).json({
                msg: 'You want to verify the without validating the token first'
            });
        }
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `The service requires one of these roles ${roles}`
            })
        }
        next();
    }
}
module.exports = {
    isAdminRole,
    hasRole
}

