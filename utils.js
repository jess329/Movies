const apikey = "989e5d5"

const fetchData = async (input) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: apikey,
            s: input
        }
    })
    if(response.data.Error) {
        console.log(response.data.Error);
    }

    return response.data.Search
}

const debounce = (func) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args)
        }, 1000)
    }
}

const createMovieElem = (title, year, img) => {
    const div = document.createElement("div")
    div.className = "movieDiv"
    const movieInfo = `
    <p>Movie Title: ${title} (${year})</p>
    <img src=${img} style="height: 200px;"/>
    `
    div.innerHTML = movieInfo

    return div
}