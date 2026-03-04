import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { useTheme } from '../Context/ThemeContext'
import { FaSave } from "react-icons/fa";
import { useGetUserID } from '../hooks/useGetUserID';
import axios from 'axios'
import { toast } from "react-toastify";

const RecipeCard = ({ recipe }) => {

    const [isOpen, setIsOpen] = useState(false)
    const { isDarkMode, toggleDarkMode } = useTheme()
    const userID = useGetUserID()
    const [savedRecipes, setSavedRecipes] = useState([])
    const [isSaved, setIsSaved] = useState(false)

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", {
                recipeId: recipeID,
                userId: userID
            })
            toast.success("Recipe Saved Successfully!")
            setIsSaved(true)
            setIsOpen(false)
            console.log(response);

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (error) {
                console.error(error);
            }
        }
        fetchSavedRecipe()
    }, [])

    return (
        <>
            {/* card */}
            <div
                onClick={() => setIsOpen(true)}
                className={`max-w-sm p-7 ms-7 cursor-pointer rounded-xl  overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border ${isDarkMode
                    ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                    : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                    }`}
            >
                <img src={recipe.imageUrl}
                    alt={recipe.name}
                    className='w-full h-48 object-cover'
                />
                <div className={`p-3 text-center  ${isDarkMode
                    ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                    : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                    }`}>
                    <h3 className='text-xl font-sans mb-2'>{recipe.name}</h3>
                    <p className='text-gray-700 dark:text-gray-300 '>
                        Cooking Time:{recipe.cookingTime}
                    </p>
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed w-full p-[420px] inset-0 z-50 flex items-center justify-center bg-black/50  max-h-[80vh] overflow-y-auto">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className={` ${isDarkMode
                            ? "bg-gray-800/50 border-gray-700 backdrop-blur-lg"
                            : "bg-gray-50/80 border-gray-200 backdrop-blur-lg"
                            } rounded-xl max-w-lg w-full p-6 relative`}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                        >
                            ✕
                        </button>
                        <div className="flex w-full justify-between">
                            <h2 className="text-2xl font-bold mt-4 mb-4">{recipe.name}</h2>
                            {savedRecipes.includes(recipe._id) ? (
                                <button >
                                    Saved
                                </button>
                            ) : (
                                <button onClick={() => saveRecipe(recipe._id)} className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition">
                                    <FaSave size={20} />
                                </button>
                            )}
                        </div>
                        <img
                            src={recipe.imageUrl}
                            alt={recipe.name}
                            className="w-full h-24 object-cover mb-4 rounded-lg"
                        />
                        <p className="mb-2">
                            <strong>Cooking Time:</strong> {recipe.cookingTime} min
                        </p>
                        <p className="mb-2">
                            <strong>Ingredients:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4">
                            {recipe.ingrediants.map((ing, idx) => (
                                <li key={idx}>{ing}</li>
                            ))}
                        </ul>
                        <p>
                            <strong>Instructions:</strong>
                        </p>
                        <p>{recipe.instructions}</p>
                    </motion.div>
                </div>
            )}
        </>
    )
}

export default RecipeCard