const createAutocomplete = ({ root }) => {
    // creating the HTML for the dropdown menu
    root.innerHTML = `
        <label><b>Search For a Movie</b></label>
        <input class="input"/>
        <div class="dropdown">  
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `

    const input = root.querySelector(".input")
    const dropdown = root.querySelector(".dropdown")
    const resultsWrapper = root.querySelector(".results")

    const onInput = async event => {
    const data = await fetchData(event.target.value)
    dropdown.classList.add("is-active")
    resultsWrapper.innerHTML = ""

    if(!data.length){
        dropdown.classList.remove("is-active")
        return;
    }

    for (let object of data){
        // get the HTML for one dropdown option at a time
        const option = createMovieElem(object.Title, object.Year, object.Poster)
        option.addEventListener("click", event => {
            dropdown.classList.remove("is-active")
            input.value = object.Title
            onOptionSelect(object)
        })

        resultsWrapper.appendChild(option)
    }
    }
    input.addEventListener("input", debounce(onInput)) 

    document.addEventListener("click", event => {
        if(!root.contains(event.target)) {
            dropdown.className = "dropdown"
        }
    })

}