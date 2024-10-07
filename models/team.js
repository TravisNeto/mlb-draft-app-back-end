const teamSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  });


  module.exports = mongoose.model('Team', teamSchema)
  