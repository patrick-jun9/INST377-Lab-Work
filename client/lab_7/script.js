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
  // console.table(collection);
  const targetList = document.querySelector('.resto-list'); // this is looking through
  // the document for any instance of resto list
  targetList.innerHTML = ''; // helps to stop redundancy after a submit
  collection.forEach((item) => {
    const injectItem = `<li>${item.name}</li>`; // takes the name from the large array and injects the
    // items using inner html += below
    targetList.innerHTML += injectItem;
  });
}
async function mainEvent() {
  console.log('script loaded');
  // the async keyword means we can make API requests
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('button');

  const resto = document.querySelector('#resto_Name');
  const city = document.querySelector('#city');
  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  // console.log(arrayFromJson);
  if (arrayFromJson.data.length > 0) { // prevents race conditions
    submit.style.display = 'block';

    resto.addEventListener('input', async (event) => {
      console.log(event.target.value);
    });
    form.addEventListener('submit', async (submitEvent) => {
    // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      // console.log('form submission'); // this is substituting for a "breakpoint"
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
      const restoArray = restoArrayMaker(arrayFromJson.data); // calls restoarraymaker to get the
      // right array for the actual HTML List
      creatingHTMLlist(restoArray); // calls the createHtml function to run and use resto array as
    // the paramater which would be what ever array we recieve
    });
  }
}
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
