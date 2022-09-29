(function () {
    // Code copied from lt_nbr-navigation-bar.js lt_atr-carousel.js and lt_atr-featured-props.js 
    // to have it working on the full page example

    // ---------- Navigation Bar ----------
    const navMenuCloseBtn = document.querySelector('.nbr_close-btn');
    const navMenuOpenBtn = document.querySelector('.nbr_nav-button');
    const menuOverlay = document.querySelector('.nbr_overlay');
    const navMenu = document.querySelector('.nbr_nav-menu');

    function openNavMenu() {
        navMenu.style.visibility = 'visible';
        menuOverlay.style.visibility = 'visible';

        navMenu.style.transform = 'translateX(0)';
        menuOverlay.style.opacity = 0.5;
    }

    function closeNavMenu() {
        navMenu.style.transform = 'translateX(-100%)';
        menuOverlay.style.opacity = 0;

        setTimeout(() => {
            navMenu.style.visibility = 'hidden';
            menuOverlay.style.visibility = 'hidden';
        }, 500);
    }

    navMenuOpenBtn.onclick = openNavMenu;
    navMenuCloseBtn.onclick = closeNavMenu;
    menuOverlay.onclick = closeNavMenu;

    // ---------- Carousel ----------
    let carouselX = 0;
    const carousel = document.querySelector('.atr_carousel');
    const carouselMaxX = 0;
    const carouselMinX = ((document.querySelectorAll('.atr_all-cards .atr_carousel-card').length) * -20) + 80;
    const carouselFullStep = 80;

    const carouselLeftBtn = document.querySelector('.atr_carousel-btn-left');
    const carouselRightBtn = document.querySelector('.atr_carousel-btn-right');
    const carouselCards = document.querySelectorAll('.atr_carousel .atr_all-cards a');

    function animateCarousel(x, time) {
        document.querySelector('.atr_carousel .atr_all-cards').animate([
            { transform: 'translateX(' + x + 'vw)' }
        ], {
            duration: time,
            iterations: 1,
            fill: 'forwards'
        });
    }

    function slideCarouselLeft() {
        if (carouselX + carouselFullStep >= carouselMaxX) {
            carouselX = carouselMaxX;
            carouselLeftBtn.style.display = 'none';
        } else {
            carouselX += carouselFullStep;
        }
        animateCarousel(carouselX, 500);
        carouselRightBtn.style.display = 'block';
    }

    function slideCarouselRight() {
        if (carouselX - carouselFullStep <= carouselMinX) {
            carouselX = carouselMinX;
            carouselRightBtn.style.display = 'none';
        } else {
            carouselX -= carouselFullStep;
        }

        animateCarousel(carouselX, 500);
        carouselLeftBtn.style.display = 'block';
    }

    carouselCards.forEach((card) => {
        card.onfocus = function () {
            let cardRect = card.getBoundingClientRect();
            let carouselRect = carousel.getBoundingClientRect();

            if (cardRect.x + cardRect.width < carouselRect.x + 10) {
                slideCarouselLeft();
            }

            if (cardRect.x + 10 > carouselRect.x + carouselRect.width) {
                slideCarouselRight();
            }
        }
    });

    carouselLeftBtn.onclick = function () {
        if (carouselX < carouselMaxX) {
            slideCarouselLeft();
        }
    };

    carouselRightBtn.onclick = function () {
        if (carouselX > carouselMinX) {
            slideCarouselRight();
        }
    };

    // ----- Carousel Featured Properties -----
    const ENTER_KEY_CODE = 13;
    const TOLERANCE = 10;

    const carouselProps = document.querySelector('.atr_all-props');
    const allPropCards = document.querySelectorAll('.atr_all-props .atr_prop-card');
    const carouselPropsLeftBtn = document.querySelector('.atr_carousel-props-btn-left');
    const carouselPropsRightBtn = document.querySelector('.atr_carousel-props-btn-right');

    let carousePropslStepSize = Math.floor(carouselProps.offsetWidth * 0.7);
    let carouselPropsMaxScrollX = carousePropslStepSize * (allPropCards.length - 1);
    let carouselPropsMinScrollX = 0;

    function slideCarouselPropsLeft() {
        if (carouselProps.scrollLeft + carousePropslStepSize >= carouselPropsMaxScrollX - TOLERANCE) {
            carouselProps.scrollLeft = carouselPropsMaxScrollX;
            carouselPropsRightBtn.style.display = 'none';
        } else {
            carouselProps.scrollLeft += carousePropslStepSize;
        }
        carouselPropsLeftBtn.style.display = 'block';
    }

    function slideCarouselPropsRight() {
        if (carouselProps.scrollLeft - carousePropslStepSize <= carouselPropsMinScrollX + TOLERANCE) {
            carouselProps.scrollLeft = carouselPropsMinScrollX;
            carouselPropsLeftBtn.style.display = 'none';
        } else {
            carouselProps.scrollLeft -= carousePropslStepSize;
        }
        carouselPropsRightBtn.style.display = 'block';
    }

    carouselPropsLeftBtn.onclick = function () {
        slideCarouselPropsRight();
    };

    carouselPropsRightBtn.onclick = function () {
        slideCarouselPropsLeft();
    };

    carouselPropsLeftBtn.addEventListener("keyup", function (event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            slideCarouselPropsLeft();
        }
    });

    carouselPropsRightBtn.addEventListener("keyup", function (event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            slideCarouselPropsRight();
        }
    });

    function toggleContentOpacity(entries) {
        entries.forEach(entry => {
            const content = entry.target.querySelector('.atr_prop-content');

            if (entry.intersectionRatio > 0.5) {
                content.style.visibility = 'visible';
                content.style.opacity = 1;
            } else {
                content.style.opacity = 0;
                setTimeout(() => {
                    content.style.visibility = 'hidden';
                }, 500);
            }
        });
    }

    const carouselPropsObserver = new IntersectionObserver(toggleContentOpacity, {
        root: document.querySelector('.atr_carousel-props'),
        threshold: [0.5, 1]
    });

    allPropCards.forEach((propCard) => {
        carouselPropsObserver.observe(propCard);
    });

    // Resize listener
    function debounce(func, wait) {
        let timeout;

        return function executedFunction() {
            let context = this;
            let args = arguments;

            let later = function () {
                timeout = null;
                func.apply(context, args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    let debouncedFunction = debounce(function() {
        carousePropslStepSize = Math.floor(carouselProps.offsetWidth * 0.7);
        carouselPropsMaxScrollX = carousePropslStepSize * (allPropCards.length - 1);
    }, 250);
    
    window.addEventListener('resize', debouncedFunction);
}());