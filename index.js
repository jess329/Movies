const container = document.getElementsByClassName("movies")[0]
const inputElem = document.getElementById("search-input")
let timeoutId;

const onInput = async event => {
    const movies = await fetchData(event.target.value)
    console.log(movies);

    for (let movie of movies){
        // console.log(`Title: ${movie.Title} (${movie.Year})`);
        const movieElem = createMovieElem(movie.Title, movie.Year, movie.Poster)
        container.appendChild(movieElem)
    }
}
inputElem.addEventListener("input", debounce(onInput)) 