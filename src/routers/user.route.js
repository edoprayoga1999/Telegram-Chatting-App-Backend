const express = require('express');
const router = express.Router();
const { listUser, updateProfile, myProfile, userProfile, updatePhoto } = require('../controllers/user.controller');
const jwtAuth = require('../middleware/jwtAuth');
const upload = require('../middleware/upload');

router
	.get('/user/list', jwtAuth, listUser)
	.put('/user/update', jwtAuth, updateProfile)
	.put('/user/update/photo', jwtAuth, upload, updatePhoto)
	.get('/user/profile', jwtAuth, myProfile)
	.get('/user/profile/:id', jwtAuth, userProfile);
module.exports = router;
