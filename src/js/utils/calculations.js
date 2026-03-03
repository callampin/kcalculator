import { IMC_CATEGORIES, CALORIE_LIMITS } from './constants.js';

/**
 * Calcula la Tasa Metabólica Basal usando la fórmula de Mifflin-St Jeor
 * @param {string} sexo - 'hombre' o 'mujer'
 * @param {number} peso - Peso en kg
 * @param {number} altura - Altura en cm
 * @param {number} edad - Edad en años
 * @returns {number} TMB en kcal
 */
export function calcularTMB(sexo, peso, altura, edad) {
  if (sexo === 'hombre') {
    return (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
  }
  return (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
}

/**
 * Calcula las calorías de mantenimiento
 * @param {number} tmb - Tasa Metabólica Basal
 * @param {number} actividad - Factor de actividad física
 * @returns {number} Calorías de mantenimiento
 */
export function calcularMantenimiento(tmb, actividad) {
  return tmb * actividad;
}

/**
 * Calcula las calorías diarias para alcanzar el objetivo
 * @param {number} mantenimiento - Calorías de mantenimiento
 * @param {number} deficit - Déficit calórico deseado
 * @returns {number} Calorías a consumir
 */
export function calcularConsumo(mantenimiento, deficit) {
  return mantenimiento - deficit;
}

/**
 * Calcula la velocidad de pérdida de peso
 * @param {number} deficit - Déficit calórico semanal
 * @returns {number} Kg por semana
 */
export function calcularVelocidad(deficit) {
  return deficit === 550 ? 0.5 : 1;
}

/**
 * Calcula el tiempo estimado para alcanzar el peso meta
 * @param {number} pesoActual - Peso actual en kg
 * @param {number} pesoMeta - Peso objetivo en kg
 * @param {number} velocidad - Velocidad de pérdida en kg/semana
 * @returns {object} Semanas y meses necesarios
 */
export function calcularTiempo(pesoActual, pesoMeta, velocidad) {
  const semanas = (pesoActual - pesoMeta) / velocidad;
  const meses = semanas / 4.35;
  return {
    semanas: Math.max(0, semanas),
    meses: Math.max(0, meses)
  };
}

/**
 * Calcula el Índice de Masa Corporal
 * @param {number} peso - Peso en kg
 * @param {number} altura - Altura en cm
 * @returns {number} IMC
 */
export function calcularIMC(peso, altura) {
  const alturaMetros = altura / 100;
  return peso / (alturaMetros * alturaMetros);
}

/**
 * Obtiene la categoría de IMC
 * @param {number} imc - Índice de Masa Corporal
 * @returns {object} Objeto con label, shortLabel y rango
 */
export function getCategoriaIMC(imc) {
  const categoria = IMC_CATEGORIES.find(cat => imc >= cat.min && imc <= cat.max);
  return categoria || IMC_CATEGORIES[3]; // Default a "Normal"
}

/**
 * Calcula el peso mínimo aceptable según la altura
 * @param {number} altura - Altura en cm
 * @returns {number} Peso mínimo aceptable
 */
export function calcularPesoMinimo(altura) {
  return altura - 115;
}

/**
 * Valida que el peso meta sea saludable
 * @param {number} pesoMeta - Peso objetivo en kg
 * @param {number} altura - Altura en cm
 * @returns {boolean} true si es válido
 */
export function validarPesoMeta(pesoMeta, altura) {
  const pesoMinimo = calcularPesoMinimo(altura);
  return pesoMeta >= pesoMinimo;
}

/**
 * Genera el mensaje de warning si las calorías son muy bajas
 * @param {string} sexo - 'hombre' o 'mujer'
 * @param {number} kcalConsumir - Calorías diarias calculadas
 * @returns {string|null} Mensaje de warning o null
 */
export function getWarningCalorias(sexo, kcalConsumir) {
  const limit = sexo === 'hombre' ? CALORIE_LIMITS.men : CALORIE_LIMITS.women;
  
  if (sexo === 'hombre' && kcalConsumir < limit.min) {
    return limit.message;
  }
  if (sexo === 'mujer' && kcalConsumir < limit.min) {
    return limit.message;
  }
  return null;
}

/**
 * Calcula la posición del marcador en la barra de IMC (0-100%)
 * @param {number} imc - Índice de Masa Corporal
 * @returns {number} Porcentaje para posicionar el marcador
 */
export function getPosicionBarraIMC(imc) {
  const minIMC = 15;
  const maxIMC = 40;
  const clampedIMC = Math.max(minIMC, Math.min(maxIMC, imc));
  return ((clampedIMC - minIMC) / (maxIMC - minIMC)) * 100;
}

/**
 * Función principal que ejecuta todos los cálculos
 * @param {object} data - Objeto con todos los datos del formulario
 * @returns {object} Objeto con todos los resultados
 */
export function calcularTodo(data) {
  const { sexo, edad, altura, pesoActual, pesoMeta, actividad, deficit } = data;
  
  // Validar peso meta
  if (!validarPesoMeta(pesoMeta, altura)) {
    return {
      error: true,
      message: 'Este peso no es saludable de acuerdo a tu estatura. Por favor reconsidera tus metas.'
    };
  }
  
  // Cálculos principales
  const tmb = calcularTMB(sexo, pesoActual, altura, edad);
  const mantenimiento = calcularMantenimiento(tmb, actividad);
  const consumo = calcularConsumo(mantenimiento, deficit);
  const velocidad = calcularVelocidad(deficit);
  const tiempo = calcularTiempo(pesoActual, pesoMeta, velocidad);
  const imc = calcularIMC(pesoActual, altura);
  const categoriaIMC = getCategoriaIMC(imc);
  const warning = getWarningCalorias(sexo, consumo);
  
  return {
    error: false,
    kcalMantenimiento: Math.round(mantenimiento),
    kcalConsumir: Math.round(consumo),
    tiempoMeses: tiempo.meses.toFixed(1),
    imc: imc.toFixed(1),
    categoriaIMC: categoriaIMC,
    warning,
    posicionBarra: getPosicionBarraIMC(imc)
  };
}
