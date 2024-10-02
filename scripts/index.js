(function () {
    function loadCSS(href) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        document.head.appendChild(link);
    }

    function loadJS(src, callback) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function init(){
        loadCSS('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css');
    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css');
    loadJS('https://code.jquery.com/jquery-3.6.0.min.js', function() {
        loadJS('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', initSlick);
    });
    }

    function addRecentlyViewed(product) {
        var viewedProducts = JSON.parse(localStorage.getItem('reo_recentlyViewed')) || [];
        if (!viewedProducts.some(function(item) { return item.id === product.id; })) {
            viewedProducts.push(product);
            localStorage.setItem('reo_recentlyViewed', JSON.stringify(viewedProducts));
        }
    }
    
    
    function initSlick() {
        if (window.location.href.includes('/dp/')) {
            var price = document.querySelectorAll('.a-price-whole');
            var actualPrice = price.length > 0 ? price[0].innerHTML : 'N/A';
            var product = {
                id: document.getElementById('ASIN').value,
                title: document.title,
                imageUrl: document.querySelector('#imgTagWrapperId img').src,
                link: window.location.href,
                actualPrice: actualPrice
            };
            addRecentlyViewed(product);
        }

        if (window.location.href.includes('https://www.amazon.in/')) {
            createRecentlyViewedSection();
        }
    }

    function createRecentlyViewedSection() {
        var viewedProducts = JSON.parse(localStorage.getItem('reo_recentlyViewed')) || [];
        if (viewedProducts.length === 0) return;

        var section = document.createElement('div');
        section.id = 'recently-viewed-section';
        section.innerHTML = '<h2>Recently Viewed Products</h2>';

        var productContainer = document.createElement('div');
        productContainer.className = 'product-container';

        viewedProducts.forEach(function(product) {
            var productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = '<a href="' + product.link + '">' +
                '<img src="' + product.imageUrl + '" alt="' + product.title + '">' +
                '<p class="product-title">' + product.title + '</p>' +
                '<p class="product-price">Rs.' + product.actualPrice.replace('.', '') + '</p>' +
                '</a>';
            productContainer.appendChild(productCard);
        });

        section.appendChild(productContainer);
        var footerElement = document.getElementById('navFooter');
        if (footerElement) {
            footerElement.insertAdjacentElement('beforebegin', section);
        } else {
            document.querySelector('footer').insertAdjacentElement('beforebegin', section);
        }

        $(document).ready(function() {
            $('.product-container').slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 5,
                slidesToScroll: 1,
                centerMode : false,
                mobileFirst: true,
                responsive: [
                    {
                        breakpoint: 1440,
                        settings: { slidesToShow: 5, slidesToScroll: 1 }
                    },
                    {
                        breakpoint: 961,
                        settings: { slidesToShow: 4, slidesToScroll: 1 }
                    },
                    {
                        breakpoint: 769,
                        settings: { slidesToShow: 3, slidesToScroll: 1 }
                    },
                    {
                        breakpoint: 768,
                        settings: { slidesToShow: 2, slidesToScroll: 1 }
                    }
                ]
            });
        });
    }
    init();

})();

