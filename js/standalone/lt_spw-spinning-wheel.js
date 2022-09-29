(function ( ) {
    const ROTATION_SCROLL_RATIO = 0.3;

    const desktopSpinner = {
        container: document.querySelector('#spw-desktop'),
        outerWheel: document.querySelector('#spw-desktop .spw-outer-wheel'),
        innerWheel: document.querySelector('#spw-desktop .spw-inner-wheel')
    }

    const mobileSpinner = {
        container: document.querySelector('#spw-mobile'),
        outerWheel: document.querySelector('#spw-mobile .spw-outer-wheel'),
        innerWheel: document.querySelector('#spw-mobile .spw-inner-wheel')
    }
    
    let latestKnownScrollY = 0;
    let ticking = false;

    function updatePosition(spinner) {
        ticking = false;
        spinner.outerWheel.style.transform = 'rotate(' + latestKnownScrollY * ROTATION_SCROLL_RATIO + 'deg )';
        spinner.innerWheel.style.transform = 'rotate( -' + latestKnownScrollY * ROTATION_SCROLL_RATIO + 'deg )';
    }

    function requestTick(spinner) {
        if(!ticking) {
            requestAnimationFrame(() => {
                updatePosition(spinner);
            });
        }
        ticking = true;
    }

    function handleScroll(spinner) {
        latestKnownScrollY = window.pageYOffset;
        requestTick(spinner);
    }
    
    function toggleEventListener(spinner) {
        const spinnerRect = spinner.container.getBoundingClientRect();
        if (spinnerRect.bottom < 0 || spinnerRect.top > window.innerHeight || spinnerRect.width === 0) {
            window.removeEventListener("scroll", () => {
                handleScroll(spinner);
            });
        } else {
            window.addEventListener("scroll", () => {
                handleScroll(spinner);
            });
        }
    }

    const desktopObserver = new IntersectionObserver(() => {
        toggleEventListener(desktopSpinner);
    });

    const mobileObserver = new IntersectionObserver(() => {
        toggleEventListener(mobileSpinner);
    });

    if (desktopSpinner.container) {
        desktopObserver.observe(desktopSpinner.container);
    }

    if (mobileSpinner.container) {
        mobileObserver.observe(mobileSpinner.container);
    }
}( ));
    