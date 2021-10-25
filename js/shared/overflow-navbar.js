(function() {

	function getNav(navbar) {
		return document.querySelector(navbar.dataset.ltNavbarOverflow);
	}

	function initOverflow(navbar) {
		const nav = getNav(navbar);

		if (nav && !navbar.classList.contains('lt-navbar-overflow')) {
			navbar.classList.add('lt-navbar-overflow');
			addOverflow(navbar);
			evalItemPlacement(navbar);
		}
	}

	function addOverflow(navbar) {
		const nav = getNav(navbar);
		const overflow = document.createElement('li');
		const dropdown = document.createElement('div');

		overflow.classList.add('nav-item', 'dropdown', 'd-none');
		overflow.innerHTML = '<a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" data-bs-offset="-2,0" role="button" aria-haspopup="true" aria-expanded="false">More</a>';
		dropdown.classList.add('dropdown-menu', 'dropdown-menu-end');
		dropdown.innerHTML = '<ul class="list-unstyled"></ul>';
		
		nav.appendChild(overflow);
		overflow.appendChild(dropdown);
	}

	function evalRemainingSpace(navbar) {
		const nav = getNav(navbar);
		const children = nav.children;
		let last = children[children.length-1];
		let space = 0;

		if (last.classList.contains('d-none')) {
			last = children[children.length-2];
		}

		if (last) {
			space = navbar.clientWidth - (last.offsetLeft + last.offsetWidth);
		}
		return space;
	}

	function evalItemPlacement(navbar) {
		const nav = getNav(navbar);
		const remain = evalRemainingSpace(navbar);
		const overflow = nav.lastChild;
		const overList = overflow.querySelector('.list-unstyled');
		const overLength = overList.children.length;

		if (remain < 0) {
			removeItems(navbar);
		} else if (overLength > 0) {

			const first = overList.firstChild;
			const returnSize = parseInt(first.dataset.returnSize);
			const overflowSize = overflow.offsetWidth;

			if (remain > returnSize || (overLength === 1 && remain + overflowSize > returnSize)) {
				returnItems(navbar);
			}
		}
	}

	function removeItems(navbar) {
		const nav = getNav(navbar);
		const oddman = nav.children[nav.children.length-2];
		const overflow = nav.lastChild;
		const overList = overflow.querySelector('.list-unstyled');

		oddman.dataset.returnSize = oddman.offsetWidth;
		oddman.classList.remove('nav-item');

		overList.insertBefore(oddman, overList.firstChild);
		
		oddman.firstChild.classList.remove('nav-link');
		oddman.firstChild.classList.add('dropdown-item');
		overflow.classList.remove('d-none');

		// continue until spacing is available
		if (evalRemainingSpace(navbar) < 0) {
			removeItems(navbar);
		}
	}
 
	function returnItem(nav, overflow, overList) {
		const oddman = overList.firstChild;
		const oddmanLink = oddman.firstChild;

		oddmanLink.classList.remove('dropdown-item');
		oddmanLink.classList.add('nav-link');
		oddman.classList.add('nav-item');
		nav.insertBefore(oddman, overflow);
	}

	function returnItems(navbar) {
		const nav = getNav(navbar);
		const overflow = nav.lastChild;
		const overList = overflow.querySelector('.list-unstyled');

		returnItem(nav, overflow, overList);

		if (overList.children.length === 0) {
			overflow.classList.add('d-none');
		} else {
			while( evalRemainingSpace(navbar) > parseInt(overList.firstChild.dataset.returnSize) ) {
				evalItemPlacement(navbar);
			}
		}
	}

	function emptyOverflow(navbar) {
		const nav = getNav(navbar);
		const overflow = nav.lastChild;
		const overList = overflow.querySelector('.list-unstyled');

		while (overList.children.length > 0) {
			returnItem(nav, overflow, overList);
		}

	}

	// initalize existing overflow navs
	let navbars = document.querySelectorAll('[data-lt-navbar-overflow]');

	for (let i = 0; i < navbars.length; i++) {
		initOverflow(navbars[i]);		
	}

	// listen for navs added after page load

	// adjust initalized navs on resize
	let timeout;

	window.addEventListener('resize', function ( event ) {
		if (timeout) {
			window.cancelAnimationFrame(timeout);
		}

		timeout = window.requestAnimationFrame(function () {
			const navbars = document.querySelectorAll('.lt-navbar-overflow');

			for (let i = 0; i < navbars.length; i++) {
				const display = window.getComputedStyle(navbars[i]).display;
				
				if(display !== 'flex') {
					emptyOverflow(navbars[i]);
				} else {
					evalItemPlacement(navbars[i]);
				}
					
			}
		});

	}, false);
})();
