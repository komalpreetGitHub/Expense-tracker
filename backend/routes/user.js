const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { user, } = require("../db");
const { sendEmail } = require("./nodemailer");

require("dotenv").config();
const userRouter = express.Router();

const signupValidation = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),

});

//forsignup
userRouter.post("/signup", async (req, res) => {
    const body = req.body;
    const success = signupValidation.safeParse(body);
    console.log(body)

    if (!success) {
        return res.status(403).json({ msg: "data is not valid" })
    }

    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(body.password, salt)
    const check = await user.findOne({
        email: body.email
    })

    if (check) {
        return res.status(403).json({ msg: "email already exist" })
    }
    try {
        const response = await user.create({
            firstname: body.firstname,
            lastname: body.lastname,
            username: body.username,
            email: body.email,
            password: securePass
        });

        const token = jwt.sign(response._id.toHexString(), process.env.SECRET)

        return res.json({
            token: token
        });

    } catch (error) {
        console.log(error)
        return res.json({ msg: "Error while signing up" })
    }

})




//signin api

userRouter.post("/signin", async (req, res) => {
    const body = req.body;
    const success = signupValidation.safeParse(body)

    if (!success) {
        return res.status(411).json({ msg: "invalid inputs" })
    }
    try {
        const check = await user.findOne({
            email: body.email,
        })
        if (!check) {
            return res.status(403).json({ msg: "enter correct email" })
        }
        const passCompare = await bcrypt.compare(body.password, check.password)

        if (passCompare) {
            const token = jwt.sign(check._id.toHexString(), process.env.SECRET);

            return res.json({
                name: check.firstname,
                token: token
            });

        }
        else {
            return res.status(403).json({ error: "password does not match" })
        }

    }
    catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "error while signing in" })
    }

})




//for otp


userRouter.post("/otp", async (req, res) => {
    const body = req.body;

    try {
        const check = await user.findOne({
            email: body.email,
        });

        console.log(check)

        if (!check) {
            return res.status(403).json({ msg: "user not found" })
        }

        sendEmail({email:body.email,
            OTP:body.OTP})
        .then((response) => {return res.send(check.email)})
        .catch((response) => {return res.send(response.msg)})
       
    }
    catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "error " })
    }


})


// change password
userRouter.put("/newpass", async (req, res) => {
    const body = req.body;
  
    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(body.password, salt);
  
    const check = await user.findOne({
      email: body.email
    })
  
    if(check.password === body.password){
      return res.status(403).json({msg: "try new password"})
    }
  
    try {
      const response = await user.updateOne(
        { email: body.email },
        { password: securePass }
      );
      return res.json({ msg: "password updated" });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: "password error" });
    }
  });


 
module.exports = userRouter;