let cart = {};

// Function to add product to cart
function addToCart(productName, price) {
  if (!cart[productName]) {
    cart[productName] = { price: price, quantity: 1 };
  } else {
    cart[productName].quantity++;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${productName} added to cart!`);
}

// Function to update the display of cart items
function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  const totalItemsEl = document.getElementById("total-items");

  cartItemsDiv.innerHTML = ""; // Clear previous cart items

  let total = 0;
  let totalItems = 0;
  let count = 1;

  // Check if cart is empty
  if (Object.keys(cart).length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    for (let product in cart) {
      const item = cart[product];
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      totalItems += item.quantity;

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <div class="item-info">
          <span class="item-number">${count++}.</span>
          <div>
            <h3>${product}</h3>
            <p>₹${item.price} × ${item.quantity} = ₹${itemTotal}</p>
          </div>
        </div>
        <div class="item-actions">
          <button onclick="updateQuantity('${product}', -1)" aria-label="Decrease quantity of ${product}">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity('${product}', 1)" aria-label="Increase quantity of ${product}">+</button>
        </div>
      `;
      cartItemsDiv.appendChild(div);
    }
  }

  totalItemsEl.textContent = `Total Items: ${totalItems}`;
  totalPriceEl.textContent = `Total: ₹${total}`;
}

// Function to update the quantity of a product in the cart
function updateQuantity(productName, change) {
  if (cart[productName]) {
    cart[productName].quantity += change;

    if (cart[productName].quantity <= 0) {
      delete cart[productName]; // Remove product if quantity reaches 0
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    updateCartDisplay(); // Refresh the cart display
  }
}

// Initial load function to retrieve cart data from localStorage
window.onload = function () {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }

  if (document.getElementById("cart-items")) {
    updateCartDisplay();
  }
};
