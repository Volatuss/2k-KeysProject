document.addEventListener("DOMContentLoaded", function () {
    const breadcrumb = document.getElementById("breadcrumb");
    const productName = document.getElementById("product-name");

    // Get the product ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
        fetchProductDetails(productId);
    } else {
        breadcrumb.innerHTML = 'Home <span class="separator">> </span> All Products';
    }

    function fetchProductDetails(id) {
        if (productId === "all-products") {
            breadcrumb.innerHTML = 'Home <span class="separator">> </span> All Products';
            sessionStorage.clear(); // Clear all session storage
            return;
        }

        // Fetch product details and set breadcrumb to the product name
        // ...

        const previousBreadcrumb = sessionStorage.getItem("breadcrumb");
        const breadcrumbTrail = [productName.textContent];

        if (previousBreadcrumb) {
            breadcrumbTrail.push(...previousBreadcrumb.split('<span class="separator">> </span>'));
        }

        const updatedBreadcrumb = breadcrumbTrail.join('<span class="separator">> </span>');

        breadcrumb.innerHTML = updatedBreadcrumb;
        sessionStorage.setItem("breadcrumb", updatedBreadcrumb);
    }
});
