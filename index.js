createAutocomplete()
const dropdown = document.querySelector(".dropdown")
const menuContainer = document.getElementsByClassName("dropdown-content")[0]
const inputElem = document.getElementById("search-input")
const resultsWrapper = document.querySelector(".results")

let timeoutId;

const onInput = async event => {
    const movies = await fetchData(event.target.value)
    dropdown.classList.add("is-active")
    resultsWrapper.innerHTML = ""

    for (let movie of movies){
        // console.log(`Title: ${movie.Title} (${movie.Year})`);
        const option = createMovieElem(movie.Title, movie.Year, movie.Poster)
        resultsWrapper.appendChild(option)
    }
}
inputElem.addEventListener("input", debounce(onInput)) 