import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTheme } from '../Context/ThemeContext'
import RecipeCard from './RecipeCard'
import { useGetUserID } from '../hooks/useGetUserID';

const Home = () => {
    const { isDarkMode, toggleDarkMode } = useTheme()
    const [recipes, setRecipes] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    //monawath search kle nttn searchTerm eka "" welane thiyenne.include wldi string always true eka nisa meka true wenw
    //ex==> "Chicken Kottu".includes("") --> true
    const searchedRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data)
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecipe()
    }, [])

    return (
        <div>
            <div className={`min-h-screen transition-all duration-500 pt-24${isDarkMode
                ? "bg-gray-950 text-white"
                : "bg-gray-50 text-gray-900"
                }`}>
                <h2 className='text-4xl pt-24 flex justify-center mb-4'>Recipes</h2>
                <input
                    type='text'
                    placeholder='Search recipes...'
                    className={`w-80 h-9 ms-7 mb-4 p-1 rounded border ${isDarkMode
                        ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                        : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                        }`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                {searchedRecipes.length === 0 ? (
                    <p className='text-center dark:text-gray-300'>No recipes found</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchedRecipes.map((recipe) => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home