import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiets, postRecipe } from '../../redux/actions';
import { Link } from 'react-router-dom';

import validation from './validations';
import Modal from '../Modal/Modal';
import './Form.css';

export default function Form() {

  const dispatch = useDispatch();

  const allRecipes = useSelector(state => state.allRecipes);
  const allDiets = useSelector(state => state.allDiets);

  const [recipeName, setRecipeName] = useState('');
  const [recipeSummary, setRecipeSummary] = useState('');
  const [recipeHealthScore, setRecipeHealthScore] = useState(0);
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState('');
  const [recipeDiets, setRecipeDiets] = useState('');
  const [errors, setErrors] = useState({})
  const [errorStep, setErrorStep] = useState('')
  const [disabled, setDisabled] = useState(false);
  const [editingStep, setEditingStep] = useState(null);
  const [editingStepIndex, setEditingStepIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    
    dispatch(getAllDiets())

    const validations = validation({
      name: recipeName,
      summary: recipeSummary,
      image: recipeImage,
      steps: recipeSteps,
      diet: recipeDiets
    }, allRecipes)

    setDisabled(isStepButtonDisabled);

    setErrorStep('');
    
    setErrors(validations);

  }, [dispatch, recipeName, recipeSummary, recipeImage, currentStep, recipeSteps, recipeDiets, disabled, errorStep, allRecipes])


  const handleAddStep = () => {
    setRecipeSteps([...recipeSteps, currentStep]);
    setCurrentStep('');
  }

  const isStepButtonDisabled = () => {
    if (currentStep.length < 10) {
      setErrorStep('Minimum characters for the step description: 10 characters');
      setDisabled(true);
    } else if (currentStep.length > 350) {
      setErrorStep('Maximum characters for the step description: 350 characters');
      setDisabled(true);
    } else {
      setErrorStep('');
      setDisabled(false);
    }
  }

  const handleEditStep = (index) => {
    const step = recipeSteps[index];
    setEditingStep(step);
    setCurrentStep(step);
    setEditingStepIndex(index);
  }

  const handleSaveStep = () => {

    if(editingStep && editingStepIndex !== -1) {
      const updatedSteps = [...recipeSteps];
      updatedSteps[editingStepIndex] = currentStep;
      setRecipeSteps(updatedSteps);
      setEditingStep(null);
      setEditingStepIndex(-1);
      setCurrentStep('');
    }

  }

  const handleDeleteStep = (index) => {
    setRecipeSteps((previousSteps) => previousSteps.filter( (_, i) => i !== index) );
  }

  const handleDiets = (event) => {
    if (event.target.checked) {
      setRecipeDiets([...recipeDiets, event.target.value]);
    } else {
      setRecipeDiets(recipeDiets.filter(diet => diet !== event.target.value));
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    const recipeToAdd = {
      name: recipeName,
      summary: recipeSummary,
      image: recipeImage,
      steps: [...recipeSteps],
      healthScore: recipeHealthScore,
      diets: [...recipeDiets]
    }

    try {
      
      setShowModal(true);

      dispatch(postRecipe(recipeToAdd));

      setRecipeName('');

      setRecipeImage('');

      setRecipeSummary('');

      setRecipeSteps([]);

      setCurrentStep('');

      setRecipeHealthScore(0);

      setRecipeDiets([]);

    } catch (error) {
      console.error(error.message);
    }
  }

  const isSubmitButtonEnabled = recipeSteps.length > 0 && Object.keys(errors).length === 0;

  return (
      <div className='container'>
      <div className='login'>
        <form onSubmit={handleSubmit}>
          
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <div>
              <span></span>
              <h1>RECIPE CREATED</h1>
              <Link to='/home'>Return home</Link>
            </div>
          </Modal>

          <div>

            {/* Input del nombre */}
            <label>NAME</label>
            <input 
              type="text"
              name="name"
              placeholder="Enter the name of the recipe"
              value={recipeName}
              onChange={event => setRecipeName(event.target.value)}
              />
            <div className='error'>{errors.name && <span>{errors.name}</span>}</div>
          </div>

          <div>

            {/* Input del nombre */}
            <label>SUMMARY</label>
            <textarea
              name='summary'
              placeholder='Enter a recipe summary'
              value={recipeSummary}
              onChange={event => setRecipeSummary(event.target.value)}
            />
            <div className='error'>{errors.summary && <span>{errors.summary}</span>}</div>
            
          </div>

          <div>

            {/* Input de la imagen */}
            <label>IMAGE</label>
            <input 
              type='text'
              name='image'
              placeholder='Enter the URL of your image'
              onChange={event => setRecipeImage(event.target.value)}
            />
            <div className='error'>{errors.image && <span>{errors.image}</span>}</div>
            
          </div>

          <div>

            {/* Input de los steps */}
            <label>STEPS</label>
            <button 
              className='addStepButton'
              type='button'
              onClick={editingStep ? handleSaveStep : handleAddStep}
              disabled={editingStep || errorStep ? disabled : false}
            >
              {editingStep ? 'Save Step' : 'Add Step'}
            </button>

            {
              editingStep && (
                <button
                  className='cancelButton'
                  type='button'
                  onClick={() => {
                    setEditingStep('');
                    setCurrentStep('');
                  }}
                >
                  Cancel
                </button>
              )
            }
            <div>
              <textarea 
                value={currentStep}
                placeholder='Enter a step'
                onChange={event => {      //Cada vez que se introduce un caracter actualiza el estado del boton, es decir decide si se habilita o no
                  setCurrentStep(event.target.value);
                  isStepButtonDisabled();
                }}
              />
              <div className='error'>{errors.steps && <span>{errors.steps}</span>}</div>
              <div className='error'>{errorStep && <span>{errorStep}</span>}</div>
            </div>
            <ul>
              {
                recipeSteps.map((step, index) => {
                  return (
                    <li key={index}>
                      {index + 1} - {step}
                      <button className='editButton' type='button' onClick={() => handleEditStep(index)}>
                      </button>
                      
                      <button className='deleteButton' type='button' onClick={() => handleDeleteStep(index)} >
                      </button>
                    </li>
                  )
                })
              }
            </ul>
            
          </div>

          <div>

            {/* Input del HealthScore */}
            <label>HEALTH SCORE {recipeHealthScore}</label>
            <div>
              <input 
                type='range'
                name='healthScore'
                value={recipeHealthScore}
                onChange={event => setRecipeHealthScore(event.target.value)}
              />
            </div>

          </div>

          <div>
            {/* Input de las Dietas */}
            <label>DIETS</label>
            <div>
              {allDiets?.map(diet => (
                <label key={diet.name}>
                  <input 
                    type='checkbox'
                    name={diet.name}
                    value={diet.name}
                    onChange={event => handleDiets(event)}
                  />
                  {diet.name.toUpperCase()}
                </label>
              ))}
            </div>
            <div className='error'>{errors.diet && <span>{errors.diet}</span>}</div>


          </div>

          {/* Boton de submit */}
          <button className='boton' type='submit' disabled={!isSubmitButtonEnabled}>SUBMIT</button>
        </form>
      </div>
      <div className='blob' ></div>
    </div>
  )


}