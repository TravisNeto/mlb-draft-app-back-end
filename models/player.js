const mongoose = require ('mongoose')


const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    age: { type: Number }
  });


  module.exports = mongoose.model('Player', playerSchema)
  
