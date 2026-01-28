const baseUrl = "https://developer.nps.gov/api/v1/";
const listEl = document.querySelector('#outputList')

async function getJson(endpoint) {
    // replace this with your actual key
    const apiKey = "AeMhYYxyvdNLBh799bHkvhXX8i3QijlQ04xxV547";
    // construct the url: baseUrl + endpoint + parameters
    const url = baseUrl + endpoint;
    // set the options. The important one here is the X-Api-Key
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": apiKey
        }
    }
    // make the request
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    return data;
}


// getJson('alerts?parkCode=acad,dena');
getJson('activities/parks?q=climbing')
function listTemplate(item) {
    return `<li><a href="${item.url}" class="underline hover:text-sky-500">${item.fullName}</a>, ${item.states}</li>`
}

async function renderClimbingList() {
    const endpoint = "activities/parks?q=climbing"
    const listElement = document.getElementById("outputList")
    const data = await getJson(endpoint)
    const parks = data.data[0].parks
    const listHtml = parks.map(listTemplate).join("")
    listElement.innerHTML = listHtml
}
renderClimbingList()

// Get those that have the state code of ID
getJson('parks?stateCode=id')

// Campgrounds at City of Rocks
getJson('campgrounds?parkCode=ciro')

// What parks have climbing oprotunities?
getJson('activities/parks?q=climbing')

// Images with Bears
getJson('multimedia/galleries?q=bear')