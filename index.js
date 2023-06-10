const fetchData = async (searchTerm) => {
    const response = await fetch(
        `http://www.omdbapi.com/?apikey=1d75e9fb&s=${searchTerm}`
    )
        .then((res) => res.json())
        .then((data) => console.log(data));

    return response;
};

const input = document.querySelector("input");
input.addEventListener("input", (event) => {
    fetchData(event.target.value);
});
