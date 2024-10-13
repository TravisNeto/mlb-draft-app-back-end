const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
console.log('registeruser')
  try {
    const hashedPassword = bcrypt.hashSync(password);
console.log('hashedpassword', hashedPassword)
    const newUser = await User.create({ username, password: hashedPassword, email });
    console.log('newuser', newUser)
    // await newUser.save();
console.log('savenewuser')
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log('token', token)
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('team');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch user details', details: err });
  }
};


module.exports = { registerUser, loginUser, getUserDetails }
