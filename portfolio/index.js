const hamburgerButton = document.querySelector('.hamburger');
const adaptiveMenu = document.querySelector('.header_menu');
const navLinks = document.querySelector('.menu_list');
const body = document.body;

hamburgerButton.addEventListener('click', menuOpenAndClose);
navLinks.addEventListener('click', closeMenu);

function menuOpenAndClose () {
    hamburgerButton.classList.toggle('is_active');
    adaptiveMenu.classList.toggle('is_open');
    body.classList.toggle('fixed_scroll');
}

function closeMenu (event) {
    if ( event.target.classList.contains('menu_link') ) {
        hamburgerButton.classList.remove('is_active');
        adaptiveMenu.classList.remove('is_open');
        body.classList.remove('fixed_scroll');
    }
}