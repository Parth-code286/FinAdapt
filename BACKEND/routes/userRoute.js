const express = require('express')

const {
    loginUser,
    registerUser,
    getUserinfo,
    logoutUser,
    uploadPic
} = require('../controllers/authController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const multer = require('../config/multer')


const router = express.Router()

router.post('/login',loginUser);
router.post('/register',registerUser);
router.get('/getUser',isLoggedIn,getUserinfo);
router.get('/logout',logoutUser)
router.post('/upload',isLoggedIn,multer.single("image"),uploadPic)

module.exports = router;

