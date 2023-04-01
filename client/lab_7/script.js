/* eslint-disable max-len */

/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/

/*
  ## Utility Functions
    Under this comment place any utility functions you need - like an inclusive random number selector
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/



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
    /*
    ## JS and HTML Injection
      There are a bunch of methods to inject text or HTML into a document using JS
      Mainly, they're considered "unsafe" because they can spoof a page pretty easily
      But they're useful for starting to understand how websites work
      the usual ones are element.innerText and element.innerHTML
      Here's an article on the differences if you want to know more:
      https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext
  
    ## What to do in this function
      - Accept a list of restaurant objects
      - using a .forEach method, inject a list element into your index.html for every element in the list
      - Display the name of that restaurant and what category of food it is
  */
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
    
    const form = document.querySelector('.main_form'); // get your main form so you can do JS with it
    const submit = document.querySelector('button[type="submit"]'); // get a reference to your submit button
    const filterDataButton = document.querySelector('.filter');
    const loadDataButton = document.querySelector('#data_load');
    const generateListButton = document.querySelector('#generate');
    const loadAnimation = document.querySelector('#data_load_animation')
  
    loadAnimation.style.display = 'none';
    submit.style.display = 'none'; // let your submit button disappear
  
  
  
    
    const results = await fetch('/api/foodServicesPG');
    const arrayFromJson = await results.json(); // here is where we get the data from our request as JSON
  
    
    console.table(arrayFromJson.data);
  
    
  
  
    console.log(`${arrayFromJson.data[0].name} ${arrayFromJson.data[0].category}`);
  
    // This IF statement ensures we can't do anything if we don't have information yet
    if (arrayFromJson.data?.length > 0) { // the question mark in this means "if this is set at all"
      submit.style.display = 'block'; // let's turn the submit button back on by setting it to display as a block when we have data available
  
      // And here's an eventListener! It's listening for a "submit" button specifically being clicked
      // this is a synchronous event event, because we already did our async request above, and waited for it to resolve
      form.addEventListener('submit', (submitEvent) => {
        // This is needed to stop our page from changing to a new URL even though it heard a GET request
        submitEvent.preventDefault();
  
        // This constant will have the value of your 15-restaurant collection when it processes
        const restaurantList = processRestaurants(arrayFromJson.data);
  
        // And this function call will perform the "side effect" of injecting the HTML list for you
        injectHTML(restaurantList);
  
        // By separating the functions, we open the possibility of regenerating the list
        // without having to retrieve fresh data every time
        // We also have access to some form values, so we could filter the list based on name
      });
    }
  }
  
  loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
    
    console.log('loading data'); // this is substituting for a "breakpoint"
  
   
    loadAnimation.style.display = 'inline-block';
  
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  
  
    currentList = await results.json();
  
    loadAnimation.style.display = 'none';
    console.table(currentList);
  
  });
  
  filterButton.addEventListener('click', (event) => {
    console.log("clicked filterButton");
  
    const formData = new FormData(mainForm);
    const formProps = Object.fromEntries(formData);
  
    console.log(formProps);
    const newList = filterList(currentList, formProps.resto);
  
    console.log(newList); // this is called "dot notation"
    
    injectHTML(newList);
  
  });
  
  generateListButton.addEventListener('click', (event) => {
    console.log('generate new list');
    const restaurantsList = cutRestaurantList(currentList);
    injectHTML(restaurantsList);
  })
  
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  