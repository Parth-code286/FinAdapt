const path = require('path'); // Add this at the top
const { get } = require('mongoose');
const expenseModel = require('../models/expense-model')
const xlsx = require('xlsx');

module.exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || icon) {
            return res.status(401).send('All fields are required');
        }

        const ExpenseCreated = await expenseModel.create({
            userId,
            category,
            amount,
            icon,
            date: new Date(date)
        });

        return res.status(200).send(ExpenseCreated);
    } catch (error) {
        return res.status(500).send(`Server Error: ${error.message}`);
    }
};
module.exports.getAllExpense= async(req,res)=>{
   try {
     const userId = req.user.id
     const getAll = await expenseModel.find({userId}).sort({date:-1})
     if(!getAll) {return res.status(401).send("Error Occured")}
     else{
        res.send(getAll)
     }
   } catch (error) {
    res.status(401).send(`Server Error : ${error.message}`)
   }
}
module.exports.deleteExpense= async(req,res)=>{
    try {
        const deleteExpense = await expenseModel.findByIdAndDelete(req.params.id)
        if(!deleteExpense) {
            return res.status(402).send('Error Occured')
        }
        else{
            res.send('Expense Deleted')
        }
    } catch (error) {
        res.status(404).send(`Server Error : ${error.message}`)
    }
}

module.exports.downloadExpenseExcel = async(res,req)=>{
  //Make Your Route Here 
}