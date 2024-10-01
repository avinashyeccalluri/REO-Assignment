// Function to load CSS
function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.head.appendChild(link);
}

// Function to load JS
function loadJS(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

// Load Slick Carousel CSS and JS
loadCSS('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css');
loadCSS('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css');
loadJS('https://code.jquery.com/jquery-3.6.0.min.js', function() {
    loadJS('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', initSlick);
});

// Your existing functions
function addRecentlyViewed(product) {
    const viewedProducts = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    console.log('the event called')
    if (!viewedProducts.some(item => item.id === product.id)) {
        viewedProducts.push(product);
        localStorage.setItem('recentlyViewed', JSON.stringify(viewedProducts));
    }
}

function createRecentlyViewedSection() {
    const viewedProducts = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    if (viewedProducts.length === 0) return;

    const section = document.createElement('div');
		section.id = 'recently-viewed-section';
		section.innerHTML = '<h2>Recently Viewed Products</h2>';
		
		const productContainer = document.createElement('div');
		productContainer.className = 'product-container';
		
		viewedProducts.forEach(product => {
		    const productCard = document.createElement('div');
		    productCard.className = 'product-card';
		    productCard.innerHTML = `
		        <a href="${product.link}">
		            <img src="${product.imageUrl}" alt="${product.title}">
		            <p class="product-title">${product.title}</p>
		            <p class="product-price">Rs.${product.actualPrice.replace('.', '')}</p>
		        </a>`;
		    productContainer.appendChild(productCard);
		});

section.appendChild(productContainer);
    section.appendChild(productContainer);
    const footerElement = document.getElementById('navFooter');
    if (footerElement) {
        footerElement.insertAdjacentElement('beforebegin', section);
    } else {
        document.querySelector('footer').insertAdjacentElement('beforebegin', section);
    }

    // Initialize Slick Carousel
    // $(document).ready(function() {
    //     $('.product-container').slick({
    //         dots: true,
    //         infinite: false,
    //         speed: 300,
    //         slidesToShow: 5,
    //         slidesToScroll: 4,
    //         responsive: [{
    //                 breakpoint: 1440,
    //                 settings: {
    //                     slidesToShow: 5,
    //                     slidesToScroll: 1
    //                 }
    //             },
    //             {
    //                 breakpoint: 960,
    //                 settings: {
    //                     slidesToShow: 4,
    //                     slidesToScroll: 1
    //                 }
    //             },
    //             {
    //                 breakpoint: 961,
    //                 settings: {
    //                     slidesToShow: 4,
    //                     slidesToScroll: 1
    //                 }
    //             },
    //             {
    //                 breakpoint: 770,
    //                 settings: {
    //                     slidesToShow: 3,
    //                     slidesToScroll: 1
    //                 }
    //             },
    //             {
    //                 breakpoint: 768,
    //                 settings: {
    //                     slidesToShow: 3,
    //                     slidesToScroll: 1
    //                 }
    //             },
    //             {
    //                 breakpoint: 767,
    //                 settings: {
    //                     slidesToShow: 2,
    //                     slidesToScroll: 1
    //                 }
    //             },
    //             {
    //                 breakpoint: 766,
    //                 settings: {
    //                     slidesToShow: 2,
    //                     slidesToScroll: 1
    //                 }
    //             }
    //         ]
    //     });
    // });

}

function initSlick() {
    // Call this function to create the Recently Viewed section once Slick is loaded
    if (window.location.href.includes('/dp/')) {
        const price = document.querySelectorAll('.a-price-whole');
        let actualPrice = 'N/A';
        if (price.length > 0) {
            actualPrice = price[0].innerHTML;
        } else {
            console.log("No price elements found.");
        }
        const product = {
            id: document.getElementById('ASIN').value,
            title: document.title,
            imageUrl: document.querySelector('#imgTagWrapperId img').src,
            link: window.location.href,
            actualPrice
        };
        addRecentlyViewed(product);
    }

    if (window.location.href.includes('https://www.amazon.in/')) {
        createRecentlyViewedSection();
    }
}