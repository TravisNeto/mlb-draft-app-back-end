const express = require ('express')
const router = express.Router()
const { createPlayer, getAllPlayers, getPlayer, updatePlayer, deletePlayer, fetchmlbApi } = require('../controllers/players.js');
const auth = require('../middleware/verify-token.js');

router.post('/player', auth, createPlayer);

router.get('/players', getAllPlayers);

router.get('/api/players', fetchmlbApi);

router.get('/player/:id', getPlayer);

router.put('/player/:id', auth, updatePlayer);

router.delete('/player/:id', auth, deletePlayer);


module.exports = router;