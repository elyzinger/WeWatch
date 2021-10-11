const http = new XMLHttpRequest();
const api_key = "2c46288716a18fb7aadcc2a801f3fc6b";
const url_Popular = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`;
const url_Rated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`;
const url_Now = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`;
let num_Favorit = 0;
let movies = [];
let allMovies = [];
let favorites = [];

document.getElementById("favId").innerHTML = `Favorite{${favorites.length}}`;

var btnContainer = document.getElementById("menuId");

// Get all buttons with class="btn" inside the container
let btns = btnContainer.getElementsByClassName("btn");

// Loop through the buttons and add the active class to the current/clicked button
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");

    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    // Add the active class to the current/clicked button
    this.className += " active";
  });
}

onHomeClick();

http.onreadystatechange = function () {
  document.querySelectorAll(".boxes").forEach(el => el.remove());
  document.querySelectorAll(".movie").forEach(el => el.remove());
  let DONE = 4; // readyState 4 means the request is done.
  let OK = 200; // status 200 is a successful return.
  if (http.readyState === DONE) {
    if (http.status === OK) {
      let dynamic = document.querySelector(".container");
      movies = JSON.parse(this.responseText); // 'This is the returned json.'
      movies.results
        .slice()
        .reverse()
        .forEach(element => {
          let fetch = document.querySelector(".container").innerHTML;
          dynamic.innerHTML =
            ` <div  id="${element["id"]}" class="boxes" onclick="movieInfo(this.id)">
        <div class="box-content">
            <h2>${element["original_title"]}</h2>
        </div>
        </div>` + fetch;

          var bgimg = document.getElementById(`${element["id"]}`);
          bgimg.style.backgroundImage = `url('https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${element["poster_path"]}')`;
        });
    } else {
      console.log("Error: " + http.status); // An error occurred during the request.
    }
  }
};

function onHomeClick() {
  http.open("GET", url_Popular);
  http.send();
  http.onreadystatechange;
}
function onRatedClick() {
  http.open("GET", url_Rated);
  http.send();
  http.onreadystatechange;
}
function onNowClick() {
  http.open("GET", url_Now);
  http.send();
  http.onreadystatechange;
}
function onFavClick() {
  document.querySelectorAll(".boxes").forEach(el => el.remove());
  document.querySelectorAll(".movie").forEach(el => el.remove());
  dynamic = document.querySelector(".container");
  favorites
    .slice()
    .reverse()
    .forEach(element => {
      fetch = document.querySelector(".container").innerHTML;
      dynamic.innerHTML =
        ` <div  id="${element["id"]}" class="boxes" onclick="movieInfo(this.id)">
    <div class="box-content">
        <h2>${element["original_title"]}</h2>
    </div>
    </div>` + fetch;
      var bgimg = document.getElementById(`${element["id"]}`);
      bgimg.style.backgroundImage = `url('https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${element["poster_path"]}')`;
    });
}

function onFavAdd(movieId) {
  let movie = movies.results.find(x => x.id == movieId);
  let find = favorites.find(x => x.id == movieId);
  if (find == undefined) {
    favorites.push(movie);
  }
  document.getElementById("favId").innerHTML = `Favorite{${favorites.length}}`;
}
function movieInfo(movieId) {
  document.querySelectorAll(".boxes").forEach(el => el.remove());
  document.querySelectorAll(".movie").forEach(el => el.remove());
  dynamic = document.querySelector(".container");
  let movie = movies.results.find(x => x.id == movieId);
  if (movie == undefined) {
    movie = favorites.find(x => x.id == movieId);
  }

  dynamic.innerHTML = ` <div  id="${movie["id"]}" class="movie">
     <div class="movie-content">
         <h2>${movie["original_title"]}</h2>
         <p>${movie["overview"]}</p>
            <button class="btnFav" onclick="onFavAdd(${movieId})">
              Add To Favorite
            </button> 
     </div>
    </div>`;
  var bgimg = document.getElementById(`${movie["id"]}`);
  bgimg.style.backgroundImage = `url('https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie["poster_path"]}')`;
}
