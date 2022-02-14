const filmsContainert = document.querySelector('.main_container');
const search = document.getElementById('search');

const url = 'https://api.themoviedb.org/3/discover/movie?api_key=50a977d70f35998a8bc0d01e3eef3d11&query=spring&page=1sort_by=popularity.desc'

search.addEventListener('submit', sendForm);

getData(url);

function sendForm(e) {
    e.preventDefault();
    let searchForm = e.target.querySelector('.search')
    if (searchForm.value.length > 0) {
        const currentElement = filmsContainert.querySelectorAll('.card')

        currentElement.forEach( (current) => {
            filmsContainert.removeChild(current)
        })

        const url = `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${searchForm.value}`
        getData(url);
    };
}

function showData(data) {
    if (data.results.length > 0) {
        data.results.forEach( (current) => {
            createCard(current.poster_path, current.title, current.vote_average, current.overview)
        })
    } else {
        alert('Nothing was found for your query.')
    }
}

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    showData(data)
}

function createCard(poster, title, rating, discription) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    if (poster !== null) {
        cardElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${poster})`
    }

    const titleElement = document.createElement('h2');
    titleElement.classList.add('film_title');
    titleElement.textContent = title;
    cardElement.append(titleElement);

    const discriptionElement = document.createElement('div');
    discriptionElement.classList.add('discription');
    if (discription === '') {
        discriptionElement.textContent = 'Description not found.'
    } else {
        discriptionElement.textContent = discription;
    }
    cardElement.append(discriptionElement);

    const ratingElement = document.createElement('span');
    ratingElement.classList.add('film_rating');
    if (rating >= 8) ratingElement.classList.add('rating_good');
    if (rating >= 5 && rating < 8) ratingElement.classList.add('rating_well');
    if (rating < 5) ratingElement.classList.add('rating_bad');
    ratingElement.textContent = rating;
    cardElement.append(ratingElement);



    filmsContainert.append(cardElement);
}