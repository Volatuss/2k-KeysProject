document.addEventListener('DOMContentLoaded', function () {
    const cartOverlay = document.getElementById('cart-overlay');
    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart');

    cartButton.addEventListener('click', function () {
        toggleCart();
    });

    closeCartButton.addEventListener('click', function () {
        toggleCart();
    });
    

    function toggleCart() {
        // Toggle the cart overlay
        cartOverlay.style.right = cartOverlay.style.right === '0%' ? '-45%' : '0%';

        // Toggle the body class to hide/show the scrollbar
        document.body.classList.toggle('cart-overlay-open');
    }
    
    function updateTotalPrice() {
        // Example logic to update the total price (replace with your own logic)
        const itemTotalElement = event.target.closest('.cart-item').querySelector('.total-price');
        const quantityInput = event.target.parentElement.querySelector('.quantity-input');
        const pricePerItem = 10.00; // Replace with the actual price per item
        const total = parseFloat(quantityInput.value) * pricePerItem;
        itemTotalElement.textContent = total.toFixed(2);
    }
	


    const cartItemsList = document.querySelector('.cart-items-list');
    const cartItems = []; // Array to store cart items and their quantities


    const data = [
		{
			"id": "1",
			"name": "Windows 10 Home Key",
			"price": "$20.00",
			"salePrice": "",
			"image": "winKeyImg.jpg",
			"tags": ["microsoft", "OS"]
		},
		{
			"id": "2",
			"name": "Baldurs Gate 3 (PC) Key",
			"price": "$34.00",
			"salePrice": "",
			"image": "bg3KeyImg.jpg",
			"tags": ["game", "rpg", "open world", "PC"]
			
		},
		{
			"id": "3",
			"name": "Starfield (PC) Key",
			"price": "$38.00",
			"salePrice": "$29.99",
			"image": "stfKeyImg.jpg",
			"tags": ["game", "rpg", "open world", "sale"]
			
		},{
			"id": "7",
			"name": "Windows 10 Home Key",
			"price": "$20.00",
			"salePrice": "",
			"image": "winKeyImg.jpg",
			"tags": ["microsoft", "OS"]
		},
		{
			"id": "8",
			"name": "Baldurs Gate 3 (PC) Key",
			"price": "$34.00",
			"salePrice": "",
			"image": "bg3KeyImg.jpg",
			"tags": ["game", "rpg", "open world", "PC"]
			
		},
		{
			"id": "9",
			"name": "Starfield (PC) Key",
			"price": "$38.00",
			"salePrice": "$29.99",
			"image": "stfKeyImg.jpg",
			"tags": ["game", "rpg", "open world", "sale"]
			
		},{
			"id": "4",
			"name": "Windows 10 Home Key",
			"price": "$20.00",
			"salePrice": "",
			"image": "winKeyImg.jpg",
			"tags": ["microsoft", "OS"]
		},
		{
			"id": "6",
			"name": "Baldurs Gate 3 (PC) Key",
			"price": "$34.00",
			"salePrice": "",
			"image": "bg3KeyImg.jpg",
			"tags": ["game", "rpg", "open world", "PC"]
			
		},
		{
			"id": "3",
			"name": "Starfield (PC) Key",
			"price": "$38.00",
			"salePrice": "$29.99",
			"image": "stfKeyImg.jpg",
			"tags": ["game", "rpg", "open world", "sale"]
			
		},
    ];

    data.forEach(item => {
        addItemToCart({ ...item, quantity: 1 }); // Add a quantity property
    });

    
    function updateCartDisplay() {
		// Clear the current cart display
		cartItemsList.innerHTML = '';

		// Render each item in the cart
		cartItems.forEach(item => {
			// Create a div element to hold the card HTML
			const cardDiv = document.createElement('div');
			cardDiv.innerHTML = getCardHTML(item);

			// Append the new cart item to the cart items list if quantity is greater than 0
			if (item.quantity > 0) {
				cartItemsList.appendChild(cardDiv);
			}
		});
	}

    function getCardHTML(product) {
        const hasSalePrice = product.salePrice !== "";
		let realPrice = parseFloat(product.price.replace("$", "").split(" - ")[0]);

        if (hasSalePrice) {
			const regularPrice = parseFloat(product.price.replace("$", "").split(" - ")[0]);
			const salePrice = parseFloat(product.salePrice.replace("$", ""));
			const discount = regularPrice - salePrice;
			realPrice-=discount;
		}
        
        // HTML structure for the cart item
        return `
        <div class="cart-item">
            <div class="item-image">
                <img src="../assets/${product.image}" alt="${product.name} Image">
            </div>
            <div class="item-details">
                <div class="item-name">
                    ${product.name}
                    <button id="trash-item" class="btn-close" aria-label="Close"></button>
                </div>
                <div class="item-quantity">
					<button class="btn-quantity decrease" data-item-id="${product.id}">-</button>
                	<input type="text" class="quantity-input" value="${product.quantity}" data-item-id="${product.id}">
					<button class="btn-quantity increase" data-item-id="${product.id}">+</button>
				</div>
                <div class="item-total">
                    <span class="price-breakdown">${product.quantity > 1
                        ? `$${realPrice} x ${product.quantity} <span class="total-price">$${(realPrice * product.quantity).toFixed(2)}</span>`
                        : `<span class="total-price">$${(realPrice * product.quantity).toFixed(2)}</span>`
                    }</span>
                </div>
            </div>
        </div>
    `;
    }
	
	
	function decreaseQuantity(itemId) {
        const item = cartItems.find(item => item.id === itemId);
        if (item) {
            item.quantity--;
            updateCartDisplay();
        }
    }

    function increaseQuantity(itemId) {
        const item = cartItems.find(item => item.id === itemId);
        if (item) {
            item.quantity++;
            updateCartDisplay();
        }
    }
	
    
   cartItemsList.addEventListener('click', function (event) {
        const target = event.target;

        // Check if the clicked element is a quantity button
        if (target.classList.contains('btn-quantity')) {
            const itemId = target.getAttribute('data-item-id');

            // Check if it's a decrease or increase button
            if (target.classList.contains('decrease')) {
                decreaseQuantity(itemId);
            } else if (target.classList.contains('increase')) {
                increaseQuantity(itemId);
            }

            // Update the cart display after modifying the quantity
            updateCartDisplay();
        }
    });
	
	// Add an event listener for the input field
	cartItemsList.addEventListener('input', function (event) {
		const target = event.target;

		// Check if the input field is a quantity input
		if (target.classList.contains('quantity-input')) {
			const itemId = target.getAttribute('data-item-id');
			const newQuantity = target.value;

			updateQuantity(itemId, newQuantity);
			updateCartDisplay();
		}
	});

// Update the updateQuantity function
	function updateQuantity(itemId, newQuantity) {
		const item = cartItems.find(item => item.id === itemId);

		if (item) {
			// Update the quantity based on the new input value
			const parsedQuantity = parseInt(newQuantity) || 1; // Use 1 if the input is not a valid number

			if (parsedQuantity > 0) {
				item.quantity = parsedQuantity;
			} else {
				// If the new quantity is 0 or less, show a confirmation dialogue
				showConfirmationDialog(() => {
					// Callback function if the user clicks "OK"
					cartItems.splice(cartItems.indexOf(item), 1);
					updateCartDisplay();
				}, () => {
					// Callback function if the user clicks "Cancel" or closes the dialogue
					item.quantity = 1;
					updateCartDisplay();
				});
			}
		}
	}

	// Function to show a custom confirmation dialog
	function showConfirmationDialog(onOK, onCancel) {
		const confirmation = window.confirm('Are you sure you want to remove this item from the cart?');

		if (confirmation) {
			onOK();
		} else {
			onCancel();
		}
	}

    function addItemToCart(product) {
        const existingCartItem = cartItems.find(cartItem => cartItem.id === product.id);
    
        if (existingCartItem) {
            // If the item is already in the cart, increase its quantity
            existingCartItem.quantity++;
        } else {
            // If the item is not in the cart, add it with quantity 1
            cartItems.push(product);
        }
        // Update the cart display
        updateCartDisplay();
    }


});
    