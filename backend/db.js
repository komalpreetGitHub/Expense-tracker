const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Expenses_tracker")
    .then(() => {
        console.log("mongodb connected")
    })


const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String
})


const user = mongoose.model("user", userSchema)



const expenseSchema = new mongoose.Schema({
    userId: String,
    title: String,
    date:Date,
    money: Number,
   
})
const Expense = mongoose.model("expense", expenseSchema)

module.exports = { user,Expense };