document.addEventListener("DOMContentLoaded", function () {
	console.log("shopPage.js loaded");

	// Get References
	const productContainer = document.getElementById("product-container");
	const filterSelect = document.getElementById("filter");
	const sortSelect = document.getElementById("sort-select");
	const searchButton = document.getElementById('search-button');
	const searchInput = document.getElementById('search-input');
	const clearButton = document.getElementById('clear-button');
	const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
	const priceCheckboxes = document.querySelectorAll('input[name="price"]');

	
	productContainer.style.minHeight = filterSelect.offsetHeight + 'px';

	/*
				----------------------------- This will be a SQL Statement -----------------------------
				This will need to get every item from the database once loaded, honestly may need to happen
				prior to this so that the home page can have the product carousels 
	*/

	const data = [
		{
			"id": "1",
			"name": "Windows 10 Home Key",
			"price": "$20.00",
			"salePrice": "",
			"image": "winKeyImg.jpg",
			"tags": ["microsoft", "OS"],
			"description": "This is the microsoft key description cir"
		},
		{
			"id": "2",
			"name": "Baldurs Gate 3 (PC) Key",
			"price": "$34.00",
			"salePrice": "",
			"image": "bg3KeyImg.jpg",
			"tags": ["game", "rpg", "open world", "PC"],
			"description": "This is the Baldurs gate key description bis"
			
		},
		{
			"id": "3",
			"name": "Starfield (PC) Key",
			"price": "$38.00",
			"salePrice": "$29.99",
			"image": "stfKeyImg.jpg",
			"tags": ["game", "rpg", "open world", "sale"],
			"description": "This is the Starfield description akq"
			
		},
		{
			"id": "4",
			"name": "Windows 10 Home Key",
			"price": "$20.00",
			"salePrice": "",
			"image": "winKeyImg.jpg",
			"tags": ["microsoft", "OS"],
			"description": "This is the microsoft key description cir"
		},
		{
			"id": "5",
			"name": "Baldurs Gate 3 (PC) Key",
			"price": "$34.00",
			"salePrice": "",
			"image": "bg3KeyImg.jpg",
			"tags": ["game", "rpg", "open world", "PC"],
			"description": "This is the Baldurs gate key description bis"
			
		},
		{
			"id": "6",
			"name": "Starfield (PC) Key",
			"price": "$38.00",
			"salePrice": "$29.99",
			"image": "stfKeyImg.jpg",
			"tags": ["game", "rpg", "open world", "sale"],
			"description": "This is the Starfield description akq"
			
		},
	];

	
	// Temporary loading of data till we have DB
	data.forEach((product) => {
		const card = createProductCard(product);
		productContainer.appendChild(card);
	})
	
	
	// Function to add product cards to the page 
	function createProductCard(product) {
		// Create a new element for the product card
		const cardDiv = document.createElement("div");
		
	
		// Check if there is a sale
		const hasSalePrice = product.salePrice !== "";
		let realPrice = parseFloat(product.price.replace("$", "").split(" - ")[0]);

		// Calculate the sale percentage
		let salePercentage = "";
		if (hasSalePrice) {
			const regularPrice = parseFloat(product.price.replace("$", "").split(" - ")[0]);
			const salePrice = parseFloat(product.salePrice.replace("$", ""));
			const discount = regularPrice - salePrice;
			salePercentage = `${((discount / regularPrice) * 100).toFixed(0)}% Off!`;
			realPrice-=discount;
		}
		
		// Populate the card with product data
		cardDiv.innerHTML = `
			<div class="card h-100" id="${product.id}" card-name="${product.name}" data-categories="${product.tags.join(" ")}" card-description="${product.description}" data-price="${realPrice}">
				<img class="card-img-top" src="../assets/${product.image}" alt="Product Image" />
				<div class="card-body p-4">
					<div class="text-center">
						<h5 class="fw-bolder">${product.name}</h5>
						<p>
							${hasSalePrice
								? `<del>${product.price}</del> ${product.salePrice}`
								: product.price}
						</p>
						${hasSalePrice ? `<p class="text-danger">${salePercentage}</p>` : ""}
					</div>
				</div>
				<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
					<div class="text-center" id="button-container">
						<a id="add-to-cart-button" data-product-id="${product.id}" class="btn btn-primary mb-2"href="#">Add to Cart</a>
						<a class="btn btn-outline-dark" href="../html/product.html?id=${product.id}">View Product</a>
					</div>
				</div>
			</div>
		`;
		return cardDiv;
	}
	
	sortSelect.addEventListener("change", function () {
		filterProducts();
	});
	
	let searchTerm = "";
	
	// Add an event listener for the input field
	searchInput.addEventListener('input', () => {
		if (searchInput.value) {
			// If there's text in the input, show the clear button
			clearButton.style.display = 'block';
		} else {
			// If the input is empty, hide the clear button
			clearButton.style.display = 'none';
		}
	});

	// Function to clear the search input
	function clearSearch() {
		searchInput.value = '';
		clearButton.style.display = 'none';
		// Trigger filter to reset
		searchTerm = searchInput.value.toLowerCase();
		filterProducts();
	}
	// Add an event listener for the clear button to call clearSearch
	clearButton.addEventListener('click', clearSearch);
	
	
	// Search button event listner
	searchButton.addEventListener('click', () => {
		searchTerm = searchInput.value.toLowerCase(); // Convert search term to lowercase for case-insensitive search
		filterProducts();
	});
	
	// Listen for the "keydown" event on the search input field
	searchInput.addEventListener('keyup', (event) => {
		if ((event.key === 'Enter' || event.keyCode === 13) && searchInput === document.activeElement) {
			// Prevent the default form submission behavior
			event.preventDefault();
			
			searchTerm = searchInput.value.toLowerCase();
			filterProducts();
			searchInput.blur();
		}
	});

	// Get reference to the filter checkboxes


	// Event listener for category checkboxes
	categoryCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener("change", function () {
			filterProducts();
		});
	});

	// Event listener for price checkboxes
	priceCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener("change", function () {
			filterProducts();
		});
	});

	const allCards = productContainer.querySelectorAll(".card");

	// Function to filter products based on selected checkboxes
	function filterProducts() {
		

		

		// Get the selected category filters
		const selectedCategories = Array.from(categoryCheckboxes)
			.filter((checkbox) => checkbox.checked)
			.map((checkbox) => checkbox.value);

		// Get the selected price filters
		const selectedPrices = Array.from(priceCheckboxes)
			.filter((checkbox) => checkbox.checked)
			.map((checkbox) => parseFloat(checkbox.value));	

		// Function to check if a product card matches the selected filters
		function productMatchesFilters(card) {
			const cardCategoriesAttribute = card.getAttribute("data-categories");
			if (!cardCategoriesAttribute) {
				// Handle the case where data-categories is missing or empty
				return selectedCategories.length === 0;
			}
			
			
			
			// Check filter conditions
			const cardName = card.getAttribute("card-name");
			const searchTermMatch = searchTerm === "" || cardName.toLowerCase().includes(searchTerm) || card.getAttribute('card-description').toLowerCase().includes(searchTerm);
			
			const cardCategories = cardCategoriesAttribute.split(" ");
			const categoryFilterMatch = selectedCategories.length === 0 || selectedCategories.every((category) => cardCategories.includes(category));
			
			const cardPrice = parseFloat(card.getAttribute("data-price"));
			const priceFilterMatch = selectedPrices.length === 0 || selectedPrices.some((price) => cardPrice <= price );
		
			return categoryFilterMatch && priceFilterMatch && searchTermMatch;
		}
		
		
		
		const visibleCards = [];
		const hiddenCards=[];

		// Apply the filters to each product card
		allCards.forEach((card) => {
			if (productMatchesFilters(card)) {
				if (hiddenCards.includes(card)){
					hiddenCards.remove(card)
					visibleCards.push(card)
				} else {
					visibleCards.push(card);
				}
			} else {
				hiddenCards.push(card);
			}
		});
		

		// Get the sort type
		const sortOption = sortSelect.value;
		// Sort the card list based on the input
		if(sortOption != "default"){
			if (sortOption == "price-low-to-high"){
				visibleCards.sort((a, b)=>{
					const priceA = parseFloat(a.getAttribute('data-price'));
					const priceB = parseFloat(b.getAttribute('data-price'));
					return priceA - priceB
				});
			} else {
				visibleCards.sort((a, b)=>{
					const priceA = parseFloat(a.getAttribute('data-price'));
					const priceB = parseFloat(b.getAttribute('data-price'));
					return priceB - priceA
				});
			}
		}
	
		// Append the visible to the container and remove the hidden cards. Currently has an append as im trying to figure out null conditions
		visibleCards.forEach((card) => productContainer.appendChild(card));
		hiddenCards.forEach((card) => {
			if(productContainer.contains(card)){productContainer.removeChild(card)}
		});

		sessionStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
		sessionStorage.setItem('selectedPrices', JSON.stringify(selectedPrices));
		sessionStorage.setItem('selectedSortMethod', sortOption);
	}
	
	// Load and apply filter selections from sessionStorage
	const savedCategories = JSON.parse(sessionStorage.getItem('selectedCategories'));
	const savedPrices = JSON.parse(sessionStorage.getItem('selectedPrices'));
	const savedSortMethod = sessionStorage.getItem('selectedSortMethod');

	if (savedCategories) {
		// Apply saved category selections to checkboxes
		savedCategories.forEach((category) => {
			const checkbox = document.querySelector(`input[name="category"][value="${category}"]`);
			if (checkbox) {
				checkbox.checked = true;
			}
		});
	}
	if (savedPrices) {
		// Apply saved price selections to checkboxes
		savedPrices.forEach((price) => {
			const checkbox = document.querySelector(`input[name="price"][value="${price}"]`);
			if (checkbox) {
				checkbox.checked = true;
			}
		});
	}
	if (savedSortMethod) {
		sortSelect.value = savedSortMethod;
	}

	// Initial filter when the page loads; its empty, for some reason while loop is needed.
	while (productContainer.firstChild) {
		productContainer.removeChild(productContainer.firstChild);
	}
	filterProducts();

    productContainer.addEventListener("click", function (event) {
		if (event.target.matches('.card-footer #add-to-cart-button')) {
			const addToCartButton = event.target.closest('.card-footer #add-to-cart-button');

			event.preventDefault(); // Prevent the default link behavior
			const productId = addToCartButton.closest('.card').getAttribute('id');

			// Check if the addToCart function is defined in navBarScript.js
        if (typeof window.addToCart === "function") {
            window.addToCart(productId);
        }
	}
    });
});