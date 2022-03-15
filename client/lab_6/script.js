function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(
    Math.random() * (newMax - newMin + 1) + newMin
  );
}

function restoArrayMaker(dataArray) {
  console.log('fired dataHandler');
  console.table(dataArray);
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restoNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restoNum];
  });
  console.log(listItems);
  return listItems;
}
function createHTMLlist(collection) {
  console.log('fired html');
  console.log(collection);
  const targetList = document.querySelector('.resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const injectItem = `<li>${item.name}</li>`;
    targetList.innerHTML += injectItem;
  });
}
async function mainEvent() {
  console.log('script loaded');
  // the async keyword means we can make API requests
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('button');
  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  console.log(arrayFromJson);
  if (arrayFromJson.data.length > 0) {
    submit.style.display = 'block';
    form.addEventListener('submit', async (submitEvent) => {
      // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      console.log('form submission'); // this is substituting for a "breakpoint"
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
      const restoArray = restoArrayMaker(arrayFromJson.data);
      createHTMLlist(restoArray);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
