let cart = [];
let total = 0.00;
loadCartFromLocalStorage();
loadTotalFromLocalStorage();

function addToCart(itemName, itemPrice, quantityChange) {
    // Find if the item already exists in the cart
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        // If the item exists, update the quantity
        existingItem.quantity += quantityChange;
        if (existingItem.quantity <= 0) {
            // If the quantity becomes zero or negative, remove it from the cart
            cart = cart.filter(item => item.name !== itemName);
        }
        // Update the total based on the quantity change
        total += itemPrice * quantityChange;
    } else if (quantityChange > 0) {
        // If the item doesn't exist and the quantity change is positive, add it to the cart
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
        total += itemPrice;
    }

    saveCartToLocalStorage();
    updateCartDisplay();
    saveTotalToLocalStorage();
}
function loadTotalFromLocalStorage() {
    console.log('Loading total from localStorage');
    const savedTotal = localStorage.getItem('total');
    if (savedTotal) {
        total = parseFloat(savedTotal);
    }
}
function clearCartFromLocalStorage() {
    console.log('Clearing cart from localStorage');
    localStorage.removeItem('cart');
    // Optionally, you can also reset the cart data in memory:
    cart = [];
    total = 0.00;
    updateCartDisplay(); // Update the cart display to reflect the cleared cart
}

function saveTotalToLocalStorage() {
    console.log('Saving total to localStorage');
    localStorage.setItem('total', total.toFixed(2));
}
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(listItem);
    });

    cartTotal.textContent = total.toFixed(2);
}

function saveCartToLocalStorage() {
    console.log('Saving cart to localStorage');
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    console.log('Loading cart from localStorage');
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}