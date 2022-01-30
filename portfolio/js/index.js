import i18Obj from './translate.js';

const body = document.body;
const adaptiveMenu = document.querySelector('.header_menu');
const navLinks = document.querySelector('.menu_list');
const themeSwith = document.querySelector('.switch_theme');
const langSwitch = document.querySelector('.switch_lang');
const hamburgerButton = document.querySelector('.hamburger');
const portfolioMenu = document.querySelector('.portfolio_menu');
const langButton = document.querySelectorAll('.lang_button');
const portfolioPhoto = document.querySelectorAll('.portfolio_photo');
const portfolioButton = document.querySelectorAll('.portfolio_button');
const sectionTitle = document.querySelectorAll('.section_title');
const buttons = document.querySelectorAll('.button');
const message = document.querySelectorAll('.message');
const icon = document.querySelectorAll('.icon');

const lightThemeArray = [
    body,
    adaptiveMenu,
    document.querySelector('.header_container'),
    document.querySelector('.hero_container'),
    document.querySelector('.contact_container'),
    document.querySelector('.contact_title'),
    document.querySelector('.contact_content')
];

icon.forEach( (current) => lightThemeArray.push(current));
buttons.forEach( (current) => lightThemeArray.push(current));
sectionTitle.forEach( (current) => lightThemeArray.push(current));
langButton.forEach( (current) => lightThemeArray.push(current));
message.forEach( (current) => lightThemeArray.push(current));

langSwitch.addEventListener('click', changeLang);
themeSwith.addEventListener('click', changeTheme);
navLinks.addEventListener('click', closeMenu);
hamburgerButton.addEventListener('click', menuOpenAndClose);
portfolioMenu.addEventListener('click', switchSeason);

function changeTheme() {
    lightThemeArray.forEach( (current) => {
        current.classList.toggle('light_theme');
    })
}

function getTranslate(lang) {
    document.querySelectorAll('[data-i18]').forEach( (current) => {
        if (current.placeholder) {
            current.placeholder = i18Obj[lang][current.dataset.i18];
            current.textContent = '';
        } else {
            current.textContent = i18Obj[lang][current.dataset.i18];
        }
    })
}

function changeLang(event) {
    if (event.target.classList.contains('lang_button')) {
        langSwitch.querySelectorAll('.lang_button').forEach( (current) => {
            current.classList.remove('lang_active');
        })

        event.target.classList.add('lang_active');
        getTranslate(event.target.dataset.lang)
    }
}

function switchSeason(event) {
    if( event.target.classList.contains('portfolio_button') ) {
        portfolioButton.forEach( (current) => current.classList.remove('button_active') );
        event.target.classList.add('button_active');

        portfolioPhoto.forEach( (current, index) => {
            current.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`;
        })
    }
}

function menuOpenAndClose () {
    hamburgerButton.classList.toggle('is_active');
    body.classList.toggle('is_active');
    adaptiveMenu.classList.toggle('is_open');
    body.classList.toggle('fixed_scroll');
}

function closeMenu (event) {
    if ( event.target.classList.contains('menu_link') ) {
        hamburgerButton.classList.remove('is_active');
        body.classList.remove('is_active');
        adaptiveMenu.classList.remove('is_open');
        body.classList.remove('fixed_scroll');
    }
}