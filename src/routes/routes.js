const express = require('express');
const {createUser, loginUser} = require("../controllers/userController");
const { storeNews } = require('../controllers/newsController');

const router = express.Router();
router.post('/register',createUser);
router.post('/login',loginUser);
router.post('/soreNews',storeNews)

module.exports = router