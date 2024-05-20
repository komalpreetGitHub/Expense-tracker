const express = require("express");
const { Expense } = require("../db");
const Auth = require("../middleware/auth");
const zod = require("zod")

require("dotenv").config();
const expenseRouter = express.Router();

const expensevalidator = zod.object({
    title: zod.string(),
    money: zod.number()
})

//for expense

expenseRouter.post("/addexp", Auth, async (req, res) => {
    const body = req.body;
    console.log(req.userId)
    const success = expensevalidator.safeParse(body)
    if (!success) {
        return res.status(403).json({
            msg: "invalid inputs"
        })
    }

    try {
        const response = await Expense.create({
            userId: req.userId,
            date: body.date,
            title: body.title,
            money: body.money,
        });
        console.log(response)
        return res.json({ msg: "uploading done" });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ msg: "uploading error" });
    }
})



// get all expenses of user

expenseRouter.get("/allexp", Auth, async (req, res) => {

    console.log(req.userId)
    try {
        const response = await Expense.find({
            userId: req.userId
        })
        return res.json({ 
            Expense: response })
    } catch (error) {
        return res.status(403).json({ msg: "error while fetching expenses" })
    }
})


module.exports = expenseRouter;