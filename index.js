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

    resultsWrapper.innerHTML = "";

    dropdown.classList.add("is-active");

    for (let movie of movies) {
        const option = document.createElement("a");

        option.classList.add("dropdown-item");
        option.innerHTML = `
            <img src="${movie.Poster}" />
            ${movie.Title}
        `;

        resultsWrapper.appendChild(option);
    }
};
input.addEventListener("input", debounce(onInput, 500));
