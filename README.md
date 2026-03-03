# Calculadora de Déficit Calórico

Una calculadora web para planificar tu pérdida de peso de forma saludable. Calcula tus necesidades calóricas diarias, estima el tiempo para alcanzar tu peso objetivo y muestra tu Índice de Masa Corporal (IMC) con contexto visual.

## Funcionalidad

### Calcula lo siguiente:

- **Tasa Metabólica Basal (TMB)** — Usando la fórmula de Mifflin-St Jeor
- **Calorías de mantenimiento** — Según tu nivel de actividad física
- **Calorías diarias recomendadas** — Para lograr tu déficit personalizado
- **Tiempo estimado** — Meses necesarios para alcanzar tu peso meta
- **Índice de Masa Corporal** — Con categorización visual y tabla de referencia

### Características:

- Validación de peso mínimo saludable según estatura
- Alertas cuando las calorías recomendadas están por debajo de umbrales seguros (1200 kcal hombres, 1500 kcal mujeres)
- Visualización gráfica de la posición del IMC en la escala
- Diseño totalmente responsivo

## Historia

Este proyecto nació en 2023 como una calculadora básica en HTML/CSS/JS para uso personal. Después de más de 2 años sin mantenimiento —el código original databa de 2023 y había sido abandonado— fue completamente **refactorizado desde cero** en 2026, manteniendo intacta toda la lógica de negocio original pero con un frontend moderno, diseño consistente y mejor experiencia de usuario.

## Cómo usar

Simplemente abre `index.html` en tu navegador. No requiere instalación ni servidor.

```bash
# Opción 1: Abrir directamente
open index.html

# Opción 2: Servidor local con Python
python -m http.server 8000

# Opción 3: Servidor local con Node
npx serve .
```

## Datos que necesitas

| Campo | Descripción |
|-------|-------------|
| Sexo | Hombre / Mujer |
| Edad | Años |
| Altura | Centímetros |
| Peso actual | Kilogramos |
| Peso meta | Kilogramos |
| Nivel de actividad | Factor de 1.2 a 1.9 |
| Déficit semanal | 0.5 kg o 1 kg por semana |

## Notas

- Esta calculadora es para fines informativos generales
- Consulta siempre a un profesional de la salud antes de iniciar cualquier plan nutricional
- Los cálculos son estimaciones basadas en fórmulas estándar; individualiza según tu contexto
