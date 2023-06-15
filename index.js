const autoCompleteConfig = {
    renderOption(movie) {
        const imgSource = movie.Poster === "N/A" ? "" : movie.Poster;
        return `
        <img src="${imgSource}" />
        ${movie.Title} (${movie.Year})
    `;
    },
    inputValue(movie) {
        return movie.Title;
    },
    async fetchData(searchTerm) {
        const response = await fetch(
            `http://www.omdbapi.com/?apikey=1d75e9fb&s=${searchTerm}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.Error) {
                    console.log(data.Error);
                    return [];
                }
                return data.Search;
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(response);
        return response;
    },
};

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector("#left-autocomplete"),
    onOptionSelect(movie) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelect(movie, document.querySelector("#left-summary"), "left");
    },
});
createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector("#right-autocomplete"),
    onOptionSelect(movie) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelect(movie, document.querySelector("#right-summary"), "right");
    },
});

let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryElement, side) => {
    const response = await fetch(
        `http://www.omdbapi.com/?apikey=1d75e9fb&i=${movie.imdbID}`
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            summaryElement.innerHTML = movieTemplate(data);

            if (side === "left") {
                leftMovie = data;
            } else {
                rightMovie = data;
            }

            if (leftMovie && rightMovie) {
                runComparison();
            }
        });
};

const runComparison = () => {
    console.log("Time for comparison!");
};

const movieTemplate = (movieDetails) => {
    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetails.Poster}">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetails.Title}</h1>
                <h4>${movieDetails.Genre}</h4>
                <p>${movieDetails.Plot}</p>
            </div>
        </div>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetails.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetails.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetails.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetails.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetails.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>
    `;
};
