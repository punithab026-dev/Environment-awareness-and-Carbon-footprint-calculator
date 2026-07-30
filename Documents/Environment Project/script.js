/* =========================================================
   ENVIRONMENTAL AWARENESS & CARBON FOOTPRINT CALCULATOR
   script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     ELEMENT REFERENCES
  --------------------------------------------------- */
  const form = document.getElementById('calculatorForm');
  const distanceInput = document.getElementById('distance');
  const electricityInput = document.getElementById('electricity');
  const foodSelect = document.getElementById('food');
  const plasticSelect = document.getElementById('plastic');

  const loader = document.getElementById('loader');
  const resultSection = document.getElementById('resultSection');
  const resultValue = document.getElementById('resultValue');
  const resultBadge = document.getElementById('resultBadge');
  const resultLabel = document.getElementById('resultLabel');
  const progressBarFill = document.getElementById('progressBarFill');

  const transportValueEl = document.getElementById('transportValue');
  const electricityValueEl = document.getElementById('electricityValue');
  const foodValueEl = document.getElementById('foodValue');
  const plasticValueEl = document.getElementById('plasticValue');

  const suggestionsList = document.getElementById('suggestionsList');
  const suggestionsTitle = document.getElementById('suggestionsTitle');

  const resetBtn = document.getElementById('resetBtn');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  let emissionsChart = null; // Holds the Chart.js instance

  /* ---------------------------------------------------
     CALCULATION FUNCTIONS
     Each factor is calculated separately for clarity
  --------------------------------------------------- */

  // Transportation emissions = distance (km) x 0.21
  function calculateTransport(distance) {
    return distance * 0.21;
  }

  // Electricity emissions = units x 0.82
  function calculateElectricity(units) {
    return units * 0.82;
  }

  // Food emissions: Vegetarian = 2, Non Vegetarian = 5
  function calculateFood(foodType) {
    return foodType === 'veg' ? 2 : 5;
  }

  // Plastic emissions: No Plastic = 0, 1-3 items = 1, More than 3 = 2
  function calculatePlastic(plasticUsage) {
    if (plasticUsage === 'none') return 0;
    if (plasticUsage === 'low') return 1;
    if (plasticUsage === 'high') return 2;
    return 0;
  }

  // Total footprint = sum of all four categories
  function calculateTotal(transport, electricity, food, plastic) {
    return transport + electricity + food + plastic;
  }

  /* ---------------------------------------------------
     INPUT VALIDATION
  --------------------------------------------------- */
  function validateInputs(distance, electricity, food, plastic) {
    let isValid = true;

    // Clear old error states first
    clearErrors();

    if (isNaN(distance) || distance < 0 || distanceInput.value.trim() === '') {
      showError(distanceInput, 'distanceError', 'Please enter a valid distance (0 or more).');
      isValid = false;
    }

    if (isNaN(electricity) || electricity < 0 || electricityInput.value.trim() === '') {
      showError(electricityInput, 'electricityError', 'Please enter valid electricity usage (0 or more).');
      isValid = false;
    }

    if (!food) {
      showError(foodSelect, 'foodError', 'Please select your food preference.');
      isValid = false;
    }

    if (!plastic) {
      showError(plasticSelect, 'plasticError', 'Please select your plastic usage.');
      isValid = false;
    }

    return isValid;
  }

  function showError(field, errorId, message) {
    field.closest('.form-group').classList.add('invalid');
    document.getElementById(errorId).textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll('.form-group').forEach(group => group.classList.remove('invalid'));
    document.querySelectorAll('.error-message').forEach(el => (el.textContent = ''));
  }

  /* ---------------------------------------------------
     DISPLAY RESULT
  --------------------------------------------------- */
  function displayResult(total, transport, electricity, food, plastic) {
    resultValue.textContent = total.toFixed(2);
    transportValueEl.textContent = transport.toFixed(2);
    electricityValueEl.textContent = electricity.toFixed(2);
    foodValueEl.textContent = food.toFixed(2);
    plasticValueEl.textContent = plastic.toFixed(2);

    // Reset badge classes
    resultBadge.classList.remove('moderate', 'high');

    let category;
    if (total < 10) {
      category = 'excellent';
      resultLabel.textContent = 'Excellent';
      resultBadge.querySelector('i').className = 'fa-solid fa-seedling';
    } else if (total <= 20) {
      category = 'moderate';
      resultBadge.classList.add('moderate');
      resultLabel.textContent = 'Moderate';
      resultBadge.querySelector('i').className = 'fa-solid fa-triangle-exclamation';
    } else {
      category = 'high';
      resultBadge.classList.add('high');
      resultLabel.textContent = 'High';
      resultBadge.querySelector('i').className = 'fa-solid fa-fire';
    }

    resultSection.classList.add('active');
    return category;
  }

  /* ---------------------------------------------------
     PROGRESS BAR
  --------------------------------------------------- */
  function updateProgressBar(total) {
    // Scale so that 30+ kg CO2/day fills the bar completely
    const maxScale = 30;
    let percent = (total / maxScale) * 100;
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;

    let color = 'var(--success)';
    if (total > 20) {
      color = 'var(--danger)';
    } else if (total > 10) {
      color = 'var(--warning)';
    }

    // Slight delay so the CSS transition is visible
    progressBarFill.style.width = '0%';
    requestAnimationFrame(() => {
      setTimeout(() => {
        progressBarFill.style.background = color;
        progressBarFill.style.width = percent + '%';
      }, 60);
    });
  }

  /* ---------------------------------------------------
     SUGGESTIONS
  --------------------------------------------------- */
  function displaySuggestions(category) {
    suggestionsList.innerHTML = '';

    const highTips = [
      'Use Public Transport',
      'Reduce Electricity Usage',
      'Avoid Plastic',
      'Plant Trees',
      'Use Renewable Energy',
      'Walk or Ride Bicycle'
    ];

    const lowTips = [
      'Great Job!',
      'Keep Saving Nature',
      'Continue Eco-friendly Habits'
    ];

    const moderateTips = [
      'Try Carpooling or Public Transport',
      'Switch Off Unused Appliances',
      'Limit Single-Use Plastic',
      'Add More Plant-Based Meals'
    ];

    let tips;
    if (category === 'high') {
      suggestionsTitle.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Ways to Reduce Your Impact';
      tips = highTips;
    } else if (category === 'moderate') {
      suggestionsTitle.innerHTML = '<i class="fa-solid fa-lightbulb"></i> Tips to Improve Further';
      tips = moderateTips;
    } else {
      suggestionsTitle.innerHTML = '<i class="fa-solid fa-seedling"></i> Keep Up the Great Work';
      tips = lowTips;
    }

    tips.forEach(tip => {
      const li = document.createElement('li');
      li.textContent = tip;
      suggestionsList.appendChild(li);
    });
  }

  /* ---------------------------------------------------
     CHART.JS BAR CHART
  --------------------------------------------------- */
  function updateChart(transport, electricity, food, plastic) {
    const ctx = document.getElementById('emissionsChart');

    const chartData = {
      labels: ['Transportation', 'Electricity', 'Food', 'Plastic'],
      datasets: [{
        label: 'kg CO₂ / day',
        data: [transport, electricity, food, plastic],
        backgroundColor: ['#2E7D32', '#66BB6A', '#81C784', '#A5D6A7'],
        borderRadius: 8,
        maxBarThickness: 60
      }]
    };

    if (emissionsChart) {
      emissionsChart.data = chartData;
      emissionsChart.update();
      return;
    }

    emissionsChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'kg CO₂ / day' },
            grid: { color: '#E4F2E4' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  /* ---------------------------------------------------
     FORM SUBMIT HANDLER
  --------------------------------------------------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const distance = parseFloat(distanceInput.value);
    const electricity = parseFloat(electricityInput.value);
    const food = foodSelect.value;
    const plastic = plasticSelect.value;

    if (!validateInputs(distance, electricity, food, plastic)) {
      return;
    }

    // Show loading animation before displaying the result
    resultSection.classList.remove('active');
    loader.classList.add('active');

    setTimeout(() => {
      const transportEmission = calculateTransport(distance);
      const electricityEmission = calculateElectricity(electricity);
      const foodEmission = calculateFood(food);
      const plasticEmission = calculatePlastic(plastic);
      const total = calculateTotal(transportEmission, electricityEmission, foodEmission, plasticEmission);

      const category = displayResult(total, transportEmission, electricityEmission, foodEmission, plasticEmission);
      updateProgressBar(total);
      displaySuggestions(category);
      updateChart(transportEmission, electricityEmission, foodEmission, plasticEmission);

      loader.classList.remove('active');
      resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1000); // simulated short delay for the loading animation
  });

  /* ---------------------------------------------------
     RESET BUTTON
  --------------------------------------------------- */
  resetBtn.addEventListener('click', () => {
    form.reset();
    clearErrors();
    resultSection.classList.remove('active');
    progressBarFill.style.width = '0%';
  });

  /* ---------------------------------------------------
     RESPONSIVE NAVIGATION
  --------------------------------------------------- */
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* ---------------------------------------------------
     SCROLL TO TOP BUTTON
  --------------------------------------------------- */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------
     FADE-IN ON SCROLL (Intersection Observer)
  --------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));

  /* ---------------------------------------------------
     FOOTER YEAR
  --------------------------------------------------- */
  document.getElementById('currentYear').textContent = new Date().getFullYear();

});
