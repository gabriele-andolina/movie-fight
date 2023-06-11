const fetchData = async (searchTerm) => {
    const response = await fetch(
        `http://www.omdbapi.com/?apikey=1d75e9fb&s=${searchTerm}`
    )
        .then((res) => res.json())
        .then((data) => console.log(data));

    return response;
};

const input = document.querySelector("input");

const debounce = (callbackFunc) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callbackFunc.apply(null, args);
        }, 1000);
    };
};

const onInput = debounce((event) => {
    fetchData(event.target.value);
});
input.addEventListener("input", onInput);
