const apikey = "989e5d5"

let leftMovie;
let rightMovie;

const fetchData = async (input) => {
    const response = await axios.get("https://www.omdbapi.com/", {
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

const runComparison = () => {
    const leftStats = document.querySelectorAll(".left-summary .notification")
    const rightStats = document.querySelectorAll(".right-summary .notification")
    // console.log(leftStats, rightStats);

    leftStats.forEach((leftArticle, index) => {
        const rightArticle = rightStats[index]
        const leftValue = leftArticle.dataset.value
        const rightValue = rightArticle.dataset.value

        // console.log(leftArticle, rightArticle);

        if(leftValue < rightValue){
            leftArticle.classList.remove("is-primary")
            leftArticle.classList.add("is-warning")
        }else if(leftValue > rightValue){
            rightArticle.classList.remove("is-primary")
            rightArticle.classList.add("is-warning")
        }
    })
}

const onOptionSelect = async (movie, input, summary, side) => {
    input.value = movie.Title
    document.querySelector(".tutorial").classList.add("is-hidden")
    const objectData = await axios.get("https://www.omdbapi.com/", {
        params: {
            apikey: apikey,
            i: movie.imdbID
        }
    })
    console.log(objectData.data);
    infoTemplate(objectData.data, summary)

    if(side === "left"){
        leftMovie = objectData.data
    } else{
        rightMovie = objectData.data
    }
    console.log(leftMovie, rightMovie);

    if(leftMovie && rightMovie){
        runComparison()
    }
}


const infoTemplate = (object, summary) => {
    const moneyStr = object.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
    const moneyInt = parseInt(moneyStr)
    const metascore = parseInt(object.Metascore)
    const rating = parseFloat(object.imdbRating)
    const votes = parseInt(object.imdbVotes.replace(/,/g, ""))
    let awardsSum = 0
    const awards = object.Awards.split(" ")
    for(let i of awards){
        if(!isNaN(parseInt(i))){
            awardsSum += parseInt(i)
        }
    }

    // console.log(moneyInt, metascore, rating, votes, awardsSum);

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
        <article data-value=${awardsSum} class="notification is-primary">
            <p class="title">${object.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${moneyInt} class="notification is-primary">
            <p class="title">${object.BoxOffice}</p>
            <p class="subtitle">Revenue</p>
        </article>
        <article data-value=${metascore} class="notification is-primary">
            <p class="title">${object.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value=${rating} class="notification is-primary">
            <p class="title">${object.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value=${votes} class="notification is-primary">
            <p class="title">${object.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    ` 
}