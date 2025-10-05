const express = require('express');
const router = express.Router();

const {isLoggedIn } = require('../middlewares/isLoggedIn'); // ✅ FIXED
const  {getDashboardData } = require('../controllers/dashboardController');

router.get('/dashboardData', isLoggedIn, getDashboardData);

module.exports = router;