document.addEventListener('DOMContentLoaded', function () {
	console.log("navBarScripts.js loaded");
    const cartOverlay = document.getElementById('cart-overlay');
    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart');
	const subtotalText = document.getElementById('subtotalText');
	const checkoutButton = document.getElementById('checkout-button');
    const cartItemsList = document.querySelector('.cart-items-list');
    const cartItems = []; // Array to store cart items and their quantities
	const cartBadge = document.getElementById('cart-badge');


	const currentPath = window.location.pathname;
	const containsIndexHtml = currentPath.indexOf("index.html") !== -1;

	// Update the path based on the existence of "index.html"
	const pathPrefix = containsIndexHtml ? '' : '..';
	subtotal = 0;
	totalItems = 0;
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

    window.cartItems.forEach(item => {
        addItemToCart({ ...item, quantity: 1 }); // Add a quantity property
    });

	function showPopupMessage(message) {
		const popupMessage = document.getElementById('popup-message');
		if (popupMessage) {
			popupMessage.textContent = message;
			popupMessage.style.display = 'block';
	  
		  	// Hide the message after 3 seconds (adjust as needed)
		  	setTimeout(() => {
				popupMessage.style.display = 'none';
			}, 3000);
		}
	}
    
    function updateCartDisplay() {
		// Clear the current cart display
		cartItemsList.innerHTML = '';
		subtotal=0;
		totalItems=0;
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
		cartBadge.textContent = totalItems.toString();
		subtotalText.innerHTML = `<strong>Subtotal (${totalItems} items):</strong> $${subtotal.toFixed(2)}`;
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

		totalItems += product.quantity;
        subtotal += realPrice * product.quantity;

		
		

        // HTML structure for the cart item
        return `
        <div class="cart-item">
            <div class="item-image">
                <img src="${pathPrefix}assets/${product.image}" alt="${product.name} Image">
            </div>
            <div class="item-details">
                <div class="item-name">
                    ${product.name}
                    <button id="trash-item" class="btn-close" aria-label="Close"></button>
                </div>
                <div class="item-quantity">
					<button class="btn-quantity decrease" data-item-id="${product.id}">-</button>
                	<input id="qty-input-${product.id}" type="text" class="quantity-input" value="${product.quantity}" data-item-id="${product.id}">
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

	checkoutButton.addEventListener('click', function () {
		// Redirect to the checkout page
		window.location.href = pathPrefix+'html/cartPage.html';
	});

	// ----------------------------- This Use an SQL Statement to grab the item -----------------------------
	function addProductByID(productId){
		item = data.find(item => item.id === productId)
		showPopupMessage("Item Added To Cart");
		addItemToCart(item);
	}
	window.addProductByID = addProductByID;
});



function addToCart(productId) {
	addProductByID(productId);
}