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

    const container = document.getElementsByClassName("autocomplete")[0]

    const dropdownContent = document.createElement("div")
    dropdownContent.className = "dropdown-content results"
    
    const dropdownMenu = document.createElement("div")
    dropdownMenu.className = "dropdown-menu"
    dropdownMenu.appendChild(dropdownContent)

    const inputField = document.createElement("input")
    inputField.id = "search-input"
    
    const dropdownWrapper = document.createElement("div")
    dropdownWrapper.className = "dropdown"
    dropdownWrapper.appendChild(inputField)
    dropdownWrapper.appendChild(dropdownMenu)

    container.appendChild(dropdownWrapper)
}

const createMovieElem = (title, year, img) => {
    // creating the HTML for one movie element of the dropdown menu

    const menuElem = document.createElement("a")
    menuElem.className = "dropdown-item"
    const movieInfo = `
        <img src=${img} />
        <p>${title} (${year})</p>
    `
    menuElem.innerHTML = movieInfo

    return menuElem
}