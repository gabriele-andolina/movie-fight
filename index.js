const fetchData = async (searchTerm) => {
    const response = await fetch(
        `http://www.omdbapi.com/?apikey=1d75e9fb&s=${searchTerm}`
    )
        .then((res) => res.json())
        .then((data) => console.log(data));

    return response;
};

const input = document.querySelector("input");

const debounce = (callbackFunc, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callbackFunc.apply(null, args);
        }, delay);
    };
};

const onInput = (event) => {
    fetchData(event.target.value);
};
input.addEventListener("input", debounce(onInput, 500));
