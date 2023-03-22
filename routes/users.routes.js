const {Router} = require('express');
const { check } = require('express-validator');
const {usersGet, usersPost, usersPut, usersPatch, usersDelete} = require('../controllers/users.controllers');
const {fieldsValidator, 
  validateJWT,
   isAdminRole, 
   hasRole} = require('../middlewares')
const {isValidRole, existEmail, existUserById} = require('../helpers/db-validators');


const router = Router();

router.get("/", usersGet);

  router.post("/", [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must contain more than 5 characters').isLength({min: 6}),
    check('email', 'Email is required').isEmail(),
    check('email').custom(existEmail),
    check('role').custom(isValidRole),
    fieldsValidator
  ],usersPost)

  router.put("/:id",[
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom( isValidRole),
    fieldsValidator
  ], usersPut);

  router.patch("/", usersPatch);

    
  router.delete("/:id", [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(existUserById),
    fieldsValidator
  ], usersDelete);
module.exports = router;