(function ( ) {
    // Set height based on browser chrome
    let slides = document.querySelectorAll('.atr_slide');
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	if (slides[0].innerHeight === undefined) {
        slides.forEach((slide) => {
            slide.classList.add('force-full-height')
        });
	}

    const ENTER_KEY_CODE = 13;
    let sliderX = 0;
    const maxX = 0;
    const minX = (document.querySelectorAll('.atr_slider-container .atr_slide').length - 1) * -100;

    function animateText() {
        const textElems = document.querySelectorAll('.atr_slider-container .atr_slide h2 span');
        textElems.forEach((elem) => {
            elem.animate([
                { color: 'transparent' }
            ], {
                duration: 0,
                iterations: 1,
                fill: 'forwards'
            });
        });

        setTimeout(() => {
            textElems.forEach((elem) => {
                elem.animate([
                    { color: '#F5F5F5' }
                ], {
                    duration: 500,
                    iterations: 1,
                    fill: 'forwards'
                });
            });
        }, 500);
    }

    function animateSlide(x, time) {
        document.querySelector('.atr_slider-container .atr_all-slides').animate([
            { transform: 'translateX(' + x + 'vw)' }
        ], {
            duration: time,
            iterations: 1,
            fill: 'forwards'
        });
    }

    function slideLeft() {
        if (sliderX === maxX) {
            animateSlide(sliderX = minX, 0);
        }
        animateText();
        animateSlide(sliderX += 100, 500);
    }

    function slideRight() {
        if (sliderX === minX) {
            animateSlide(sliderX = maxX, 0);
        }
        animateText();
        animateSlide(sliderX -= 100, 500);
    }

    document.querySelector('.atr_slider-btn-left').onclick = function() {
        slideLeft();
    };

    document.querySelector('.atr_slider-btn-right').onclick = function() {
        slideRight();
    };

    document.querySelector('.atr_slider-btn-left').addEventListener("keyup", function(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            slideLeft();
        }
    });

    document.querySelector('.atr_slider-btn-right').addEventListener("keyup", function(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            slideRight();
        }
    });
}( ));