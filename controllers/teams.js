const Team = require('../models/Team');
const User = require('../models/User');

const createTeam = async (req, res) => {
  const { name } = req.body;
  const ownerId = req.user.id;

  try {
    const newTeam = new Team({ name, owner: ownerId });
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

  try {
    const team = await Team.findOne({ owner: req.user.id });
    if (!team) return res.status(404).json({ message: 'Team not found' });

    // Add player to the team
    team.players.push(playerId);
    await team.save();

    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ error: 'Could not add player to team', details: err });
  }
};


module.exports = { createTeam, getTeam, addPlayerToTeam }
