/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/

document.addEventListener("DOMContentLoaded", function () {

	const featuredCarousel = document.getElementById('featured-carousel');
	const newArivialsCarousel = document.getElementById('new-carousel');
	const popularCarousel = document.getElementById('popular-carousel');

  const carousels = [featuredCarousel, newArivialsCarousel, popularCarousel];
  const cardWidth = 250; // Adjust the width of your product cards
  const cardMargin = 10; // Adjust the margin between product cards
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
    // Add more products as needed
  ];

  // Populate the carousel with product cards
  function PopulateCarousel(carousel, products){
    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('card');
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
      card.style.margin=`0 10px`;
      card.innerHTML = `
          <div class="card h-100" id="${product.id}" card-name="${product.name}" data-categories="${product.tags.join(" ")}" card-description="${product.description}" data-price="${realPrice}">
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
              <div class="text-center" id="button-container">
                  <a id="add-to-cart-button" data-product-id="${product.id}" class="btn btn-primary mb-2"href="#">Add to Cart</a>
                  <a class="btn btn-outline-dark" href="../html/product.html?id=${product.id}">View Product</a>
              </div>
          </div>
      </div>
      `;
      carousel.appendChild(card);
      const totalWidth = (cardWidth + cardMargin) * products.length;
      carousel.style.width = `${totalWidth}px`;
    });
  }
  // Enable carousel functionality (you may use a library like Slick, Owl Carousel, etc.)
  // Example with vanilla JavaScript:
  let position = 0;

  function handleCarouselNavigation(carousel, direction) {
    const stepSize = (cardWidth + cardMargin);
    let position = parseInt(carousel.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
  
    if (direction === 'next') {
      position -= stepSize;
      console.log(carousel.scrollWidth);
      if (position < -carousel.scrollWidth/2) {
        position = 0;
      }
    } else if (direction === 'prev') {
      position += stepSize;
      if (position > 0) {
        position = -carousel.scrollWidth + carousel.clientWidth;
      }
    }
    
    position = Math.round(position);
    console.log(position);

    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(${position}px)`;
    setTimeout(() => {
      carousel.style.transition = 'none';
    }, 500);
  }

  carousels.forEach(carousel => {
    PopulateCarousel(carousel, data);
  });

  document.getElementById('next-btn-featured').addEventListener('click', function () {
    handleCarouselNavigation(featuredCarousel, 'next');
  });

  document.getElementById('prev-btn-featured').addEventListener('click', function () {
    handleCarouselNavigation(featuredCarousel, 'prev');
  });

  document.getElementById('next-btn-new').addEventListener('click', function () {
    handleCarouselNavigation(newArivialsCarousel, 'next');
  });

  document.getElementById('prev-btn-new').addEventListener('click', function () {
    handleCarouselNavigation(newArivialsCarousel, 'prev');
  });

  document.getElementById('next-btn-popular').addEventListener('click', function () {
    handleCarouselNavigation(popularCarousel, 'next');
  });

  document.getElementById('prev-btn-popular').addEventListener('click', function () {
    handleCarouselNavigation(popularCarousel, 'prev');
  });

});