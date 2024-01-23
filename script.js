const apiKey = "3ca7212de353f5c0dda1c17ee8d84e64";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`; //Робить зображення
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;

const main = document.getElementById("main");

const form = document.getElementById("form");
const search = document.getElementById("search");

async function getMovies(url) {
  const res = await fetch(url); //метод використовується для виклику ресурсів з мережі (у цьому випадку, URL-адреса url). Він повертає об'єкт відповіді (response), який містить інформацію про відповідь на запит.
  const data = await res.json(); //чекаємо, доки метод json() не розпакує JSON з відповіді.

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    vote = vote_average.toFixed(1);

    const movieEL = document.createElement("div");
    movieEL.classList.add("movie");

    movieEL.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote)}">${vote}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
`;
    main.appendChild(movieEL);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

getMovies(API_URL);

form.addEventListener("submit", async (e) => {
  e.preventDefault(); //відміняю перезавантаженні сторінки при відправці форми

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    await getMovies(`${SEARCH_API}&query=${searchTerm}`);

    search.value = "";
  } else {
    window.location.reload(); // оновити сторінку при пустому запиті
  }
});
