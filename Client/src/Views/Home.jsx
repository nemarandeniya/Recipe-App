import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTheme } from '../Context/ThemeContext'
import RecipeCard from './RecipeCard'
import { useGetUserID } from '../hooks/useGetUserID';

const Home = () => {
    const { isDarkMode, toggleDarkMode } = useTheme()
    const [recipes, setRecipes] = useState([])


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
                {recipes.length === 0 ? (
                    <p className='text-center dark:text-gray-300'>You have not added any recipes yet</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map((recipe) => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home