const validation = (formData, allRecipes) => {
    const errors = {};

    const isValidUrl = (url) => {
        try {
          new URL(url);         // Si la URL ingresada no es valida esta linea lanza un error
          return true;          // Si la url es valida retorna true
        } catch (error) {
          return false;         // Si lanza un error simplemente retorna false
        }
    };
  
    // Validación de 'name'
    if (!formData.name.trim()) {  // .trim elimina los espacios en blanco lo que previene que no se ingrese nada
      errors.name = 'Name is required.';
    } else if (formData.name.length < 3) {
      errors.name = 'Name must be at least 3 characters.';
    }
  
    // Validación del 'summary'
    if (!formData.summary.trim()) {
      errors.summary = 'Summary is required.';
    } else if (formData.summary.length < 10) {
      errors.summary = 'Summary must be at least 10 characters.';
    }
  
    // Validación del input image
    if (!formData.image.trim()) {
      errors.image = 'Image URL is required.';
    } else if (!isValidUrl(formData.image)) {
      errors.image = 'Please enter a valid URL for the image.';
    }
  
    // Validación de los steps
    if (formData.steps.length === 0) {
      errors.steps = 'At least one step is required.';
    } else {
      formData.steps.forEach((step, index) => {
        if (step.length < 10) {
          errors.steps = `Step ${index + 1} must have at least 10 characters.`;
        } else if (step.length > 350) {
          errors.steps = `Step ${index + 1} must have at most 350 characters.`;
        }
      });
    }
  
    // Validación de las diets
    if (formData.diet.length === 0) {
      errors.diet = 'At least one diet must be selected.';
    }
  
    // Validación de recetas duplicadas
    if (allRecipes.some(recipe => recipe.name.toLowerCase() === formData.name.toLowerCase())) {
      errors.name = 'A recipe with the same name already exists.';
    }
  
    return errors;
  };
  
  export default validation;
  