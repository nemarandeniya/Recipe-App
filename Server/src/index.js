import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import connectDb from './config/db.js'
import auth from './routes/auth.js'
import { recipesRouter } from './routes/recipe.js'

const app = express();

app.use(express.json())
app.use(cors())

app.use("/auth", auth)
app.use("/recipes", recipesRouter)

app.listen(3001, () => {
    connectDb()
    console.log("Server Started")
});
