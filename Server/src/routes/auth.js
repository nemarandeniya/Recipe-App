import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js';
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router();

router.post("/register", async (req, res) => {

    try {
        const { username, password } = req.body

        const user = await UserModel.findOne({ username });
        if (user) {
            return res.status(401).json({ success: false, message: "User already exists!" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new UserModel({
            username,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        res.status(201).json({ savedUser, success: true, message: "User Registered Successfully" })
        console.log(savedUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await UserModel.findOne({ username })
        if (!user) {
            return res.status(401).json({ success: false, message: "User Not Exists!" })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "Wrong Credentials!" })
        }

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, { expiresIn: "24h" })

        res.status(200).json({ success: true, message: "Login Successfully", token, userId: user._id })
    } catch (error) {

    }
})



export default router;