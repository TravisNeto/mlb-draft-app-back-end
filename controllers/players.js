const Player = require('../models/player.js');

// I need to pull players from API to then add to the created team

const fetchmlbApi = async (req, res) => {
    const response = await fetch(
      process.env.MLB_API
    );
    const data = await response.json();
    console.log('oompa', data)
    res.status(200).json(data.people)
  }

const seedPlayers = async (req, res) => {
  const response = await fetch(
    process.env.MLB_API
  ); 
  const data = await response.json();
  console.log(data)
// loop through the people data
// inside loop, look into players model by mlbId
// if we dont find player, add them to the players database
const MlbPlayer = await data.find({ name: req.body.people })
  res.status(200).json(data.people)
}


const createPlayer = async (req, res) => {
  const { name, position, stats } = req.body;

  try {
    const newPlayer = new Player({ name, position, stats });
    await newPlayer.save();

    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(500).json({ error: 'Could not create player', details: err });
  }
};

const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch players', details: err });
  }
};

const getPlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch player', details: err });
  }
};

const updatePlayer = async (req, res) => {
  const { name, position, stats } = req.body;

  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    player.name = name || player.name;
    player.position = position || player.position;
    player.stats = stats || player.stats;

    await player.save();
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ error: 'Could not update player', details: err });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    await player.remove();
    res.status(200).json({ message: 'Player deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete player', details: err });
  }
};


module.exports = { createPlayer, getAllPlayers, getPlayer, updatePlayer, deletePlayer, fetchmlbApi }
