const player = require('../models/player.js');
const Team = require('../models/team.js');
const User = require('../models/user.js');

const createTeam = async (req, res) => {
  const name = req.body.name;
  const ownerId = req.user.id;
console.log('name', name)
console.log('owner', ownerId)
console.log('user', req.user)
  try {
    const newTeam = new Team({ teamName: name, owner: ownerId });
    await newTeam.save();

    // Assign team to the user
    await User.findByIdAndUpdate(ownerId, { team: newTeam._id });

    res.status(201).json(newTeam);
  } catch (err) {
    res.status(500).json({ error: 'Could not create team', details: err });
  }
};

const getTeam = async (req, res) => {
  try {
    const team = await Team.findOne({ owner: req.user.id }).populate('players');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch team', details: err });
  }
};

const addPlayerToTeam = async (req, res) => {
  const { playerId } = req.body;
  console.log('add to team')
  try {
    const team = await Team.findOne({ owner: req.user.id });
    console.log('team', team)
    if (!team) return res.status(404).json({ message: 'Team not found' });
    console.log('here')
    // Find a player by name to return a player object  (id)
    const thePlayer = await player.find({ name: req.body.playerId })
    console.log('player', thePlayer)
    // Add a player to the team
    team.players.push(thePlayer._id);
    await team.save();

    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ error: 'Could not add player to team', details: err });
  }
};


module.exports = { createTeam, getTeam, addPlayerToTeam }
