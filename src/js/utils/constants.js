export const ACTIVITY_LEVELS = [
  { value: 1.2, label: 'Poco o ningún ejercicio' },
  { value: 1.375, label: 'Ligero (1-3 días/semana)' },
  { value: 1.55, label: 'Moderado (3-5 días/semana)' },
  { value: 1.725, label: 'Fuerte (6-7 días/semana)' },
  { value: 1.9, label: 'Muy fuerte (2 veces/día)' }
];

export const DEFICIT_OPTIONS = [
  { value: 550, label: '0.5 kg por semana' },
  { value: 1100, label: '1 kg por semana' }
];

export const IMC_CATEGORIES = [
  { min: 0, max: 15.9, label: 'Falta de peso muy grave', shortLabel: 'Muy grave' },
  { min: 16.0, max: 16.9, label: 'Falta de peso grave', shortLabel: 'Grave' },
  { min: 17.0, max: 18.4, label: 'Falta de peso', shortLabel: 'Bajo peso' },
  { min: 18.5, max: 24.9, label: 'Normal', shortLabel: 'Normal' },
  { min: 25.0, max: 29.9, label: 'Sobrepeso', shortLabel: 'Sobrepeso' },
  { min: 30.0, max: 34.9, label: 'Obesidad clase 1', shortLabel: 'Obesidad I' },
  { min: 35.0, max: 39.9, label: 'Obesidad clase 2', shortLabel: 'Obesidad II' },
  { min: 40.0, max: Infinity, label: 'Obesidad clase 3', shortLabel: 'Obesidad III' }
];

export const IMC_RANGES = [
  { value: 15, label: '15' },
  { value: 18.5, label: '18.5' },
  { value: 25, label: '25' },
  { value: 30, label: '30' },
  { value: 40, label: '40' }
];

export const CALORIE_LIMITS = {
  men: { min: 1200, message: 'Se recomienda subir el factor de actividad o dejar el objetivo semanal en 0.5. Recuerda que menos de 1200kcal diarias en hombres puede tener graves consecuencias para la salud como pérdida de masa muscular, bajo nivel de grasa corporal esencial que puede afectar en la producción de hormonas y la regulación de la temperatura corporal, problemas metabólicos, hipoglucemia, puede reducirse la producción de hormonas tiroideas causando hipotiroidismo, depresión y ansiedad, pérdida de concentración y memoria, problemas cardiovasculares, etc.' },
  women: { min: 1500, message: 'Se recomienda subir el factor de actividad o dejar el objetivo semanal en 0.5. Recuerda que menos de 1500kcal diarias en mujeres puede tener graves consecuencias para la salud como disrupción del ciclo menstrual, pérdida de masa muscular, bajo nivel de grasa corporal esencial que puede afectar en la producción de hormonas y la regulación de la temperatura corporal, problemas metabólicos, hipoglucemia, puede reducirse la producción de hormonas tiroideas causando hipotiroidismo, depresión y ansiedad, pérdida de concentración y memoria, problemas cardiovasculares, etc.' }
};
