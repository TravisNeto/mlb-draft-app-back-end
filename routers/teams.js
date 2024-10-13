const express = require ('express')
const router = express.Router()
const { createTeam, getTeam, addPlayerToTeam } = require('../controllers/teams.js');
const auth = require('../middleware/verify-token.js');

router.post('/', auth, createTeam);

router.get('/', auth, getTeam);

router.post('/draft', auth, addPlayerToTeam);

module.exports = router;