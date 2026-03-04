import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTheme } from '../Context/ThemeContext'
import { motion } from "framer-motion";
import { useGetUserID } from '../hooks/useGetUserID';
import { FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify'

const SaveRecipe = () => {
    const { isDarkMode, toggleDarkMode } = useTheme()
    const [savedRecipes, setSavedRecipes] = useState([])
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const userID = useGetUserID()

    const removeRecipe = async (recipeID) => {
        try {
            await axios.post("http://localhost:3001/recipes/removerecipe", {
                userId: userID,
                recipeID
            })
            setSavedRecipes(prev => prev.filter(recipe => recipe._id !== recipeID))
            setSelectedRecipe(null)
            fetchSavedRecipe()
            toast.success("recipe removed successfully")

        } catch (error) {
            console.error(error)
        }
    }


    const fetchSavedRecipe = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
            console.log(response.data.savedRecipes);

            setSavedRecipes(response.data.savedRecipes);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchSavedRecipe()
    }, [])

    return (
        <div>
            <div className={`min-h-screen transition-all duration-500 pt-24${isDarkMode
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}>
                <h2 className='text-4xl pt-24 flex justify-center mb-4'>Recipes</h2>
                {savedRecipes.length === 0 ? (
                    <p className='text-center dark:text-gray-300'>You have not Saved any recipes yet</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedRecipes.map((savedrecipe) => (
                            <>
                                {/* card */}
                                <div key={savedrecipe._id}
                                    onClick={() => setSelectedRecipe(savedrecipe)}
                                    className={`max-w-sm p-7 ms-7 cursor-pointer rounded-xl  overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border ${isDarkMode
                                        ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                                        : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                                        }`}
                                >
                                    <img src={savedrecipe.imageUrl}
                                        alt={savedrecipe.name}
                                        className='w-full h-48 object-cover'
                                    />
                                    <div className="p-3 text-center  bg-white dark:bg-gray-800">
                                        <h3 className='text-xl font-sans mb-2'>{savedrecipe.name}</h3>
                                        <p className='text-gray-700 dark:text-gray-300 '>
                                            Cooking Time:{savedrecipe.cookingTime}
                                        </p>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                )}
                {/* Modal */}
                {selectedRecipe && (
                    <div className="fixed w-full p-105 inset-0 z-50 flex items-center justify-center bg-black/50  max-h-[80vh] overflow-y-auto">
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
                                onClick={() => setSelectedRecipe(null)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                            >
                                ✕
                            </button>
                            <div className="flex w-full justify-between">
                                <h2 className="text-2xl font-bold mt-4 mb-4">{selectedRecipe.name}</h2>
                                <button onClick={() => removeRecipe(selectedRecipe._id)} className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition">
                                    <FaTrash size={20} />
                                </button>

                            </div>
                            <img
                                src={selectedRecipe.imageUrl}
                                alt={selectedRecipe.name}
                                className="w-full h-24 object-cover mb-4 rounded-lg"
                            />
                            <p className="mb-2">
                                <strong>Cooking Time:</strong> {selectedRecipe.cookingTime} min
                            </p>
                            <p className="mb-2">
                                <strong>Ingredients:</strong>
                            </p>
                            <ul className="list-disc list-inside mb-4">
                                {selectedRecipe.ingrediants.map((ing, idx) => (
                                    <li key={idx}>{ing}</li>
                                ))}
                            </ul>
                            <p>
                                <strong>Instructions:</strong>
                            </p>
                            <p>{selectedRecipe.instructions}</p>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SaveRecipe