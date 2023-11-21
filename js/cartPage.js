
document.addEventListener("DOMContentLoaded", function () {

    // NEED TO GET DATA FROM CUSTOMERS DATABASE CART HERE __________________________________________

    const cartItems = [
        { name: 'Item 1', quantity: 2, price: 10 },
        { name: 'Item 2', quantity: 1, price: 20 },
        // Add more items as needed
      ];
    numItems=0;
    
      // Function to calculate total cost
    function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.quantity * item.price;
    });

    const taxRate = 0.0825;
    const tax = total * taxRate;
    const overallTotal = total + tax;

    return { total, tax, overallTotal };
    }
    
    // Function to render cart items and total
    function renderSummary() {
    const cartItemsList = document.getElementById('cart-items-list');
    const totalContainer = document.getElementById('total-container');

    cartItemsList.innerHTML = ''; // Clear existing content

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="cart-item-name">${item.name} <span class="item-quantity">Qty: ${item.quantity}</span></div>
            <div class="item-price">$${(item.quantity * item.price).toFixed(2)}</div>`;
        cartItemsList.appendChild(itemElement);
        numItems = numItems + item.quantity;
        });
        
    
        const { total, tax, overallTotal } = calculateTotal();
    
        totalContainer.innerHTML = `
        <p>Subtotal (${numItems} items): $${total.toFixed(2)}</p>
        <p>Tax (8.25%): $${tax.toFixed(2)}</p>
        <p>Overall Total: $${overallTotal.toFixed(2)}</p>
        `;
    }

    // Call the function to render the summary
    renderSummary();
});