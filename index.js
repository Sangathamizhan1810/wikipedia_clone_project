let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function displayTheData(data) {
    let folder = document.createElement("div");
    folder.classList.add("result-item");
    searchResults.appendChild(folder);

    let head = document.createElement("h1");
    head.classList.add("result-title");
    head.style.color = "blue";
    folder.appendChild(head);

    let linkPara = document.createElement("a");
    linkPara.classList.add("link-description");
    linkPara.style.color = "green";
    linkPara.href = data.link;
    linkPara.target = "_blank";
    folder.appendChild(linkPara);

    let para = document.createElement("p");
    folder.appendChild(para);

    head.textContent = data.title;
    linkPara.textContent = data.link;
    para.textContent = data.description;
}

function orderTheData(result) {
    spinner.classList.toggle("d-none");

    for (let singleData of result) {
        displayTheData(singleData)
    }
}

function findTheData() {
    spinner.classList.toggle("d-none");

    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput.value;
    let option = {
        method: "GET"
    }

    fetch(url, option)
        .then(function(response) {
            return response.json()
        })
        .then(function(myData) {

            let obtainedData = myData.search_results;
            console.log(myData.search_results)
            orderTheData(obtainedData);
        })

}

searchInput.addEventListener("keydown", function(word) {
    if (word.key === "Enter") {
        searchResults.textContent = "";
        findTheData()
    }
});