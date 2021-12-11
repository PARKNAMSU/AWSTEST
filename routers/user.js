const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const user = new UserController();

router.put('/create',user.create);

router.post('/login/:email',user.login);

module.exports = router;