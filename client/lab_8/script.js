


function processRestaurants(list) {
    console.log('fired restaurants list');
    
  }
  
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
  
  
  function injectHTML(list) {
    console.log('fired injectHTML');
    const target = document.querySelector('#restaurant_list');
    target.innerHTML = '';
    list.forEach((item) => {
      const str = `<li>${item.name}</li>`;
      target.innerHTML += str;
    });
 
  }
  
  function filterList(list, query) {
    return list.filter((item) =>{
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery);
    });
  }
  
  function cutRestaurantList() {
    console.log('fired cut lsit');
    const range = [...Array(15).keys()];
    const newArray = range.map(() =>{
      const idx = getRandomIntInclusive(0, list.length - 1);
      return list[idx]
    })
    
  }
  
  
  
  async function mainEvent() {
    
    const mainForm = document.querySelector('.main_mainForm'); // get your main mainForm so you can do JS with it
    const submit = document.querySelector('button[type="submit"]'); // get a reference to your submit button
    //const filterDataButton = document.querySelector('.filter');
    const loadDataButton = document.querySelector('#data_load');
    const generateListButton = document.querySelector('#generate');
    const textField = document.querySelector('#resto');
   
   
    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = 'none';
    generateListButton.classList.add('hidden');

    const storedData = localStorage.getItem('storedData');
    const parsedData = JSON.parse(storedData);

    if(parsedData.length > 0) {
      generateListButton.classList.remove("hidden");
    }
  
 
    let currentList = [];
    
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const arrayFromJson = await results.json(); // here is where we get the data from our request as JSON
  
    
    console.table(arrayFromJson.data);
  
    console.log(`${arrayFromJson.data[0].name} ${arrayFromJson.data[0].category}`);
  
    // This IF statement ensures we can't do anything if we don't have inmainFormation yet
    if (arrayFromJson.data?.length > 0) { // the question mark in this means "if this is set at all"
      submit.style.display = 'block'; // let's turn the submit button back on by setting it to display as a block when we have data available
  
      
      mainForm.addEventListener('submit', (submitEvent) => {
        // This is needed to stop our page from changing to a new URL even though it heard a GET request
        submitEvent.preventDefault();
  
        // This constant will have the value of your 15-restaurant collection when it processes
        const restaurantList = processRestaurants(arrayFromJson.data);
  
        // And this function call will permainForm the "side effect" of injecting the HTML list for you
        injectHTML(restaurantList);
  
      });
    }

    loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
    
      console.log('loading data'); // this is substituting for a "breakpoint"
    
     
      loadAnimation.style.display = 'inline-block';
    
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    
    
      const storedList = await results.json();
      localStorage.setItem('storedData', JSON.stringify(storedList));

    
      loadAnimation.style.display = 'none';
      //console.table(storedList);
    
    });
    
    
    generateListButton.addEventListener('click', (event) => {
      console.log('generate new list');
      currentList = cutRestaurantList(recallList);
      console.log(currentList);
      injectHTML(currentList);
    })

    textField.addEventListener('input', (event) => {
      console.log('input', event.target.value);
      const newList = filterList(currentList, event.target.value);
      console.log(newList);
      injectHTML(newList);

    })

  }
  
 
  
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  