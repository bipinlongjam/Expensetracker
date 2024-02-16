document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
  
    // Load expenses from localStorage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Function to render expenses
    function renderExpenses() {
      expenseList.innerHTML = '';
      expenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <strong>${expense.description}</strong> - ${expense.amount} - ${expense.category}
            </div>
            <div>
              <button type="button" class="btn btn-sm btn-secondary edit-btn" data-index="${index}">Edit</button>
              <button type="button" class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
            </div>
          </div>
        `;
        expenseList.appendChild(listItem);
      });
    }
  
    // Function to handle form submission
    expenseForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const amountInput = document.getElementById('expense-amount');
      const descriptionInput = document.getElementById('expense-description');
      const categoryInput = document.getElementById('expense-category');
      
      const amount = parseFloat(amountInput.value);
      const description = descriptionInput.value.trim();
      const category = categoryInput.value.trim();
  
      if (!amount || !description || !category) {
        alert('Please fill in all fields.');
        return;
      }
  
      const expense = {
        amount,
        description,
        category
      };
  
      expenses.push(expense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
      expenseForm.reset();
    });
  
    // Function to handle expense deletion
    expenseList.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-btn')) {
        const index = parseInt(event.target.getAttribute('data-index'));
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
      }
    });
  
    // Function to handle expense editing
    expenseList.addEventListener('click', function(event) {
      if (event.target.classList.contains('edit-btn')) {
        const index = parseInt(event.target.getAttribute('data-index'));
        const expenseToEdit = expenses[index];
        const newAmount = parseFloat(prompt('Enter new amount:', expenseToEdit.amount));
        const newDescription = prompt('Enter new description:', expenseToEdit.description);
        const newCategory = prompt('Enter new category:', expenseToEdit.category);
  
        if (newAmount && newDescription && newCategory) {
          expenses[index] = {
            amount: newAmount,
            description: newDescription,
            category: newCategory
          };
          localStorage.setItem('expenses', JSON.stringify(expenses));
          renderExpenses();
        } else {
          alert('Invalid input. Please try again.');
        }
      }
    });
  
    // Initial render
    renderExpenses();
  });
  