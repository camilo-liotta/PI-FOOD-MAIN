import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllRecipes, getAllDiets } from './redux/actions'

//Imports de estilo y componentes:
import './App.css';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Error from './components/Error/Error';


function App() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    
    dispatch(getAllRecipes());
    dispatch(getAllDiets());

  }, [dispatch]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
        
//         const response = await axios.get('http://localhost:3001/recipes')
//         setRecipes(response.data);

//       } catch (error) {
//         throw new Error('Error al obtener las recetas ' + error.message);
//       }
//     };

//     fetchRecipes();
// }, []);


  const [selectedRepcipe, setSelectedRecipe] = useState(null);

  const handleRecipeSearch = (recipe) => {
    setSelectedRecipe(recipe);

    navigate(`/details/${recipe.id}`);


  }

  const {pathname} = useLocation();

  return (
    <div className="App">

      {
        pathname === "/" ? null : <NavBar onSearch={handleRecipeSearch} />
      }

      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path="/details/:id" element={<Detail/>}></Route>
        <Route path='/createRecipe' element={<Form/>}></Route>
        <Route path='/error' element={<Error/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
