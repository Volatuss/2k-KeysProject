/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/

document.addEventListener("DOMContentLoaded", function () {
	// Get Reference to the Product Container, which will hold all the items
	const productContainer = document.getElementById("product-container");
	const filterSelect = document.getElementById("filter-select");
	// Get the product ID from the URL query parameter
	const urlParams = new URLSearchParams(window.location.search);
	const productId = urlParams.get("id");

	// Fetch the product data from the database Once we have a db
	// Temporary data here for testing
	const data = [
		{
			"id": "1",
			"name": "Windows 10 Home Key",
			"price": "$20.00",
			"salePrice": "",
			"image": "winKeyImg.jpg",
			"tags": ["microsoft product", "operating system"]
		},
		{
			"id": "2",
			"name": "Baldurs Gate 3 (PC) Key",
			"price": "$34.00",
			"salePrice": "",
			"image": "bg3KeyImg.jpg",
			"tags": ["game", "rpg", "open world"]
			
		},
		{
			"id": "3",
			"name": "Starfield (PC) Key",
			"price": "$38.00",
			"salePrice": "$29.99",
			"image": "stfKeyImg.jpg",
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


		
		// Check if there is a sale
		const hasSalePrice = product.salePrice !== "";

		// Calculate the sale percentage
		let salePercentage = "";
		if (hasSalePrice) {
			const regularPrice = parseFloat(product.price.replace("$", "").split(" - ")[0]);
			const salePrice = parseFloat(product.salePrice.replace("$", ""));
			const discount = regularPrice - salePrice;
			salePercentage = `${((discount / regularPrice) * 100).toFixed(0)}% Off!`;
		}
		// Populate the card with product data
		cardDiv.innerHTML = `
			<div class="card h-100">
				<img class="card-img-top" src="assets/${product.image}" alt="Product Image" />
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
					<div class="text-center">
						<a class="btn btn-outline-dark mt-auto" href="html/product.html?id=${product.id}">View Product</a>
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