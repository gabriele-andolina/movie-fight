const fetchData = async () => {
    const response = await fetch(
        "http://www.omdbapi.com/?apikey=1d75e9fb&s=avengers"
    )
        .then((res) => res.json())
        .then((data) => console.log(data));

    return response;
};

fetchData();
