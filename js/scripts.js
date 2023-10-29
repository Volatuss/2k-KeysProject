/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/

document.addEventListener("DOMContentLoaded", function () {
	// Get Reference to the Product Container, which will hold all the items
	const productContainer = document.getElementById("product-container");
	const filterSelect = document.getElementById("filter-select");
	// Fetch the product data from the database Once we have a db
	// Temporary data here for testing
	const data = [
		{
			"name": "Windows Key",
			"price": "$20.00",
			"image": "windowsKey.jpg",
			"tags": ["microsoft product", "operating system"]
		},
		{
			"name": "Baldurs Gate Key",
			"price": "$34.00",
			"image": "bgKey.jpg",
			"tags": ["game", "rpg", "open world"]
			
		},
		{
			"name": "Starfield (PC) Key",
			"price": "$34.00",
			"image": "bgKey.jpg",
			"tags": ["game", "rpg", "open world", "pc", "sale"]
			
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
		cardDiv.className = "col mb-5"
		
		// Populate the card with product data
		cardDiv.innerHTML = `
			<div class="card h-100">
				<img class="card-img-top" src="images/${product.image})" alt="Product Image" />
				<div class="card-body p-4">
					<div class="text-center">
						<h5 class="fw-bolder">${product.name}</h5>
						<p>${product.price}</p>
					</div>
				</div>
				<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
					<div class="text-center">
						<a class="btn btn-outline-dark mt-auto" href="#">View Product</a>
					</div>
				</div>
			</div>
		`;
		
		return cardDiv;
	}
	
	filterSelect.addEventListener("change", function () {
		const selectedTag = filterSelect.value;
		
		productContainer.querySelectorAll(".card").forEach((card) => {
			const cardTags = card.getAttribute("data-tags").split(" ");
			if(selectedTag === "all" || cardTags.includes(selectedTag)) {
				card.style.display = "block";
			} else {
				card.style.display = "none";
			}
		});
	});
});