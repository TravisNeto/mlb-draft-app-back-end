const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    stats: {
      avg: Number,
      hr: Number,
      rbi: Number,
    },
  });


  module.exports = mongoose.model('Player', playerSchema)
  
