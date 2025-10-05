const { get } = require('mongoose');
const incomeModel = require('../models/income-model');
const xlsx = require('xlsx');
const path = require('path'); // Add this at the top

module.exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || icon) {
            return res.status(401).send('All fields are required');
        }

        const incomeCreated = await incomeModel.create({
            userId,
            source,
            amount,
            icon,
            date: new Date(date)
        });

        return res.status(200).json(incomeCreated);
    } catch (error) {
        return res.status(500).send(`Server Error: ${error.message}`);
    }
};
module.exports.getAllIncome= async(req,res)=>{
   try {
     const userId = req.user.id
     const getAll = await incomeModel.find({userId}).sort({date:-1})
     if(!getAll) {return res.status(401).send("Error Occured")}
     else{
        res.send(getAll)
     }
   } catch (error) {
    res.status(401).send(`Server Error : ${error.message}`)
   }
}
module.exports.deleteIncome= async(req,res)=>{
    try {
        const deleteIncome = await incomeModel.findByIdAndDelete(req.params.id)
        if(!deleteIncome) {
            return res.status(402).send('Error Occured')
        }
        else{
            res.send('Income Deleted')
        }
    } catch (error) {
        res.status(404).send(`Server Error : ${error.message}`)
    }
}

module.exports.downloadIncomeExcel = async(res,req)=>{
  //Make Your Route Here 
}