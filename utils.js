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
    // creating the HTML for one movie element of the dropdown menu

    const menuElem = document.createElement("a")
    menuElem.className = "dropdown-item"
    const imgSrc = img === "N/A" ? "" : img;
    const movieInfo = `
        <img src="${imgSrc}" />
        <p>${title} (${year})</p>
    `
    menuElem.innerHTML = movieInfo

    return menuElem
}

const onOptionSelect = async (movie) => {
    const objectData = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: apikey,
            i: movie.imdbID
        }
    })
    console.log(objectData.data);
    infoTemplate(objectData.data)
}

const infoTemplate = (object) => {
    const summary = document.querySelector(".summary")

    summary.innerHTML = `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${object.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${object.Title}</h1>
                    <h4>${object.Genre}</h4>
                    <p>${object.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${object.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${object.BoxOffice}</p>
            <p class="subtitle">Revenue</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${object.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${object.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${object.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    ` 
}