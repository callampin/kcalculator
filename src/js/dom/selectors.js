export const elements = {
  form: document.getElementById('calculatorForm'),
  resultsContainer: document.getElementById('resultsContainer'),
  resetBtn: document.getElementById('resetBtn'),
  
  // Inputs
  sexo: document.getElementById('sexo'),
  edad: document.getElementById('edad'),
  altura: document.getElementById('altura'),
  pesoActual: document.getElementById('pesoActual'),
  pesoMeta: document.getElementById('pesoMeta'),
  actividad: document.getElementById('actividad'),
  deficit: document.getElementById('deficit'),
  
  // Results
  kcalConsumir: document.getElementById('kcalConsumir'),
  kcalMantenimiento: document.getElementById('kcalMantenimiento'),
  tiempoMeta: document.getElementById('tiempoMeta'),
  imcNumber: document.getElementById('imcNumber'),
  imcCategory: document.getElementById('imcCategory'),
  imcBarFill: document.getElementById('imcBarFill'),
  imcMarker: document.getElementById('imcMarker'),
  imcTable: document.getElementById('imcTable'),
  
  // Warnings
  warningBanner: document.getElementById('warningBanner'),
  warningText: document.getElementById('warningText')
};

export function getFormData() {
  return {
    sexo: elements.sexo.value,
    edad: parseFloat(elements.edad.value),
    altura: parseFloat(elements.altura.value),
    pesoActual: parseFloat(elements.pesoActual.value),
    pesoMeta: parseFloat(elements.pesoMeta.value),
    actividad: parseFloat(elements.actividad.value),
    deficit: parseFloat(elements.deficit.value)
  };
}
