const fetchData = async (searchTerm) => {
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
};

const root = document.querySelector(".autocomplete");
root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const onInput = async (event) => {
    const movies = await fetchData(event.target.value);

    if (!movies.length) {
        dropdown.classList.remove("is-active");
        return;
    }

    resultsWrapper.innerHTML = "";

    dropdown.classList.add("is-active");

    for (let movie of movies) {
        const option = document.createElement("a");
        const imgSource = movie.Poster === "N/A" ? "" : movie.Poster;

        option.classList.add("dropdown-item");
        option.innerHTML = `
            <img src="${imgSource}" />
            ${movie.Title}
        `;
        option.addEventListener("click", () => {
            dropdown.classList.remove("is-active");
            input.value = movie.Title;
            onMovieSelect(movie);
        });

        resultsWrapper.appendChild(option);
    }
};
input.addEventListener("input", debounce(onInput, 500));

document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
        dropdown.classList.remove("is-active");
    }
});

const onMovieSelect = async (movie) => {
    const response = await fetch(
        `http://www.omdbapi.com/?apikey=1d75e9fb&i=${movie.imdbID}`
    )
        .then((res) => res.json())
        .then((data) => console.log(data));
};
