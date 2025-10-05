const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const incomeRoute = require('./routes/incomeRoute');
const expenseRoute = require('./routes/expenseRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const flash = require('connect-flash')

require('dotenv').config();
const expressSession = require('express-session')

// CORS middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(flash())
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET,//
}))
app.use(express.urlencoded({ extended: true }));

// Connect to DB
connectDB();

// Routes
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/income', incomeRoute);
app.use('/api/v1/expenses', expenseRoute);
app.use('/api/v1/dashboard', dashboardRoute);

app.use('/uploads', express.static('uploads'));

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});