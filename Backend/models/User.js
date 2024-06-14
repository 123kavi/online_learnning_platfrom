const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


// Define model methods
User.getAllUsers = async function(callback) {
  try {
    const users = await User.findAll();
    callback(null, users);
  } catch (err) {
    callback(err);
  }
};

User.createUser = async function(username, password, role, callback) {
  try {
    const user = await User.create({ username, password, role });
    callback(null, user);
  } catch (err) {
    callback(err);
  }
};

User.updateUser = async function(id, username, role, callback) {
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.role = role;
      await user.save();
      callback(null, user);
    } else {
      callback('User not found');
    }
  } catch (err) {
    callback(err);
  }
};

User.deleteUser = async function(id, callback) {
  try {
    const result = await User.destroy({ where: { id } });
    if (result === 0) {
      callback('User not found');
    } else {
      callback(null, result);
    }
  } catch (err) {
    callback(err);
  }
};

// Get user by ID
User.getUserById = async function(id) {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (err) {
    throw new Error('Error fetching user by ID');
  }
};

module.exports = User;
