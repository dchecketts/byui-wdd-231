import { getParkData } from "./parkService.mjs"

function heroBannerTemplate(info) {
  return `<div class="hero-banner">
    <img src="${info.images[0].url}" alt="${info.images[0].altText}" class="banner-img">
    <div class="hero-banner__content">
      <p>${info.name}</p>
      <div class="text-sm">
        <p>${info.designation}</p>
        <p>${info.states}</p>
      </div>
    </div>
  </div>`
}

function mainContentTemplate(info) {
  return `<h1 id="fullname" class="font-serif text-2xl md:text-4xl">${info.fullName}</h1>
  <p id="description" class="pt-5 pb-10">${info.description}</p>
  
  <section id="gallery" class="md:flex md:gap-5 md:justify-center">
    <div class="pb-5 w-fit h-fit">
      <div class="md:w-80 md:h-50"><img src="${info.images[1].url}" alt="${info.images[1].altText}" class="w-full h-full object-cover"></div>
      <p class="font-bold text-xl pt-3 pb-3">Current Conditions ></p>
      <p class="text-wrap md:w-80">See what conditions to expect in the park before leaving on your next trip!</p>
    </div>
    <div class="pb-5 w-fit h-fit">
      <div class="md:w-80 md:h-50"><img src="${info.images[2].url}" alt="${info.images[2].altText}" class="w-full h-full object-cover"></div>
      <p class="font-bold text-xl pt-3 pb-3">Fees and Passes ></p>
      <p class="text-wrap md:w-80">Learn about the fees and passes that are available.</p>
    </div>
    <div class="pb-5 w-fit h-fit">
      <div class="md:w-80 md:h-50"><img src="${info.images[3].url}" alt="${info.images[3].altText}" class="w-full h-full object-cover"></div>
      <p class="font-bold text-xl pt-3 pb-3">Visitor Centers ></p>
      <p class="text-wrap md:w-80">Learn about the visitor centers in the park.</p>
    </div>
  </section>`
}

function setFooterContent(info) {
  return `<section class="p-5">
    <p class="font-serif font-bold text-xl pt-5 pb-5">Contact Info</p>
    <section class=" flex flex-col">
    <span class="font-bold">Mailing Address:</span>
    <span>${info.addresses[1].line1}</span>
    <span>${info.addresses[1].city}, ${info.addresses[1].stateCode} ${info.addresses[1].postalCode}</span> 
    </section>
    
    <section class="flex flex-col">
      <span class="font-bold">Phone:</span>
      <span>${info.contacts.phoneNumbers[1].phoneNumber}</span>
    </section>
  </section>`
}

async function init() {
  const parkData = await getParkData()

  const disclaimer = document.querySelector(".disclaimer > a")
  disclaimer.href = parkData.url; disclaimer.innerHTML = parkData.fullName
  document.querySelector(".disclaimer").classList.add("p-5")
  document.querySelector(".disclaimer > a").classList.add("underline")

  const heroBanner = document.querySelector(".hero-banner")
  heroBanner.outerHTML = heroBannerTemplate(parkData)

  const mainContentArea = document.querySelector("#main")
  mainContentArea.insertAdjacentHTML("beforeend", mainContentTemplate(parkData))

  const footerContentArea = document.querySelector("#park-footer")
  footerContentArea.innerHTML = setFooterContent(parkData)

  // Styling things
  document.querySelector("#main").classList.add("p-5")
  document.querySelector("#park-footer").classList.add("bg-gray-100")
}

init()