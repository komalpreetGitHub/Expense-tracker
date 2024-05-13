const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const expenseRouter  = require("./routes/expense");

const app = express();
app.use(cors());
app.use(express.json());


//for reg
app.use("/user" , userRouter)


//for expense
app.use("/exp" , expenseRouter)


app.listen(4500, () => {
    console.log("server is running")
})