let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAndAppendSearchResults(result) {
    let {
        link,
        title,
        description
    } = result;

    let resultsItem = document.createElement("div");
    resultsItem.classList.add("results-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("results-title");
    resultsItem.appendChild(titleEl);

    let titleBrEl = document.createElement("br");
    resultsItem.appendChild(titleBrEl);

    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("results-url");
    resultsItem.appendChild(urlEl);

    let linkBrEl = document.createElement("br");
    resultsItem.appendChild(linkBrEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultsItem.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultsItem);



}


function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");

    for (let result of searchResults) {
        createAndAppendSearchResults(result);
    }
}

function searchWiki(event) {
    if (event.key === "Enter") {

        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });


    }

}

searchInputEl.addEventListener("keydown", searchWiki);