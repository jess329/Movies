createAutocomplete()
const autocomplete = document.querySelector(".autocomplete")
const dropdown = document.querySelector(".dropdown")
const menuContainer = document.querySelector(".dropdown-content")
const inputElem = document.querySelector("input")
const resultsWrapper = document.querySelector(".results")
// const movieInfo = document.querySelector(".movieInfo")


let timeoutId;

const onInput = async event => {
    const movies = await fetchData(event.target.value)
    dropdown.classList.add("is-active")
    resultsWrapper.innerHTML = ""

    if(!movies.length){
        dropdown.classList.remove("is-active")
        return;
    }

    for (let movie of movies){
        // console.log(`Title: ${movie.Title} (${movie.Year})`);
        const option = createMovieElem(movie.Title, movie.Year, movie.Poster)
        option.addEventListener("click", event => {
            dropdown.classList.remove("is-active")
            inputElem.value = movie.Title
            onMovieSelect(movie)
        })

        resultsWrapper.appendChild(option)
    }
}
inputElem.addEventListener("input", debounce(onInput)) 

document.addEventListener("click", event => {
    if(!autocomplete.contains(event.target)) {
        dropdown.className = "dropdown"
    }
})