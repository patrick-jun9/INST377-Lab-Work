
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
function initMap(targetId) {
  const latLong = [38.784,-76.872,];
  const map = L.map('map').setView([latLong], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(map);
  return map;
}
function addMarkers(map, collection) {
  collection.forEach((item) => {
    const point = item.geocoded_colomn_1?.coordinates;
    console.log(item.geocoded_colomn_1?.coordinates);
    L.marker([point[1],point[0]]).addTo(map);
  });
}

async function mainEvent() {
  console.log('script loaded');
  // the async keyword means we can make API requests
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('button');

  const resto = document.querySelector('#resto_Name');
  const city = document.querySelector('#city');
  const map = initMap('map');
  const retrievalVar = 'res=taurants';
  submit.style.display = 'none';

  if (localStorage.getItem(retrievalVar) === undefined)
  // const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  // const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  // console.log(arrayFromJson);
  {localStorage.getItem(retrievalVar, JSON.stringify(arrayFromJson.data)); }
  const storedDataString = localStorage.getItem(retrievalVar)
  const storedDataArray = Json.parse(storedDataString);
  console.log(storedDataArray);
  // const arrayFromJson = {data: []}; // TOdo remove debug tool
  if (storedDataArray.length > 0) { // prevents race conditions
    submit.style.display = 'block';

    let currentArray = [];
    resto.addEventListener('input', async (event) => {
      console.log(event.target.value);

      // if (currentArray.length < 1) {
      //  return;
      // }
      const restoMatch = storedDataArray.filter((item) => {
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
      currentArray = restoArrayMaker(storedDataArray); // calls restoarraymaker to get the
      // right array for the actual HTML List
      creatingHTMLlist(currentArray); // calls the createHtml function to run and use resto array as
      // the paramater which would be what ever array we recieve
      addMarkers(map,currentArray);
      console.log(currentArray);
    });
  }
}
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
