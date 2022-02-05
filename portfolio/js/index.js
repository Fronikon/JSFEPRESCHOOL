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
const videoIcon = document.querySelectorAll('.video_icon');

const videoPlayer = document.querySelector('.video_player');
const videoPoster = videoPlayer.querySelector('.video_poster');
const videoButton = videoPlayer.querySelector('.video_button');
const videoPlay = videoPlayer.querySelector('.video_play');
const videoViewer = videoPlayer.querySelector('.viewer');
const progressBar = videoPlayer.querySelector('.video_progress');
const audioSlider = videoPlayer.querySelector('.audio_slider');
const audioMute = videoPlayer.querySelector('.video_volum_mute');
const videoFullscreen = videoPlayer.querySelector('.video_fullscreen');
const sliderVolume = videoPlayer.querySelector('.slider_volume');
const sliderProgress = videoPlayer.querySelector('.slider_progress');

const lightThemeArray = [
    body,
    adaptiveMenu,
    videoButton,
    document.querySelector('.header_container'),
    document.querySelector('.hero_container'),
    document.querySelector('.contact_container'),
    document.querySelector('.contact_title'),
    document.querySelector('.contact_content')
];

let lang = 'en';
let theme = 'dark';

icon.forEach( (current) => lightThemeArray.push(current));
buttons.forEach( (current) => lightThemeArray.push(current));
sectionTitle.forEach( (current) => lightThemeArray.push(current));
langButton.forEach( (current) => lightThemeArray.push(current));
message.forEach( (current) => lightThemeArray.push(current));
videoIcon.forEach( (current) => lightThemeArray.push(current));

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

langSwitch.addEventListener('click', changeLang);
themeSwith.addEventListener('click', changeTheme);
navLinks.addEventListener('click', closeMenu);
hamburgerButton.addEventListener('click', menuOpenAndClose);
portfolioMenu.addEventListener('click', switchSeason);

videoButton.addEventListener('click', startVideo);
videoPlay.addEventListener('click', togglePlay);
videoViewer.addEventListener('click', togglePlay);
videoViewer.addEventListener('timeupdate', progress);
audioSlider.addEventListener('input', handleSliderVolume);
progressBar.addEventListener('input', handleProgress);
audioMute.addEventListener('click', toggleMute);
videoFullscreen.addEventListener('click', openFullscreen);
document.addEventListener('fullscreenchange', closeFullscreen);
videoViewer.addEventListener('ended', endedVideo);

function endedVideo() {
    updateButton('play');
    videoButton.classList.remove('video_start');
}

function handleProgress() {
    sliderProgress.style.background = `linear-gradient(
        to right,
        #bdae82 0%,
        #bdae82 ${progressBar.value}%,
        #fff ${progressBar.value}%,
        #fff 100%
    )`
    const percentValue = (videoViewer.duration / 100) * progressBar.value;
    videoViewer.currentTime = percentValue;
}

function progress () {
    const percentProgress = (videoViewer.currentTime / videoViewer.duration) * 100;
    progressBar.value = Math.round(percentProgress)
    sliderProgress.style.background = `linear-gradient(
        to right,
        #bdae82 0%,
        #bdae82 ${progressBar.value}%,
        #fff ${progressBar.value}%,
        #fff 100%
    )`
}

function handleSliderVolume() {
    if (videoViewer.muted) toggleMute();
    sliderVolume.style.background = `linear-gradient(
        to right,
        #bdae82 0%,
        #bdae82 ${audioSlider.value}%,
        #fff ${audioSlider.value}%,
        #fff 100%
    )`
    videoViewer.volume = audioSlider.value / 100;
    if (videoViewer.volume === 0) toggleMute();
}

function updateButton(button) {
    if (button === 'play') {
        videoPlay.classList.toggle('fa-play');
        videoPlay.classList.toggle('fa-pause');
    }

    if (button === 'mute') {
        audioMute.classList.toggle('fa-volume-up');
        audioMute.classList.toggle('fa-volume-off');
    }

    if (button === 'fullscreen') {
        videoFullscreen.classList.toggle('fa-expand');
        videoFullscreen.classList.toggle('fa-compress');
    }
}

function closeFullscreen() {
    if (!document.fullscreenElement) {
        updateButton('fullscreen');
        videoPlayer.classList.toggle('fullscreen');
    }
}

function openFullscreen() {
    if (!document.fullscreenElement) {
        if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
        } else if (videoPlayer.mozRequestFullScreen) {
            videoPlayer.mozRequestFullScreen();
        } else if (videoPlayer.webkitRequestFullscreen) {
            videoPlayer.webkitRequestFullscreen();
        } else if (videoPlayer.msRequestFullscreen) { 
            videoPlayer.msRequestFullscreen();
        }
        updateButton('fullscreen');
        videoPlayer.classList.add('fullscreen');
    } else {
        document.exitFullscreen();
    }
}

function toggleMute() {
    const statusMute = videoViewer.muted ? false : true;
    videoViewer.muted = statusMute;
    updateButton('mute')
}

function togglePlay() {
    const method = videoViewer.paused ? 'play' : 'pause';
    videoViewer[method]();
    updateButton('play')
    if (method === 'pause') videoButton.classList.remove('video_start');
    if (method === 'play') videoButton.classList.add('video_start');
}

function startVideo() {
    videoButton.classList.add('video_start');
    videoPoster.classList.add('video_start');
    videoViewer['play']();
    updateButton('play')
    videoViewer.volume = audioSlider.value / 100;
}

function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
}

function getLocalStorage() {
    if(localStorage.getItem('lang')) {
        const lang = localStorage.getItem('lang');
        getTranslate(lang);
    }
    if(localStorage.getItem('theme')) {
        if (localStorage.getItem('theme') == 'light')
        changeTheme();
    }
}

function changeTheme() {
    lightThemeArray.forEach( (current) => {
        current.classList.toggle('light_theme');
    })
    if (themeSwith.classList.contains('light_theme')) {
        theme = 'light'
    } else {
        theme = 'dark'
    }
}

function getTranslate(currentLang) {
    document.querySelectorAll('[data-i18]').forEach( (current) => {
        if (current.placeholder) {
            current.placeholder = i18Obj[currentLang][current.dataset.i18];
            current.textContent = '';
        } else {
            current.textContent = i18Obj[currentLang][current.dataset.i18];
        }
    })
    lang = currentLang
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