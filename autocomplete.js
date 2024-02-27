const createAutocomplete = ({ root, summary, side }) => {
    // creating the HTML for the dropdown menu inside of the deconstructed element root
    root.innerHTML = `
        <label><b>Search For a Movie</b></label>
        <input class="input"/>
        <div class="dropdown">  
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `

    // selecting the HTML elements inside of root
    const input = root.querySelector(".input")
    const dropdown = root.querySelector(".dropdown")
    const resultsWrapper = root.querySelector(".results")

    const onInput = async event => {
        // awaiting the data fetched from the API (here movies)
        const data = await fetchData(event.target.value)
        dropdown.classList.add("is-active")
        resultsWrapper.innerHTML = ""

        if(!data.length){
            dropdown.classList.remove("is-active")
            return;
        }

        for (let object of data){
            // create the HTML for one dropdown option at a time with a seperate function
            const option = createMovieElem(object.Title, object.Year, object.Poster)
            
            option.addEventListener("click", event => {
                // remove the dropdown menu when one option is clicked and show the info for that object
                dropdown.classList.remove("is-active")
                onOptionSelect(object, input, summary, side)
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