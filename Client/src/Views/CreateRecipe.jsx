import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from "react-toastify";
import { useTheme } from '../Context/ThemeContext'
import { useGetUserID } from '../hooks/useGetUserID';

const CreateRecipe = () => {

    const { isDarkMode, toggleDarkMode } = useTheme()
    const userID = useGetUserID()


    const initialRecipeState = {
        name: "",
        ingrediants: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID
    };
    const [recipe, setRecipe] = useState(initialRecipeState);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes", recipe)
            setRecipe(initialRecipeState)
            toast.success("Recipe Created Successfully!")
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value })
    }

    const handleIngredientChange = (e, index) => {
        const { value } = e.target;
        const UpdatedIngredients = recipe.ingrediants
        UpdatedIngredients[index] = value;
        setRecipe({ ...recipe, ingrediants: UpdatedIngredients })
    }

    const addIngrediants = async (e) => {
        setRecipe({ ...recipe, ingrediants: [...recipe.ingrediants, ""] })
        console.log(recipe);

    }

    return (
        <div className={`flex justify-center items-center min-h-screen ${isDarkMode
            ? "bg-gray-950 text-white"
            : "bg-gray-50 text-gray-900"
            }`}>

            <div className={`w-[60%] p-16 mt-7 rounded-2xl border ${isDarkMode
                ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                }`}>
                <h2 className='text-3xl flex justify-center mb-4'>Create Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className='block text-gray-700'>Name</label>
                        <input
                            type='text'
                            name='name'
                            value={recipe.name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2  border ${isDarkMode
                                ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                                : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                                }`}
                            placeholder='Enter Name'
                        />
                    </div>
                    <div className="mb-10">
                        <label className='block text-gray-700 '>Ingredients</label>
                        {recipe.ingrediants.map((ingrediant, index) => (
                            <input
                                key={index}
                                type='text'
                                name='ingrediants'
                                className={`max-w-full px-3 py-2  border ${isDarkMode
                                    ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                                    : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                                    }`}
                                value={ingrediant}
                                onChange={(e) => handleIngredientChange(e, index)}
                            />
                        ))}
                        <motion.button
                            onClick={addIngrediants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type='button'
                            className={`p-2 w-full rounded-sm text-white bg-blue-500`}
                        >
                            Add Ingredient
                        </motion.button>
                    </div>
                    <div className="mb-10">
                        <label className='block text-gray-700 '>Instructions</label>
                        <textarea
                            name='instructions'
                            onChange={handleChange}
                            value={recipe.instructions}
                            className={`w-full px-3 py-2 border ${isDarkMode
                                ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                                : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                                }`}
                            placeholder='Enter Instructions'
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="mb-4">
                            <label className='block text-gray-700'>Image URL</label>
                            <input
                                name='imageUrl'
                                value={recipe.imageUrl}
                                onChange={handleChange}
                                type='text'
                                className={`w-full px-3 py-2  border ${isDarkMode
                                    ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                                    : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                                    }`}
                                placeholder='Add Image'
                            />
                        </div>
                        <div className="mb-4">
                            <label className='block text-gray-700'>Cooking Time (minutes)</label>
                            <input
                                name='cookingTime'
                                value={recipe.cookingTime}
                                onChange={handleChange}
                                type='number'
                                className={`w-full px-3 py-2  border ${isDarkMode
                                    ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                                    : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                                    }`}
                                placeholder='Add Cooking TIme'
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type='submit'
                            className={`p-2 w-full rounded-sm text-white bg-blue-500`}
                        >
                            Add Recipe
                        </motion.button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateRecipe