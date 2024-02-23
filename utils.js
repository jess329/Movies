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

const createAutocomplete = () => {
    // creating the HTML for the dropdown menu

    const container = document.querySelector(".autocomplete")
    container.innerHTML = `
        <label><b>Search For a Movie</b></label>
        <input class="input"/>
        <div class="dropdown">  
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `
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

const onMovieSelect = () => {
    
}