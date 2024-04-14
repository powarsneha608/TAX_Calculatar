document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('taxForm');
  const modal = document.getElementById('modal');
  const closeButton = document.querySelector('.close');
  const resultDisplay = document.getElementById('result');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const age = document.getElementById('age').value;
    const income = parseFloat(document.getElementById('income').value);
    const deductions = parseFloat(document.getElementById('deductions').value);

    // Reset error icons
    document.querySelectorAll('.error-icon').forEach(icon => icon.style.display = 'none');

    // Validate inputs
    let error = false;
    if (!age) {
      document.getElementById('ageError').style.display = 'block';
      error = true;
    }
    if (isNaN(income)) {
      document.getElementById('incomeError').style.display = 'block';
      error = true;
    }
    if (isNaN(deductions)) {
      document.getElementById('deductionsError').style.display = 'block';
      error = true;
    }

    if (!error) {
      // Calculate tax
      let tax = 0;
      if (income - deductions > 8) {
        if (age === '<40') {
          tax = 0.3 * (income - deductions - 8);
        } else if (age === '>=40 & <60') {
          tax = 0.4 * (income - deductions - 8);
        } else if (age === '>=60') {
          tax = 0.1 * (income - deductions - 8);
        }
      }

      // Display result
      resultDisplay.textContent = `Tax: ${tax.toFixed(2)} Lakhs`;
      modal.style.display = 'block';
    }
  });

  closeButton.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
});
