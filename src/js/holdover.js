import { getParkData } from "./parkService.mjs"


function parkInfoTemplate(info) {
  return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`
}


function setParkInfoLinks(parkData) {
  return [
    {
      name: "Current Conditions &#x203A;",
      link: "conditions.html",
      image: parkData.images[0].url,
      description:
        "See what conditions to expect in the park before leaving on your trip!"
    },
    {
      name: "Fees and Passes &#x203A;",
      link: "fees.html",
      image: parkData.images[0].url,
      description: "Learn about the fees and passes that are available."
    },
    {
      name: "Visitor Centers &#x203A;",
      link: "visitor_centers.html",
      image: parkData.images[9].url,
      description: "Learn about the visitor centers in the park."
    }
  ]
}


function mediaCardTemplate(info) {
  return `<div class="media-card"><a href="${info.link}">
    <img src="${info.image}" alt="${info.description}">
    <span class="media-card-name">${info.name}</span>
    <span>${info.description}</span>
  </a></div>`
}

function mainContentTemplate(info) {
  return `<h1 id="fullname">${info.fullName}</h1>
  <p id="description">
    <span>${info.description}</span>
  </p>
  
  <section id="gallery">
    <div id="img-1"><a href="#">
      <img src="${info.images[2].url}" alt="${info.images[2].altText}"></img>
      <p id="img-subtitle">Current Conditions ></p>
      <p>See what conditions to expect in the park before leaving on your next trip!</p>
    </a></div>
    <div id="img-2"><a href="#">
      <img src="${info.images[3].url}" alt="${info.images[3].altText}"></img>
      <p id="img-subtitle">Fees and Passes</p>
      <p>Learn about the fees and passes that are available.</p>
    </a></div>
    <div id="img-3"><a href="#">
      <img src="${info.images[9].url}" alt="${info.images[9].altText}"></img>
      <p id="img-subtitle">Visitor Centers</p>
      <p>Learn about the visitor centers in the park.</p>
    </a></div>
  </section>`
}


function footerContentTemplate(info) {
  return `<p id="footer-header">Contact Info</p>
  <div id="mailing">
    <span>Mailing Address:</span>
    <span>${info.addresses[1].line1}</span>
    <span>${info.addresses[1].city}, ${info.addresses[1].stateCode} ${info.addresses[1].postalCode}</span>
  </div>

  <div id="phone">
    <span>Phone:</span>
    <span>${info.contacts.phoneNumbers[1].phoneNumber}</span>
  </div>
  `
}


async function init() {
  const parkData = await getParkData();

  const disclaimer = document.querySelector(".disclaimer > a")
  disclaimer.href = parkData.url
  disclaimer.innerHTML = parkData.fullName

  const bannerImg = document.querySelector(".banner-img")
  bannerImg.src = parkData.images[0].url
  bannerImg.alt = parkData.images[0].altText

  const heroBanner = document.querySelector(".hero-banner__content")
  heroBanner.insertAdjacentHTML("beforeend", parkInfoTemplate(parkData))

  
  const parkInfoLinks = setParkInfoLinks(parkData)

  const main = document.querySelector("#main")
  main.insertAdjacentHTML("beforeend", mainContentTemplate(parkData))

  const footer = document.querySelector("#park-footer")
  footer.insertAdjacentHTML("beforeend", footerContentTemplate(parkData))

}

init();