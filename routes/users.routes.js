const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users.controllers");
const { existEmail, isValidRole, existUserById } = require("../helpers/db-validators");
const { fieldsValidator } = require("../middlewares/fields-validator");

router.get("/", usersGet);
router.post(
  "/",
  [
    check('nombre', 'Name is required').not().isEmpty(),
    check("password", "Password must contain at least 6 characters").isLength({
      min: 6,
    }),
    check("email", "Email is invalid").isEmail(),
    check("email").custom(existEmail),
    check("role").custom(isValidRole),
    fieldsValidator,
  ],
  usersPost
);
router.put("/:id",[
        check('id', 'It is not a valid id').isMongoId(),
        check('id').custom(existUserById),
        check('role').custom(isValidRole ),
        fieldsValidator
], usersPut);
router.patch("/", usersPatch);
router.delete("/id", [
        check('id', 'It is not a valid id').isMongoId(),
        check('id').custom(existUserById),
        fieldsValidator
], usersDelete)

module.exports = router;
