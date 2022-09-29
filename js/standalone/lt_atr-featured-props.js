(function () {
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