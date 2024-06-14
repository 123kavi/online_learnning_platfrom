const express = require('express');
const router = express.Router();
const { getUsers, createUserAccount, updateUserDetails, removeUser, getUserById, updateUserById, getAllUsers } = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, adminMiddleware, getAllUsers);
router.get('/:id', authMiddleware, adminMiddleware, getUserById);
router.post('/', authMiddleware, adminMiddleware, createUserAccount);
router.put('/', authMiddleware, adminMiddleware, updateUserDetails);
router.put('/:id', authMiddleware, adminMiddleware, updateUserById);
router.delete('/', authMiddleware, adminMiddleware, removeUser);

module.exports = router;
