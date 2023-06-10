const fetchData = async (searchTerm) => {
    const response = await fetch(
        `http://www.omdbapi.com/?apikey=1d75e9fb&s=${searchTerm}`
    )
        .then((res) => res.json())
        .then((data) => console.log(data));

    return response;
};

const input = document.querySelector("input");

let timeoutId;
const onInput = (event) => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        fetchData(event.target.value);
    }, 500);
};
input.addEventListener("input", onInput);
