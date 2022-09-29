(function ( ) {
    // Set height based on browser chrome
    let membershipOptsContainer = document.querySelector('.atr_membership-opts-container');
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	if (membershipOptsContainer.innerHeight === undefined) {
        membershipOptsContainer.classList.add('force-full-height');
	}
}( ));