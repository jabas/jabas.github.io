(function ( ) {
    const navMenuCloseBtn = document.querySelector('.nbr_close-btn');
    const navMenuOpenBtn = document.querySelector('.nbr_nav-button');
    const menuOverlay = document.querySelector('.nbr_overlay');
    const navMenu = document.querySelector('.nbr_nav-menu');

    function openNavMenu () {
        navMenu.style.visibility = 'visible';
        menuOverlay.style.visibility = 'visible';

        navMenu.style.transform = 'translateX(0)';
        menuOverlay.style.opacity = 0.5;
    }

    function closeNavMenu () {
        navMenu.style.transform = 'translateX(-100%)';
        menuOverlay.style.opacity = 0;

        setTimeout(() => {
            navMenu.style.visibility = 'hidden';
            menuOverlay.style.visibility = 'hidden';
        }, 500);
    }
    
    navMenuOpenBtn.onclick = openNavMenu;
    navMenuCloseBtn.onclick = closeNavMenu;
    menuOverlay.onclick = closeNavMenu;
}( ));