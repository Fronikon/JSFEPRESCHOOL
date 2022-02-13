const filmsContainert = document.querySelector('.main_container');
// const search = document.querySelector('.search');

const url = 'https://api.themoviedb.org/3/discover/movie?api_key=50a977d70f35998a8bc0d01e3eef3d11&query=spring&page=1sort_by=popularity.desc'

// search.addEventListener('keyup', sendForm)

getData();

// function sendForm(e) {
//     if (e.code === 'Enter' && e.target.value.length > 0) {
        
//     };
// }

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results[0]);
    data.results.forEach( (current) => {
        createCard(current.poster_path, current.title, current.vote_average)
    })
}

function createCard(poster, title, rating) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${poster})`

    const titleElement = document.createElement('h2');
    titleElement.classList.add('film_title');
    titleElement.textContent = title;
    cardElement.append(titleElement);

    const ratingElement = document.createElement('span');
    ratingElement.classList.add('film_rating');
    ratingElement.textContent = rating;
    cardElement.append(ratingElement);

    filmsContainert.append(cardElement);
}