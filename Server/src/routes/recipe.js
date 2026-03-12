import express from "express"
import mongoose from "mongoose"
import { RecipeModel } from "../models/Recipes.js"
import { UserModel } from "../models/Users.js"

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;//limit → number of records per page

        const skip = (page - 1) * limit//skip → skips previous records

        const response = await RecipeModel.find({}).skip(skip).limit(limit)
        const total = await RecipeModel.countDocuments()
        res.json({ response, totalPages: Math.ceil(total / limit), currentPage: page })//totalPages → used by frontend to create page buttons

    } catch (error) {
        res.json(error)
    }
})
router.post("/", async (req, res) => {
    const recipe = new RecipeModel(req.body)
    try {
        const response = await recipe.save()
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

router.put("/", async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeId)
        const user = await UserModel.findById(req.body.userId)
        user.savedRecipes.push(recipe)
        await user.save();
        res.json({ savedRecipes: user.savedRecipes })
    } catch (error) {
        res.json(error)
    }
})

//gets the list of recipe IDs that a specific user has saved.
router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        res.json({ savedRecipes: user?.savedRecipes })
    } catch (error) {
        res.json(error)
    }
})

router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes }
        })
        res.json({ savedRecipes })
    } catch (error) {
        res.json(error)
    }
})

router.post("/removerecipe", async (req, res) => {

    try {
        const { userId, recipeID } = req.body
        const user = await UserModel.findById(userId)
        //each id eka check krnw recipe id ekata samana ndd kiyl
        user.savedRecipes = user.savedRecipes.filter((id) => id.toString() !== recipeID)
        await user.save()
        res.json({ success: true, message: "Recipe removed", user })

    } catch (error) {
        res.status(500).json({ success: false, error: "Could not remove recipe" })

    }
})

export { router as recipesRouter }