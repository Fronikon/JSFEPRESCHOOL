const body = document.body;
const adaptiveMenu = document.querySelector('.header_menu');
const navLinks = document.querySelector('.menu_list');
const hamburgerButton = document.querySelector('.hamburger');
const portfolioMenu = document.querySelector('.portfolio_menu');
const portfolioPhoto = document.querySelectorAll('.portfolio_photo');
const portfolioButton = document.querySelectorAll('.portfolio_button');

hamburgerButton.addEventListener('click', menuOpenAndClose);
navLinks.addEventListener('click', closeMenu);
portfolioMenu.addEventListener('click', switchSeason);

function switchSeason(event) {
    if( event.target.classList.contains('portfolio_button') ) {
        portfolioButton.forEach( (current) => current.classList.remove('button_active') )
        event.target.classList.add('button_active')

        portfolioPhoto.forEach( (current, index) => {
            current.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`;
        })
    }
}

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