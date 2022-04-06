(function() {

	const dropdownElementList = [].slice.call(document.querySelectorAll('.lt-header .dropdown .dropdown-toggle'));
	const dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
		return new bootstrap.Dropdown(dropdownToggleEl, {
			popperConfig: function (defaultBsPopperConfig) {
				let newPopperConfig = defaultBsPopperConfig;
				if (defaultBsPopperConfig.placement === 'bottom-start') {
					newPopperConfig.placement = 'bottom';
				}
				return newPopperConfig
			}
		});
	});
	
})();
(function() {


	let tmHeader = document.getElementById('ltTMHeader');

	const headerNav = document.createElement('div');
	headerNav.classList.add('lt-header-nav', 'offcanvas', 'offcanvas-start');
	headerNav.setAttribute('id', 'headerNav');
	headerNav.setAttribute('data-bs-backdrop','false');

	const primaryWrap = document.createElement('div');
	primaryWrap.classList.add('lt-header-primary', 'py-0', 'bg-white');
	primaryWrap.setAttribute('data-lt-navbar-overflow','#primaryNav');

	// Header Sections
	function stringToHTML(str) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(str, 'text/html');
		return doc.body.firstChild;
	}

	const mobileBar = stringToHTML(`<div class="lt-header-mobile-bar d-lg-none bg-white row g-0 justify-content-between align-items-center">
		<div class="col text-start">
			<button id="navToggle" class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#headerNav" aria-controls="headerNav">
				<span class="navbar-toggler-icon"></span>
			</button>
		</div>
		<div class="col text-center">
			<a href="/" class="d-inline-block text-decoration-none">
				<svg xmlns="http://www.w3.org/2000/svg" width="138px" height="22px" viewBox="0 0 138 22">
					<path fill="#AAAAAA" d="M4.977,1.403v15.353h3.026v3.841H0V1.403H4.977z M17.496,1.403v3.841h-2.955v15.353H9.564V5.244H6.62V1.403 H17.496z M22.899,1.403h3.724c2.404,0,4.029,0.111,4.877,0.332c0.847,0.221,1.492,0.585,1.933,1.091 c0.441,0.506,0.717,1.069,0.828,1.689s0.166,1.84,0.166,3.657v6.722c0,1.723-0.081,2.875-0.242,3.456 c-0.162,0.581-0.443,1.035-0.845,1.363c-0.402,0.328-0.898,0.557-1.49,0.688s-1.482,0.196-2.672,0.196h-6.278V1.403z M27.876,4.687 v12.626c0.717,0,1.159-0.144,1.324-0.433c0.166-0.288,0.248-1.073,0.248-2.353V7.07c0-0.869-0.028-1.427-0.083-1.672 c-0.055-0.245-0.181-0.425-0.378-0.539C28.79,4.744,28.42,4.687,27.876,4.687z M44.885,1.403l2.846,19.194h-5.087l-0.267-3.45h-1.78 l-0.299,3.45h-5.146l2.539-19.194H44.885z M42.248,13.745c-0.252-2.174-0.505-4.862-0.759-8.062 c-0.507,3.675-0.826,6.362-0.956,8.062H42.248z M59.122,7.212H54.5V5.79c0-0.664-0.059-1.087-0.177-1.269s-0.315-0.273-0.591-0.273 c-0.299,0-0.526,0.123-0.68,0.368c-0.154,0.245-0.231,0.617-0.231,1.115c0,0.64,0.087,1.123,0.259,1.447 c0.165,0.324,0.633,0.715,1.407,1.174c2.216,1.318,3.611,2.401,4.186,3.246c0.575,0.846,0.863,2.209,0.863,4.09 c0,1.367-0.16,2.375-0.479,3.023c-0.319,0.648-0.936,1.191-1.85,1.63C56.293,20.781,55.229,21,54.015,21 c-1.332,0-2.469-0.253-3.411-0.759c-0.942-0.506-1.559-1.15-1.85-1.932s-0.437-1.893-0.437-3.331v-1.257h4.622v2.336 c0,0.719,0.065,1.182,0.195,1.387c0.13,0.205,0.361,0.308,0.692,0.308s0.577-0.13,0.739-0.391c0.162-0.261,0.242-0.648,0.242-1.162 c0-1.13-0.154-1.869-0.461-2.217c-0.315-0.348-1.092-0.929-2.329-1.743c-1.237-0.822-2.057-1.419-2.459-1.79 c-0.402-0.371-0.735-0.885-0.999-1.541c-0.264-0.656-0.396-1.494-0.396-2.513c0-1.47,0.187-2.545,0.562-3.225 c0.374-0.68,0.979-1.211,1.815-1.595S52.384,1,53.566,1c1.293,0,2.394,0.209,3.304,0.628s1.513,0.946,1.809,1.583 s0.443,1.717,0.443,3.242V7.212z M72.541,1.403v19.194h-4.977v-8.062h-1.49v8.062h-4.977V1.403h4.977v6.864h1.49V1.403H72.541z M74.538,1.403h4.965c1.568,0,2.757,0.123,3.564,0.368c0.808,0.244,1.46,0.74,1.957,1.486c0.497,0.747,0.745,1.949,0.745,3.608 c0,1.121-0.175,1.904-0.526,2.346c-0.351,0.442-1.042,0.781-2.075,1.019c1.151,0.261,1.931,0.694,2.341,1.299 c0.41,0.605,0.615,1.532,0.615,2.781v1.779c0,1.297-0.148,2.258-0.443,2.883s-0.766,1.051-1.413,1.281 c-0.646,0.229-1.97,0.344-3.972,0.344h-5.757V1.403z M79.516,4.687v4.268c0.213-0.008,0.378-0.012,0.497-0.012 c0.489,0,0.8-0.121,0.934-0.362s0.201-0.931,0.201-2.069c0-0.601-0.055-1.022-0.166-1.263c-0.11-0.241-0.254-0.393-0.432-0.456 C80.373,4.73,80.028,4.695,79.516,4.687z M79.516,11.943v5.37c0.701-0.024,1.149-0.134,1.342-0.332 c0.193-0.198,0.29-0.684,0.29-1.458v-1.79c0-0.822-0.087-1.32-0.26-1.494S80.256,11.966,79.516,11.943z M99.282,12.642 c0,1.928-0.045,3.294-0.136,4.096c-0.091,0.802-0.374,1.535-0.851,2.199c-0.477,0.664-1.121,1.174-1.933,1.529S94.605,21,93.525,21 c-1.025,0-1.945-0.168-2.76-0.504c-0.816-0.336-1.472-0.84-1.968-1.512c-0.497-0.672-0.792-1.403-0.887-2.193 c-0.095-0.79-0.142-2.173-0.142-4.149V9.358c0-1.928,0.045-3.294,0.136-4.096s0.374-1.535,0.851-2.199 c0.477-0.664,1.121-1.174,1.933-1.529S92.445,1,93.525,1c1.025,0,1.945,0.168,2.76,0.504c0.816,0.336,1.472,0.84,1.968,1.512 c0.497,0.672,0.792,1.403,0.887,2.193c0.095,0.79,0.142,2.173,0.142,4.149V12.642z M94.305,6.335c0-0.893-0.049-1.464-0.148-1.713 c-0.099-0.249-0.301-0.373-0.609-0.373c-0.26,0-0.459,0.101-0.597,0.302c-0.138,0.202-0.207,0.796-0.207,1.784v8.963 c0,1.114,0.045,1.802,0.136,2.063s0.301,0.391,0.632,0.391c0.339,0,0.556-0.15,0.65-0.451c0.095-0.3,0.142-1.016,0.142-2.146V6.335z M109.742,1.403l2.846,19.194h-5.086l-0.267-3.45h-1.78l-0.299,3.45h-5.146l2.539-19.194H109.742z M107.105,13.745 c-0.252-2.174-0.505-4.862-0.759-8.062c-0.507,3.675-0.826,6.362-0.956,8.062H107.105z M113.433,1.403h3.523 c2.349,0,3.939,0.091,4.77,0.273c0.831,0.182,1.509,0.646,2.033,1.393s0.786,1.938,0.786,3.574c0,1.494-0.185,2.498-0.556,3.011 c-0.37,0.514-1.099,0.822-2.187,0.925c0.985,0.245,1.647,0.573,1.986,0.984c0.339,0.411,0.55,0.788,0.632,1.132 s0.124,1.29,0.124,2.839v5.062h-4.622v-6.378c0-1.027-0.081-1.664-0.242-1.909c-0.162-0.245-0.585-0.368-1.271-0.368v8.654h-4.977 V1.403z M118.411,4.687v4.268c0.56,0,0.952-0.077,1.176-0.231s0.337-0.654,0.337-1.5V6.169c0-0.609-0.108-1.008-0.325-1.197 C119.382,4.782,118.986,4.687,118.411,4.687z M126.473,1.403h3.724c2.404,0,4.029,0.111,4.877,0.332s1.492,0.585,1.933,1.091 c0.441,0.506,0.717,1.069,0.828,1.689S138,6.355,138,8.172v6.722c0,1.723-0.081,2.875-0.242,3.456 c-0.162,0.581-0.443,1.035-0.845,1.363c-0.402,0.328-0.898,0.557-1.49,0.688s-1.482,0.196-2.672,0.196h-6.278V1.403z M131.451,4.687 v12.626c0.717,0,1.159-0.144,1.324-0.433c0.166-0.288,0.248-1.073,0.248-2.353V7.07c0-0.869-0.028-1.427-0.083-1.672 c-0.055-0.245-0.181-0.425-0.378-0.539C132.365,4.744,131.994,4.687,131.451,4.687z"/>
				</svg>
			</a>
		</div>
		<nav aria-label="Utility Navigation" class="col">
			<ul class="nav nav-right flex-nowrap justify-content-end">
				<li class="nav-item dropdown dropdown-dark">
					<a href="#" class="nav-link" data-bs-toggle="dropdown" data-bs-display="static" role="button" aria-haspopup="true" aria-expanded="false">
						<svg class="ico ico-person-circle-outline" width="1.25rem" height="1.25rem" viewBox="0 0 20 20" aria-label="">
							<path fill="none" stroke="currentColor" d="M19.5,10c0,5.2-4.3,9.5-9.5,9.5S0.5,15.2,0.5,10S4.8,0.5,10,0.5 S19.5,4.8,19.5,10z M12.5,7c0-1.4-1.1-2.5-2.5-2.5S7.5,5.6,7.5,7v1c0,1.4,1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5V7z M16.5,16.9v-1.4 c0-1.7-1.3-3-3-3h-7c-1.7,0-3,1.3-3,3v1.4"/>
						</svg>
						<span class="visually-hidden">Account</span>
					</a>
					<div class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
						<a class="dropdown-item" href="/member/bios-admin/manage-profile.html">My Bio</a>
						<a class="dropdown-item" href="#">Log Out</a>
					</div>
				</li>
			</ul>
		</nav>
	</div>`);

	const logo = stringToHTML(`<div class="navbar-brand">
		<a href="/">
			<svg xmlns="http://www.w3.org/2000/svg" width="138px" height="22px" viewBox="0 0 138 22">
				<path fill="#AAAAAA" d="M4.977,1.403v15.353h3.026v3.841H0V1.403H4.977z M17.496,1.403v3.841h-2.955v15.353H9.564V5.244H6.62V1.403 H17.496z M22.899,1.403h3.724c2.404,0,4.029,0.111,4.877,0.332c0.847,0.221,1.492,0.585,1.933,1.091 c0.441,0.506,0.717,1.069,0.828,1.689s0.166,1.84,0.166,3.657v6.722c0,1.723-0.081,2.875-0.242,3.456 c-0.162,0.581-0.443,1.035-0.845,1.363c-0.402,0.328-0.898,0.557-1.49,0.688s-1.482,0.196-2.672,0.196h-6.278V1.403z M27.876,4.687 v12.626c0.717,0,1.159-0.144,1.324-0.433c0.166-0.288,0.248-1.073,0.248-2.353V7.07c0-0.869-0.028-1.427-0.083-1.672 c-0.055-0.245-0.181-0.425-0.378-0.539C28.79,4.744,28.42,4.687,27.876,4.687z M44.885,1.403l2.846,19.194h-5.087l-0.267-3.45h-1.78 l-0.299,3.45h-5.146l2.539-19.194H44.885z M42.248,13.745c-0.252-2.174-0.505-4.862-0.759-8.062 c-0.507,3.675-0.826,6.362-0.956,8.062H42.248z M59.122,7.212H54.5V5.79c0-0.664-0.059-1.087-0.177-1.269s-0.315-0.273-0.591-0.273 c-0.299,0-0.526,0.123-0.68,0.368c-0.154,0.245-0.231,0.617-0.231,1.115c0,0.64,0.087,1.123,0.259,1.447 c0.165,0.324,0.633,0.715,1.407,1.174c2.216,1.318,3.611,2.401,4.186,3.246c0.575,0.846,0.863,2.209,0.863,4.09 c0,1.367-0.16,2.375-0.479,3.023c-0.319,0.648-0.936,1.191-1.85,1.63C56.293,20.781,55.229,21,54.015,21 c-1.332,0-2.469-0.253-3.411-0.759c-0.942-0.506-1.559-1.15-1.85-1.932s-0.437-1.893-0.437-3.331v-1.257h4.622v2.336 c0,0.719,0.065,1.182,0.195,1.387c0.13,0.205,0.361,0.308,0.692,0.308s0.577-0.13,0.739-0.391c0.162-0.261,0.242-0.648,0.242-1.162 c0-1.13-0.154-1.869-0.461-2.217c-0.315-0.348-1.092-0.929-2.329-1.743c-1.237-0.822-2.057-1.419-2.459-1.79 c-0.402-0.371-0.735-0.885-0.999-1.541c-0.264-0.656-0.396-1.494-0.396-2.513c0-1.47,0.187-2.545,0.562-3.225 c0.374-0.68,0.979-1.211,1.815-1.595S52.384,1,53.566,1c1.293,0,2.394,0.209,3.304,0.628s1.513,0.946,1.809,1.583 s0.443,1.717,0.443,3.242V7.212z M72.541,1.403v19.194h-4.977v-8.062h-1.49v8.062h-4.977V1.403h4.977v6.864h1.49V1.403H72.541z M74.538,1.403h4.965c1.568,0,2.757,0.123,3.564,0.368c0.808,0.244,1.46,0.74,1.957,1.486c0.497,0.747,0.745,1.949,0.745,3.608 c0,1.121-0.175,1.904-0.526,2.346c-0.351,0.442-1.042,0.781-2.075,1.019c1.151,0.261,1.931,0.694,2.341,1.299 c0.41,0.605,0.615,1.532,0.615,2.781v1.779c0,1.297-0.148,2.258-0.443,2.883s-0.766,1.051-1.413,1.281 c-0.646,0.229-1.97,0.344-3.972,0.344h-5.757V1.403z M79.516,4.687v4.268c0.213-0.008,0.378-0.012,0.497-0.012 c0.489,0,0.8-0.121,0.934-0.362s0.201-0.931,0.201-2.069c0-0.601-0.055-1.022-0.166-1.263c-0.11-0.241-0.254-0.393-0.432-0.456 C80.373,4.73,80.028,4.695,79.516,4.687z M79.516,11.943v5.37c0.701-0.024,1.149-0.134,1.342-0.332 c0.193-0.198,0.29-0.684,0.29-1.458v-1.79c0-0.822-0.087-1.32-0.26-1.494S80.256,11.966,79.516,11.943z M99.282,12.642 c0,1.928-0.045,3.294-0.136,4.096c-0.091,0.802-0.374,1.535-0.851,2.199c-0.477,0.664-1.121,1.174-1.933,1.529S94.605,21,93.525,21 c-1.025,0-1.945-0.168-2.76-0.504c-0.816-0.336-1.472-0.84-1.968-1.512c-0.497-0.672-0.792-1.403-0.887-2.193 c-0.095-0.79-0.142-2.173-0.142-4.149V9.358c0-1.928,0.045-3.294,0.136-4.096s0.374-1.535,0.851-2.199 c0.477-0.664,1.121-1.174,1.933-1.529S92.445,1,93.525,1c1.025,0,1.945,0.168,2.76,0.504c0.816,0.336,1.472,0.84,1.968,1.512 c0.497,0.672,0.792,1.403,0.887,2.193c0.095,0.79,0.142,2.173,0.142,4.149V12.642z M94.305,6.335c0-0.893-0.049-1.464-0.148-1.713 c-0.099-0.249-0.301-0.373-0.609-0.373c-0.26,0-0.459,0.101-0.597,0.302c-0.138,0.202-0.207,0.796-0.207,1.784v8.963 c0,1.114,0.045,1.802,0.136,2.063s0.301,0.391,0.632,0.391c0.339,0,0.556-0.15,0.65-0.451c0.095-0.3,0.142-1.016,0.142-2.146V6.335z M109.742,1.403l2.846,19.194h-5.086l-0.267-3.45h-1.78l-0.299,3.45h-5.146l2.539-19.194H109.742z M107.105,13.745 c-0.252-2.174-0.505-4.862-0.759-8.062c-0.507,3.675-0.826,6.362-0.956,8.062H107.105z M113.433,1.403h3.523 c2.349,0,3.939,0.091,4.77,0.273c0.831,0.182,1.509,0.646,2.033,1.393s0.786,1.938,0.786,3.574c0,1.494-0.185,2.498-0.556,3.011 c-0.37,0.514-1.099,0.822-2.187,0.925c0.985,0.245,1.647,0.573,1.986,0.984c0.339,0.411,0.55,0.788,0.632,1.132 s0.124,1.29,0.124,2.839v5.062h-4.622v-6.378c0-1.027-0.081-1.664-0.242-1.909c-0.162-0.245-0.585-0.368-1.271-0.368v8.654h-4.977 V1.403z M118.411,4.687v4.268c0.56,0,0.952-0.077,1.176-0.231s0.337-0.654,0.337-1.5V6.169c0-0.609-0.108-1.008-0.325-1.197 C119.382,4.782,118.986,4.687,118.411,4.687z M126.473,1.403h3.724c2.404,0,4.029,0.111,4.877,0.332s1.492,0.585,1.933,1.091 c0.441,0.506,0.717,1.069,0.828,1.689S138,6.355,138,8.172v6.722c0,1.723-0.081,2.875-0.242,3.456 c-0.162,0.581-0.443,1.035-0.845,1.363c-0.402,0.328-0.898,0.557-1.49,0.688s-1.482,0.196-2.672,0.196h-6.278V1.403z M131.451,4.687 v12.626c0.717,0,1.159-0.144,1.324-0.433c0.166-0.288,0.248-1.073,0.248-2.353V7.07c0-0.869-0.028-1.427-0.083-1.672 c-0.055-0.245-0.181-0.425-0.378-0.539C132.365,4.744,131.994,4.687,131.451,4.687z"/>
			</svg>
		</a>
	</div>`);

	const primaryNav = stringToHTML(`<nav aria-label="Primary" class="me-auto">
		<ul id="primaryNav" class="nav nav-neutral">
			<li class="nav-item">
				<a href="#0" class="nav-link active">New Members</a>
			</li>
			<li class="nav-item">
				<a href="#0" class="nav-link">Personal Training</a>
			</li>
			<li class="nav-item">
				<a href="#0" class="nav-link">Search All Members</a>
			</li>
			<li class="nav-item">
				<a href="#0" class="nav-link">Notifications</a>
			</li>
			<li class="nav-item">
				<a href="#0" class="nav-link">Notifications</a>
			</li>
			<li class="nav-item">
				<a href="#0" class="nav-link">Notifications</a>
			</li>
			<li class="nav-item">
				<a href="#0" class="nav-link">Notifications</a>
			</li>
			<li class="nav-item">
				<a href="#0" class="nav-link">Notifications</a>
			</li>
			<li class="nav-item">
				<a href="#0" class="nav-link">Notifications</a>
			</li>
		</ul>
	</nav>`);

	const utilityNav = stringToHTML(`<div class="lt-header-utility">
		<nav class="lt-header-utility-major" aria-label="Utility Navigation">
			<ul class="nav nav-dark-neutral">
				<li class="nav-item dropdown dropdown-dark">
					<a class="nav-link dropdown-toggle pe-0" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static" role="button" aria-haspopup="true" aria-expanded="false">
						<svg class="ico ico-person-circle-outline" width="1.25rem" height="1.25rem" viewBox="0 0 20 20" aria-label="">
							<path fill="none" stroke="currentColor" d="M19.5,10c0,5.2-4.3,9.5-9.5,9.5S0.5,15.2,0.5,10S4.8,0.5,10,0.5 S19.5,4.8,19.5,10z M12.5,7c0-1.4-1.1-2.5-2.5-2.5S7.5,5.6,7.5,7v1c0,1.4,1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5V7z M16.5,16.9v-1.4 c0-1.7-1.3-3-3-3h-7c-1.7,0-3,1.3-3,3v1.4"/>
						</svg>
						Aravin
					</a>
					<div class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
						<a class="dropdown-item" href="/member/bios-admin/manage-profile.html">My Bio</a>
						<a class="dropdown-item" href="#">Log Out</a>
					</div>
				</li>
			</ul>
		</nav>
	</div>`);

	const globalNav = stringToHTML(`<div class="lt-header-global">
		<ul class="nav">
			<li class="nav-item"><a class="nav-link active" href="#0">HUB</a></li>
		</ul>
	</div>`);

	// add elements to DOM
	function buildNavHTML() {
		tmHeader.classList.add('lt-header');
		primaryWrap.append(logo, primaryNav);
		headerNav.append(primaryWrap, utilityNav, globalNav);
		tmHeader.append(mobileBar, headerNav);

		const mobileNavToggle = document.getElementById('navToggle');

		headerNav.addEventListener('show.bs.offcanvas', function (event) {
			mobileNavToggle.classList.add('navbar-toggler-open');
		});

		headerNav.addEventListener('hide.bs.offcanvas', function (event) {
			mobileNavToggle.classList.remove('navbar-toggler-open');
		});

		var event = new CustomEvent('initOverflowNav', {
			bubbles: true
		});
		primaryWrap.dispatchEvent(event);
	}

	if (tmHeader) {
		buildNavHTML();
	} else {
		const observer = new MutationObserver(function(mutations_list) {
			mutations_list.forEach(function(mutation) {
				mutation.addedNodes.forEach(function(added_node) {
					if(added_node.id == 'ltTMHeader') {
						tmHeader = document.getElementById('ltTMHeader')
						buildNavHTML();
						observer.disconnect();
					}
				});
			});
		});
		observer.observe(document.body, { subtree: false, childList: true });
	}

})();

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
		console.log(space);
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

			const first = overList.firstElementChild;
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

		overList.insertBefore(oddman, overList.firstElementChild);
		oddman.firstElementChild.classList.remove('nav-link');
		oddman.firstElementChild.classList.add('dropdown-item');
		overflow.classList.remove('d-none');

		// continue until spacing is available
		if (evalRemainingSpace(navbar) < 0) {
			removeItems(navbar);
		}
	}
 
	function returnItem(nav, overflow, overList) {
		const oddman = overList.firstElementChild;
		const oddmanLink = oddman.firstElementChild;

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
			while( evalRemainingSpace(navbar) > parseInt(overList.firstElementChild.dataset.returnSize) ) {
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

	// event trigger to initialize
	document.body.addEventListener('initOverflowNav', function (event) {
		initOverflow(event.target);
	});

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

//# sourceMappingURL=core4-ui-system.js.map
