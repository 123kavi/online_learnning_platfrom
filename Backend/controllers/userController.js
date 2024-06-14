const bcrypt = require('bcryptjs');
const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findAll();
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send({ error: 'Error fetching user' });
  }
};

const updateUserById = (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;

  if (!id || !username || !role) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  User.updateUser(id, username, role, (err, results) => {
    if (err) return res.status(500).send({ error: 'Error updating user' });
    res.status(200).send({ message: 'User updated successfully' });
  });
};

const createUserAccount = (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  User.createUser(username, hashedPassword, role, (err, results) => {
    if (err) return res.status(500).send({ error: 'Error creating user' });
    res.status(201).send({ message: 'User created successfully' });
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.getUserById(id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send({ error: 'Error fetching user' });
  }
};

const updateUserDetails = (req, res) => {
  const { id, username, role } = req.body;

  if (!id || !username || !role) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  User.updateUser(id, username, role, (err, results) => {
    if (err) return res.status(500).send({ error: 'Error updating user' });
    res.status(200).send({ message: 'User updated successfully' });
  });
};

const removeUser = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send({ error: 'User ID is required' });
  }
  
  User.deleteUser(id, (err, results) => {
    if (err) return res.status(500).send({ error: 'Error deleting user' });
    res.status(200).send({ message: 'User deleted successfully' });
  });
};

module.exports = {  createUserAccount, updateUserDetails, removeUser,getUserById ,updateUserById,getAllUsers};
