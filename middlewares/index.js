const validFields = require('../middlewares/fields-validator');
const validJWT = require('../middlewares/jwt-validator');
const validRoles = require('../middlewares/roles-validator.js');

module.exports = {
    ...validFields,
    ...validJWT,
    ...validRoles
}