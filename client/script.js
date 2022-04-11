const targetList = document.querySelector("tbody");
const targetBox = document.querySelector(".tile");

async function populateMacros() {
  const customRequest = await fetch("/api/table/data");
  const macrosData = await customRequest.json();

  macrosData.forEach((meal) => {
    const appendItem = document.createElement("tr");
    appendItem.innerHTML = `
    <th>${meal["meal_id"]}</th>
    <td>${meal["meal_name"]}</td>
    <td>${meal["calories"]}</td>
    <td>${meal["carbs"]}g</td>
    <td>${meal["sodium"]}mg</td>
    <td>${meal["protein"]}g</td>
    <td>${meal["fat"]}g</td>
    <td>${meal["cholesterol"]}mg</td>`;
    targetList.append(appendItem);
  });
}

//  This function fetches all dining halls and then populates the neraby restaurants on the home page
async function populateRestaurants() {
  const diningRequest = await fetch("/api/dining");
  const diningData = await diningRequest.json();

  diningData["data"].forEach((restaurant) => {
    const appendItem = document.createElement("div");
    appendItem.classList.add("tile", "has-text-centered", "is-parent", "is-3");
    appendItem.innerHTML = `
    <article class="tile is-child box has-background-link-dark ">
    <span class="subtitle has-text-light has-text-weight-bold">${
      restaurant["hall_name"]
    }</span>
    <br />
    <span class="has-text-light">${
      restaurant["hall_address"].split(",")[0]
    }</span>
    <br/>
    <span class="has-text-light">${
      restaurant["hall_address"].split(",")[1]
    }</span>
    </article>`;
    targetBox.append(appendItem);
  });
}
/* eslint-disable max-len */
function mapScript() {
  const mymap = L.map("mapid").setView([38.988751, -76.94774], 14);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiYWxlaXRjaDEtdW1kLWVkdSIsImEiOiJjazhpdTF3Y28wYTIzM2twNnAxc2g2N2tnIn0.I1tMmZhRRNRt3LF7QnnB4g",
    }
  ).addTo(mymap);
  return mymap;
}

async function dataFilter(mapFromMapFunction) {
  const form = document.querySelector("#search-form");
  const search = document.querySelector("#search");
  const targetList = document.querySelector(".target-list");
  const replyMessage = document.querySelector(".reply-message");

  const request = await fetch("/api/map/data");
  const data = await request.json();

  // this code fires when our form submits
  // it filters our data list and returns it to the HTML
  form.addEventListener("submit", async (event) => {
    targetList.innerText = "";

    event.preventDefault();
    console.log("submit fired", search.value);
    // eslint-disable-next-line max-len
    // make sure each returned restaurant _can_ be plotted on the map by checking for the value we need
    const filtered = data.filter(
      (record) =>
        (record.meal_name.toUpperCase().includes(search.value.toUpperCase()) &&
          record.hall_lat) ||
        (record.hall_name.toUpperCase().includes(search.value.toUpperCase()) &&
          record.hall_lat)
    );
    const topFive = filtered.slice(0, 5);

    if (topFive.length < 1) {
      replyMessage.classList.add("box");
      replyMessage.innerText = "No matches found";
    }

    console.table(topFive);

    topFive.forEach((item) => {
      const Lat = item.hall_lat;
      const Long = item.hall_long;
      console.log("markerLongLat", Long, Lat);
      const marker = L.marker([Lat, Long]).addTo(mapFromMapFunction);
      const popup = L.popup()
        .setLatLng([Lat, Long])
        .setContent(`<p>${item.hall_name}</p>`)
        .openOn(mapFromMapFunction);
      marker.bindPopup(popup).openPopup();
      mapFromMapFunction.addLayer(marker);
      const appendItem = document.createElement("li");
      appendItem.classList.add("block", "list-item");
      appendItem.innerHTML = `<div class="block"><div class="list-header is-size-5">${item.meal_name}</div><address class="is-size-6">${item.hall_name}</address></div>`;
      targetList.append(appendItem);
    });
    const Lat = topFive[0]?.hall_lat;
    const Long = topFive[0]?.hall_long;
    console.log("viewSet coords", Lat, Long);
    mapFromMapFunction.panTo([Lat, Long], 0);
  });

  // this listens for typing into our input box
  search.addEventListener("input", (event) => {
    console.log("input", event.target.value);
    if (search.value.length === 0) {
      // clear your "no matches found" code
      targetList.innerText = "";
    }
  });
}

async function windowActions() {
  populateMacros();
  populateRestaurants();
  const mapObject = mapScript(); // Load your map
  await dataFilter(mapObject); // load your food data
}

window.onload = windowActions;

function RandomIntInclusive(min, max) { // helps us to get random integer
  // to make our random resto array
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(
    Math.random() * (newMax - newMin + 1) + newMin
  );
}

function restoArrayMaker(dataArray) { // Takes the data from a range of 15
// then returns the list of items
  // console.log('fired dataHandler');
  // console.table(dataArray);
  const range = Array.from({length: 15}, (x, i) => i); // This is our range
  const listItems = range.map((item, index) => {
    const restoNum = RandomIntInclusive(0, dataArray.length - 1); // calls function
    // getrandomIntinclusive in order to return an array of values
    return dataArray[restoNum];
  });
  console.log(listItems);
  return listItems;
}
function creatingHTMLlist(collection) {
  // console.log('fired html');
  console.table(collection);
  const targetList = document.querySelector('.resto-list'); // this is looking through
  // the document for any instance of resto list
  targetList.innerHTML = ''; // helps to stop redundancy after a submit
  collection.forEach((item) => {
    const injectItem = `<li>${item.name}</li>`; // takes the name from the large array and injects the
    // items using inner html += below
    targetList.innerHTML += injectItem;
  });
}
function initMap() {
  const map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  }).addTo(map);
  return map;
}

async function mainEvent() {
  console.log('script loaded');
  // the async keyword means we can make API requests
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('button');

  const resto = document.querySelector('#resto_Name');
  const city = document.querySelector('#city');
  const map = initMap();
  // const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  // const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  // console.log(arrayFromJson);
  const arrayFromJson = {data: []}; // TOdo remove debug tool
  if (arrayFromJson.data.length > 0) { // prevents race conditions
    submit.style.display = 'block';

    let currentArray = [];
    resto.addEventListener('input', async (event) => {
      console.log(event.target.value);

      // if (currentArray.length < 1) {
      //  return;
      // }
      const restoMatch = arrayFromJson.data.filter((item) => {
        const lowerCase = item.name.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerCase.includes(lowerValue);
      });
      // creatingHTMLlist(restoMatch);
      console.log(restoMatch);
      creatingHTMLlist(restoMatch);
    });

    form.addEventListener('submit', async (submitEvent) => {
    // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      // console.log('form submission'); // this is substituting for a "breakpoint"
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
      currentArray = restoArrayMaker(arrayFromJson.data); // calls restoarraymaker to get the
      // right array for the actual HTML List
      creatingHTMLlist(currentArray); // calls the createHtml function to run and use resto array as
      // the paramater which would be what ever array we recieve
      console.log(currentArray);
    });
  }
}
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
