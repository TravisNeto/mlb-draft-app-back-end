const express = require ('express')
const router = express.Router()
const { createTeam, getTeam, addPlayerToTeam } = require('../controllers/teams.js');
const auth = require('../middleware/verify-token.js');

router.post('/team', auth, createTeam);

router.get('/team', auth, getTeam);

router.post('/team/draft', auth, addPlayerToTeam);

module.exports = router;