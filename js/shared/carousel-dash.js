(function() {
    document.addEventListener('slide.bs.carousel', function (event) {
        let carousel = event.target;
        if (carousel.classList.contains('carousel-dashboard')) {
            console.log('ready to party');
        }
    });
})();