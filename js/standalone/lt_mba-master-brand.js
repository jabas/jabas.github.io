(function () {
    // Set height based on browser chrome
    let masterBrandContainer = document.querySelector('.mba_master-brand-home');
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	if (masterBrandContainer) {
        masterBrandContainer.classList.add('force-full-height');
	}

    const RATIO_1 = 0.75;
    const RATIO_2 = 0.80;
    const RATIO_3 = 0.85;
    const RATIO_4 = 0.9;

    function toggleOpacity(entries) {
        entries.forEach(entry => {
            const content = entry.target.querySelector('.mba_screen-content');
            const feedback = entry.target.querySelector('.mba_screen-feedback');

            if (entry.intersectionRatio < RATIO_1) {
                feedback.style.visibility = 'hidden';

                content.style.opacity = 0;
                setTimeout(() => {
                    content.style.visibility = 'hidden';
                }, 400);
            } else if (entry.intersectionRatio < RATIO_2) {
                feedback.style.visibility = 'visible';
                content.style.visibility = 'visible';
                content.style.opacity = 0.25;
            } else if (entry.intersectionRatio < RATIO_3) {
                content.style.visibility = 'visible';
                content.style.opacity = 0.50;
            } else if (entry.intersectionRatio < RATIO_4) {
                content.style.visibility = 'visible';
                content.style.opacity = 0.75;
            } else {
                content.style.visibility = 'visible';
                content.style.opacity = 1;
            }
        });
    }

    function setOberverTarget(sectionID) {
        const target = document.getElementById(sectionID);
        observer.observe(target);
    }

    const observer = new IntersectionObserver(toggleOpacity, {
        threshold: [RATIO_1, RATIO_2, RATIO_3, RATIO_4]
    });

    setOberverTarget('mba_athletic-resorts');
    setOberverTarget('mba_living');
    setOberverTarget('mba_work');
    setOberverTarget('mba_digital');
}());
