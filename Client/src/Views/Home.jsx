import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTheme } from '../Context/ThemeContext'
import RecipeCard from './RecipeCard'
import { useGetUserID } from '../hooks/useGetUserID';

const Home = () => {
    const { isDarkMode, toggleDarkMode } = useTheme()
    const [recipes, setRecipes] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    //monawath search kle nttn searchTerm eka "" welane thiyenne.include wldi string always true eka nisa meka true wenw
    //ex==> "Chicken Kottu".includes("") --> true
    const searchedRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes?page=${page}&limit=3`);
                setRecipes(response.data.response)
                setTotalPages(response.data.totalPages)
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecipe()
    }, [page])

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

                {/* Pagination */}
                <div className=' flex items-center justify-center mt-7'>
                    {[...Array(totalPages)].map((_, i) => (
                        <button key={i} className='bg-gray-950 cursor-pointer p-1 me-1 border border-gray-200 backdrop-blur-sm text-white' onClick={() => setPage(i + 1)}>
                            {i + 1}
                        </button>
                    ))}

                    {/* Array(totalPages)-->Creates an empty array with totalPages length.
                    _ → current value (we don't need it)
                    i → index number (0,1,2,3...)
                    */}
                </div>
            </div>
        </div>
    )
}

export default Home