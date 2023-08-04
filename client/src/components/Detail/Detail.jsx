import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Error from '../Error/Error';
import './Detail.css';

export default function Details() {
   
    var {id} = useParams();
    
    const [recipe, setRecipe] = useState({});
    const [isValidID, setIsValidID] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {

          try {
            const response = await axios.get(`http://localhost:3001/recipes/${id}`);
            const data = response.data;
    
            if (data.name) {
              setRecipe(data);
              setIsValidID(true); // Establece el estado como válido cuando se encuentra una receta válida
            } else {
              setIsValidID(false); // Establece el estado como no válido cuando no se encuentra la receta
            }
          } catch (error) {
            setIsValidID(false); // Establece el estado como no válido en caso de error (404 u otros errores)
            console.error('Error al obtener la receta:', error);
          }
        };

        fetchRecipe();

    }, [id]);
   

    if ( !isValidID ) {
        return (
            <div>
                <Error/>
            </div>
        );
    }

   
    return (
        <div className='Details'>
        
            <div>
                <h1>{recipe.name}</h1>
            </div>

            <div className='container'>
                <div className='infoContainer'>

                    <div className='imageContainer' >
                        <img src={recipe.image} alt={recipe.name} />
                    </div>

                    <div className='healthScore'>
                        <h2 className='propiedad' id='scoreTitle' >HealthScore</h2><h2 className='number'>{recipe.healthScore}</h2>
                    </div>

                    <article>
                        <h2 className='propiedad'>Steps</h2>
                        <div className='step-container'>
                            {
                                recipe.steps?.map(step => {
                                    return (<h3 className='step'>{step}</h3>)
                                })
                            }
                        </div>
                        {/* <h2 className='selfprop'>{recipe.steps}</h2> */}
                    </article>
                </div>
                <div className='summary-container'>
                    <article>
                        <h2 className='propiedad'>Summary</h2>
                        <h2 className='selfprop'>{recipe.summary}</h2>
                    </article>
                </div>
            </div>

        </div>
    );
}