const booksData = []; // Empty array to store books data

// Function to dynamically fetch books from books.json
async function fetchBooksData() {
  try {
    const response = await fetch('books.json');
    const data = await response.json();
    booksData.push(...data);
    displayBooks();
  } catch (error) {
    console.error('Error fetching books data:', error);
  }
}

// Function to dynamically display books on the Home page
function displayBooks() {
  const bookContainer = document.getElementById('bookContainer');
  bookContainer.innerHTML = '';

  booksData.forEach(book => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${book.coverImage}" class="card-img-top" alt="${book.title}">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">Author: ${book.author}</p>
        <p class="card-text">Price: $${book.price}</p>
        <button onclick="addToCart('${book.title}', ${book.price})" class="btn btn-primary">Add to Cart</button>
        <button onclick="viewCart()" class="btn btn-success">View Cart</button>
      </div>
    `;
    bookContainer.appendChild(card);
  });
}

// Function to add a book to the cart
function addToCart(title, price) {
  const existingItem = cart.find(item => item.title === title);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ title, price, quantity: 1 });
  }

  updateCart();
}

// Function to update the cart and payment receipt
function updateCart() {
  const cartTableBody = document.getElementById('cartTableBody');
  cartTableBody.innerHTML = '';

  cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.title}</td>
      <td>$${item.price}</td>
      <td>${item.quantity}</td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <button onclick="increaseQuantity('${item.title}')" class="btn btn-secondary">+</button>
        <button onclick="decreaseQuantity('${item.title}')" class="btn btn-secondary">-</button>
        <button onclick="removeFromCart('${item.title}')" class="btn btn-danger">Remove</button>
      </td>
    `;
    cartTableBody.appendChild(row);
  });

  totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
}

// Function to increase quantity
function increaseQuantity(title) {
  const item = cart.find(item => item.title === title);
  if (item) {
    item.quantity += 1;
    updateCart();
  }
}

// Function to decrease quantity
function decreaseQuantity(title) {
  const item = cart.find(item => item.title === title);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    updateCart();
  }
}

// Function to remove an item from the cart
function removeFromCart(title) {
  cart = cart.filter(item => item.title !== title);
  updateCart();
}

// Function to view the cart
function viewCart() {
 
  alert('Implement view cart functionality here');
}

// Initialize by fetching books data and displaying books on the Home page
fetchBooksData();



 cart = [];













 





























