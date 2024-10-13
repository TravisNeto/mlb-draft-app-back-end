const mongoose = require ('mongoose')

const teamSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  });


  module.exports = mongoose.model('Team', teamSchema)
  