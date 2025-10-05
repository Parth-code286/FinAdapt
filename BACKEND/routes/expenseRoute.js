const express = require('express') 

const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require('../controllers/expenseController.js')

const {isLoggedIn} = require('../middlewares/isLoggedIn')
const router = express.Router()

router.post('/addexpense',isLoggedIn,addExpense)
router.get('/getallexpense',isLoggedIn,getAllExpense)
router.get('/downloadexpenseexcel',isLoggedIn,downloadExpenseExcel)
router.delete('/:id',isLoggedIn,deleteExpense)

module.exports = router;