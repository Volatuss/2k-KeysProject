document.addEventListener("DOMContentLoaded", function () {    
    // Get the product ID from the URL query parameter
	const urlParams = new URLSearchParams(window.location.search);
	const productId = urlParams.get("id");

	var addToCartButton = document.getElementById("addbtn");


    addToCartButton.addEventListener("click", function () {
		window.addToCart(productId);
    });

	// Fetch the product data from the database Once we have a db
	// Temporary data here for testing
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
	];

    
    if (productId) {
        fetchProductDetails(productId);
    }

    function fetchProductDetails(id) {

        const product = data.find((item) => item.id === id);

        if (product) {
            // Update the product details on the product.html page
            updateProductDetailsPage(product);
        } else {
            // Handle the case when the product is not found (e.g., display an error message)
            console.log("Product not found");
        }
    }

    function updateProductDetailsPage(product) {
        // Update the product banner image, name, description, and price
        document.getElementById("product-banner").src = `../assets/${product.image}`;
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-price").textContent = product.price;
	}

});