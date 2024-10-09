const express = require ('express')
const router = express.Router()
const { registerUser, loginUser, getUserDetails } = require('../controllers/users.js');
const auth = require('../middleware/verify-token.js');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/user', auth, getUserDetails);

module.exports = router;