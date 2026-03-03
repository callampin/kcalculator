import { elements, getFormData } from './dom/selectors.js';
import { calcularTodo } from './utils/calculations.js';
import { IMC_CATEGORIES } from './utils/constants.js';

class CalculatorApp {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderIMCTable();
    this.animateEntrance();
  }

  bindEvents() {
    elements.form.addEventListener('submit', this.handleSubmit.bind(this));
    elements.resetBtn.addEventListener('click', this.handleReset.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const data = getFormData();
    const resultados = calcularTodo(data);
    
    if (resultados.error) {
      this.mostrarError(resultados.message);
      return;
    }
    
    this.mostrarResultados(resultados);
  }

  handleReset() {
    elements.form.reset();
    elements.resultsContainer.hidden = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  mostrarError(mensaje) {
    elements.warningBanner.hidden = false;
    elements.warningText.textContent = mensaje;
    elements.resultsContainer.hidden = false;
    this.ocultarDatosResultados();
  }

  ocultarDatosResultados() {
    elements.kcalConsumir.textContent = '—';
    elements.kcalMantenimiento.textContent = '—';
    elements.tiempoMeta.textContent = '—';
    elements.imcNumber.textContent = '—';
    elements.imcCategory.textContent = '—';
    elements.imcMarker.style.left = '0%';
    elements.warningBanner.hidden = true;
  }

  mostrarResultados(resultados) {
    // Mostrar contenedor con animación
    elements.resultsContainer.hidden = false;
    elements.resultsContainer.style.animation = 'none';
    elements.resultsContainer.offsetHeight; // Trigger reflow
    elements.resultsContainer.style.animation = 'fadeSlideUp 0.5s ease forwards';
    
    // Actualizar métricas
    this.animarNumero(elements.kcalConsumir, resultados.kcalConsumir);
    this.animarNumero(elements.kcalMantenimiento, resultados.kcalMantenimiento);
    elements.tiempoMeta.textContent = resultados.tiempoMeses;
    
    // Actualizar IMC
    elements.imcNumber.textContent = resultados.imc;
    elements.imcCategory.textContent = resultados.categoriaIMC.shortLabel;
    
    // Animar barra de IMC
    setTimeout(() => {
      elements.imcMarker.style.left = `${resultados.posicionBarra}%`;
    }, 100);
    
    // Resaltar categoría activa en la tabla
    this.resaltarCategoriaActiva(resultados.categoriaIMC);
    
    // Mostrar/ocultar warning
    if (resultados.warning) {
      elements.warningBanner.hidden = false;
      elements.warningText.textContent = resultados.warning;
    } else {
      elements.warningBanner.hidden = true;
    }
    
    // Scroll suave a resultados
    setTimeout(() => {
      elements.resultsContainer.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  }

  renderIMCTable() {
    const html = IMC_CATEGORIES.map(cat => {
      const maxLabel = cat.max === Infinity ? '40+' : cat.max;
      return `
        <div class="imc-table-row" data-category="${cat.label}">
          <span class="category">${cat.label}</span>
          <span class="range">${cat.min} - ${maxLabel}</span>
        </div>
      `;
    }).join('');
    
    elements.imcTable.innerHTML = html;
  }

  resaltarCategoriaActiva(categoriaActiva) {
    const rows = elements.imcTable.querySelectorAll('.imc-table-row');
    rows.forEach(row => {
      if (row.dataset.category === categoriaActiva.label) {
        row.classList.add('active');
      } else {
        row.classList.remove('active');
      }
    });
  }

  animarNumero(elemento, valorFinal) {
    const duracion = 800;
    const inicio = 0;
    const inicioTiempo = performance.now();
    
    const animate = (tiempoActual) => {
      const tiempoTranscurrido = tiempoActual - inicioTiempo;
      const progreso = Math.min(tiempoTranscurrido / duracion, 1);
      
      // Easing ease-out
      const easeOut = 1 - Math.pow(1 - progreso, 3);
      const valorActual = Math.round(inicio + (valorFinal - inicio) * easeOut);
      
      elemento.textContent = valorActual.toLocaleString();
      
      if (progreso < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  animateEntrance() {
    const formCard = document.querySelector('.calculator__card');
    if (formCard) {
      formCard.style.opacity = '0';
      formCard.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        formCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        formCard.style.opacity = '1';
        formCard.style.transform = 'translateY(0)';
      }, 100);
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new CalculatorApp();
});
