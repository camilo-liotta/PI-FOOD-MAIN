import { connect, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.css';

function SearchBar({onSearch}) {

    //TODO --- Manejo de busqueda
    
    const recipes = useSelector(state => state.allRecipes);

    const [searchText, setSearchText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false)

    const handleInputChange = (event) => {
        
        const value = event.target.value;
        setSearchText(value);
        setShowSuggestions(value !== '');

        if(searchText === '') {
            setShowSuggestions(false);
        }

        const filtered = recipes.filter((recipe) => 
            recipe.name.toUpperCase().includes(value.toUpperCase())
        );

        setSuggestions(filtered);

    };

    const handleSuggestionClick = (recipe) => {
        setSearchText('');
        setSuggestions([]);
        setShowSuggestions(false);
        onSearch(recipe);

    }

    const handleEnterPress = (event) => {

        if(event.key  === 'Enter') {

            if (suggestions.length > 0) {
                handleSuggestionClick(suggestions[0]);
            }

        }

    }

    const handleBuscar = (event) => {

        if (suggestions.length > 0) {
            handleSuggestionClick(suggestions[0]);
        }

    }

    return(

        <div className='SearchBar'>

            <div className='containerSB'>

                
                <div className='input-container'>
                    <input 
                        className='input'
                        type='search'
                        value={searchText}
                        onChange={handleInputChange}
                        onKeyPress={handleEnterPress}
                        placeholder='Find a recipe'
                    />

                    <button className='search-button' onClick={handleBuscar} disabled={suggestions.length === 0} >Search</button>

                    <ul className={`suggestion-list ${showSuggestions ? 'showSuggestions' : ''}`}>
                        {suggestions.map((recipe, index) => (
                            <li className='suggestionItem' key={index} onClick={() => handleSuggestionClick(recipe)}>
                                {recipe.name.toUpperCase()}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <Link to='/createRecipe'>
                        <button className='create-button' > Create your own recipes! </button>
                    </Link>
                </div>

                <div>
                    <Link to='/'>
                        <button className='search-button' > LogOut </button>
                    </Link>
                </div>

            </div>

        </div>


    )

}

const mapStateToProps = (state) => {
    return {
        allDiets: state.allDiets,
        allRecipes: state.allRecipes
    }
};



export default connect (
    mapStateToProps
) (SearchBar);