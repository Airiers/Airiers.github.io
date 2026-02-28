"use strict";
const TMDB_API_KEY = "f18578237a7eb9663e6bf483d40def43";
const url = new URL(window.location.href);
const movieId = url.searchParams.get("movie");
if (movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=fr-FR`)
        .then((res) => {
        return res.json();
    })
        .then((movie) => {
        putInfos(movie);
    });
}
function putInfos(movie) {
    const title = document.querySelector("title");
    const release_date = new Date(movie.release_date);
    const h1 = document.querySelector("#title");
    const poster = document.querySelector("#poster");
    const overview = document.querySelector("#overview");
    const body = document.querySelector("body");
    const tagline = document.querySelector("#tagline");
    const runtime = document.querySelector("#runtime");
    const vote_average = document.querySelector("#vote_average");
    const genres = document.querySelector("#genres");
    if (title) {
        title.textContent = movie.title;
    }
    if (h1) {
        h1.textContent = `${movie.title} (${release_date.getFullYear()})`;
    }
    if (poster) {
        poster.alt = `${movie.title} poster`;
        poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }
    if (overview) {
        if (movie.overview) {
            overview.textContent = movie.overview;
        }
    }
    if (body) {
        body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`;
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center center";
        body.style.backgroundAttachment = "fixed";
    }
    if (tagline) {
        if (movie.tagline) {
            tagline.textContent = movie.tagline;
        }
    }
    if (runtime) {
        runtime.textContent = `${movie.runtime} minutes`;
    }
    if (vote_average) {
        vote_average.innerHTML = `<span class="note">${movie.vote_average}</span>/10`;
    }
    if (genres) {
        movie.genres.forEach((genre) => {
            genres.innerHTML += `<div>${genre.name}</div>`;
        });
    }
    const collectionTitle = document.querySelector("#collectionTitle");
    if (movie.belongs_to_collection) {
        fetch(`https://api.themoviedb.org/3/collection/${movie.belongs_to_collection.id}?api_key=${TMDB_API_KEY}&language=fr-FR`)
            .then((res) => {
            return res.json();
        })
            .then((collection) => {
            const collectionList = document.querySelector("#collection");
            if (collectionList && collectionTitle) {
                collectionTitle.textContent = `Collection ${collection.name}`;
                collection.parts.forEach((movie) => {
                    collectionList.innerHTML += `<div class="otherMovie" title="${movie.title}"><a href="?movie=${movie.id}"><h3>${movie.title}</h3><img src="${`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="${movie.title} poster" height="300px"></a></div>`;
                });
            }
        });
    }
    else {
        if (collectionTitle) {
            collectionTitle.style.display = "none";
        }
    }
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${TMDB_API_KEY}&language=fr-FR`)
        .then((res) => {
        return res.json();
    })
        .then((similar) => {
        const similarList = document.querySelector("#similar");
        if (similarList) {
            similar.results.forEach((movie) => {
                similarList.innerHTML += `<div class="otherMovie" title="${movie.title}"><a href="?movie=${movie.id}"><h3>${movie.title}</h3><img src="${`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="${movie.title} poster" height="300px"></a></div>`;
            });
        }
    });
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=fr-FR`)
        .then((res) => {
        return res.json();
    })
        .then((credits) => {
        const actors = document.querySelector("#actors");
        const toggleBtn = document.querySelector("#toggleActors");
        if (actors) {
            credits.cast.forEach((actor, index) => {
                actors.innerHTML += `<a class="actorCard ${index >= 3 ? "extraActor hidden" : ""}" href="../cornscore/person.html?person${actor.id}"><img src="https://image.tmdb.org/t/p/original/${actor.profile_path}"><div class="names"><span class="actorName">${actor.name}</span><span class="actorCharacter">${actor.character}</span></div></a>`;
                console.log(actor);
            });
        }
    });
}
