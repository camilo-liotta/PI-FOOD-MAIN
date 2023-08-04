import { setFilterByDiet, setFilterByOrigin, resetFilters, getAllRecipes, getAllDiets } from '../../redux/actions';
import { connect, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

import './Cards.css';
import Pagination from '../Pagination/Pagination';

function Cards({ allRecipes, filteredRecipes, allDiets, setFilterByDiet, setFilterByOrigin, resetFilters }) {

    //TODO --- Manejo de filtros ---

    const [filterByDiet, setFilterByDietState] = useState('');
    const [filterByOrigin, setFilterByOriginState] = useState('');
    const [orderCards, setOrderState] = useState("true");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRecipes());
        dispatch(getAllDiets());
    }, [getAllDiets, getAllRecipes]);

    useEffect(() => {
        setFilterByDiet(filterByDiet);
    }, [filterByDiet, setFilterByDiet]);

    useEffect(() => {
        setFilterByOrigin(filterByOrigin);
    }, [filterByOrigin, setFilterByOrigin]);

    // useEffect(() => {
    //     setOrderState(orderCards);
    // }, [orderCards]);

    const handleFilterByDiet = (event) => {
        const filterValue = event.target.value;
        setFilterByDiet(filterValue);
    }

    const handleFilterByOrigin = (event) => {
        const filterValue = event.target.value;
        setFilterByOrigin(filterValue);
    }

    const handleResetFilters = () => {
        setFilterByDietState('');
        setFilterByOriginState('');
        setOrderState("true");
        resetFilters();
    };

    const handleOrder = (event) => {
        const orderValue = event.target.value;
        setOrderState(orderValue);
    }

    const recipes = [...(filteredRecipes.length === 0 ? allRecipes : filteredRecipes)].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (orderCards === "true") {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });

    return(

        <div className='Cards' >

            <div className='selectContainer'>
                
                <select className='selects' onChange={handleOrder}>
                    <option value="true">A-Z</option>
                    <option value="false">Z-A</option>
                </select>

                <select className='selects' onChange={handleFilterByOrigin}>
                    <option value="">All</option>
                    <option value="false">API</option>
                    <option value="true">DataBase</option>
                </select>
                

                <select className='selects' onChange={handleFilterByDiet}>
                    <option value="">ALL DIETS</option>
                    {
                        allDiets.map(diet => {
                            return (
                                <option value={diet.name}>{diet.name.toUpperCase()}</option> 
                            )
                        })
                    }
                </select>

                <button onClick={handleResetFilters} >Reset Filters</button>
            </div>

            <div className='cards-organization'>

            {
                <Pagination recipes={recipes}/>
            }

            </div>




        </div>

    )

}

const mapStateToProps = (state) => {
    return {
      allDiets: state.allDiets,
      allRecipes: state.allRecipes,
      filteredRecipes: state.filteredRecipes,
      filterByDiet: state.filterByDiet,
      filterByOrigin: state.filterByOrigin
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        getAllRecipes: () => dispatch(getAllRecipes()),
        getAllDiets: () => dispatch(getAllDiets()),
        setFilterByDiet: (filterValue) => dispatch(setFilterByDiet(filterValue)),
        setFilterByOrigin: (filterValue) => dispatch(setFilterByOrigin(filterValue)),
        resetFilters: () => dispatch(resetFilters()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);