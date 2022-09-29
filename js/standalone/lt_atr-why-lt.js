(function ( ) {
    // Set height based on browser chrome
    let whyLTContainer = document.querySelector('.atr_why-lt-container section');
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	if (whyLTContainer.innerHeight === undefined) {
        whyLTContainer.classList.add('force-full-height');
	}
}( ));