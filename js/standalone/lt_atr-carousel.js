(function ( ) {
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
        card.onfocus = function() {
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

    carouselLeftBtn.onclick = function() {
        if (carouselX < carouselMaxX) {
            slideCarouselLeft();
        }
    };

    carouselRightBtn.onclick = function() {
        if (carouselX > carouselMinX) {
            slideCarouselRight();
        }  
    };
}( ));