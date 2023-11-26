(function () {
    if (!window.products) {
      fetchProducts();
  
      function fetchProducts() {
        const apiUrl = 'http://ec2-3-145-126-187.us-east-2.compute.amazonaws.com:3000/products';
  
        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(fetchedProducts => {
            window.products = fetchedProducts;
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
      }
    }
  })();

  (function () {
    if (!window.cartItems) {
      fetchCartItems();
  
      function fetchCartItems() {
        const apiUrl = 'http://ec2-3-145-126-187.us-east-2.compute.amazonaws.com:3000/cart';
  
        fetch(apiUrl, {
          method: 'GET',
          credentials: 'include', // Include credentials for session information
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(fetchedCartItems => {
            window.cartItems = fetchedCartItems; // Store cart items in the global window object
          })
          .catch(error => {
            console.error('Error fetching cart items:', error);
          });
      }
    }
  })();