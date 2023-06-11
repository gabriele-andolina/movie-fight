const fetchData = async (searchTerm) => {
    const response = await fetch(
        `http://www.omdbapi.com/?apikey=1d75e9fb&s=${searchTerm}`
    )
        .then((res) => res.json())
        .then((data) => {
            return data.Search;
        });

    console.log(response);
    return response;
};

const input = document.querySelector("input");

const onInput = async (event) => {
    const movies = await fetchData(event.target.value);

    for (let movie of movies) {
        const div = document.createElement("div");

        div.innerHTML = `
            <img src="${movie.Poster}" />
            <h1>${movie.Title}</h1>
        `;

        document.querySelector("#target").appendChild(div);
    }
};
input.addEventListener("input", debounce(onInput, 500));
