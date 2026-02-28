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
                    collectionList.innerHTML += `<div class="otherMovie" title="${movie.title}"><a href="?movie=${movie.id}"><h3>${movie.title}</h3><img src="https://image.tmdb.org/t/p/w500${movie.poster_path} alt="${movie.title} poster" height="300px"></a></div>`;
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
        if (similar.results.length > 0) {
            const similarList = document.querySelector("#similar");
            if (similarList) {
                similar.results.forEach((movie) => {
                    similarList.innerHTML += `<div class="otherMovie" title="${movie.title}"><a href="?movie=${movie.id}"><h3>${movie.title}</h3><img src="https://image.tmdb.org/t/p/w500${movie.poster_path} alt="${movie.title} poster" height="300px"></a></div>`;
                });
            }
        }
        else {
            const similarHead = document.querySelector("#similarHead");
            if (similarHead) {
                similarHead.remove();
            }
        }
    });
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=fr-FR`)
        .then((res) => {
        return res.json();
    })
        .then((credits) => {
        const actors = document.querySelector("#actors");
        if (actors) {
            credits.cast.forEach((actor, index) => {
                actors.innerHTML += `<a class="actorCard ${index >= 3 ? "extraActor hidden" : ""}" href="../cornscore/person.html?person${actor.id}"><img src="https://image.tmdb.org/t/p/original/${actor.profile_path}"><div class="names"><span class="actorName">${actor.name}</span><span class="actorCharacter">${actor.character}</span></div></a>`;
            });
        }
    });
}
if (url.searchParams.has("query")) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=fr-FR&query=${url.searchParams.get("query")}&page=1`)
        .then((res) => {
        return res.json();
    })
        .then((result) => {
        putResults(result);
    });
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=fr-FR&query=${url.searchParams.get("query")}&page=2`)
        .then((res) => {
        return res.json();
    })
        .then((result) => {
        putResults(result);
    });
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=fr-FR&query=${url.searchParams.get("query")}&page=23`)
        .then((res) => {
        return res.json();
    })
        .then((result) => {
        putResults(result);
    });
}
function putResults(response) {
    const body = document.querySelector("body");
    const resultList = document.querySelector("#results");
    if (body) {
        body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url("https://png.pngtree.com/thumb_back/fh260/background/20230703/pngtree-3d-rendered-movie-theatre-with-white-screen-image_3732826.jpg")`;
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center center";
        body.style.backgroundAttachment = "fixed";
    }
    if (resultList) {
        response.results.forEach((movie) => {
            if (movie.release_date && movie.poster_path) {
                const release_date = new Date(movie.release_date);
                resultList.innerHTML += `<div class="queryCard otherMovie" title="${movie.title} (${release_date.getFullYear()})"><a href="/cornscore/movie.html?movie=${movie.id}"><h3>${movie.title} (${release_date.getFullYear()})</h3><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster" height="300px"></a></div>`;
            }
        });
        const movies = document.querySelectorAll(".queryCard");
        movies.forEach((movieDiv) => {
            movieDiv.addEventListener("mouseenter", () => {
                var _a;
                const movieId = (_a = movieDiv.querySelector("a")) === null || _a === void 0 ? void 0 : _a.href.split("?movie=")[1];
                if (movieId) {
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=fr-FR`)
                        .then((res) => res.json())
                        .then((movie) => {
                        if (movie.backdrop_path) {
                            const newBg = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)),
                            url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`;
                            setBackground(newBg);
                        }
                    });
                }
            });
            movieDiv.addEventListener("mouseleave", () => {
                const defaultBg = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)),
            url("https://png.pngtree.com/thumb_back/fh260/background/20230703/pngtree-3d-rendered-movie-theatre-with-white-screen-image_3732826.jpg")`;
                setBackground(defaultBg);
            });
        });
    }
    function setBackground(newBg) {
        const body = document.body;
        // Applique le nouveau bg sur ::after, puis fade in
        body.style.setProperty("--bg-next", newBg);
        body.classList.add("transitioning");
        // Une fois la transition finie, swap les backgrounds et reset
        setTimeout(() => {
            body.style.setProperty("--bg-current", newBg);
            body.classList.remove("transitioning");
            body.style.setProperty("--bg-next", "none");
        }, 100); // correspond à la durée de transition CSS
    }
}
