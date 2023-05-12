
function sumAgency(array, category) {
  return array.reduce((collection, item) => {
    const key = item.agency[category];
    if(!collection[key]) {
      collection[key] = [];
    }
    collection[key].push(item.agency);
    return collection;
  })
  
}

  // var result = [];
  // array.reduce(function agencyAmount(res, value) {
  //   if (!res[value.item.agency]) {
  //     res[value.item.agency] = { agency: value.item.agency, amount: 0 };
  //     result.push(res[value.item.agency])
  //   }
  //   res[value.item.agency].item.amount += value.item.amount;
  //   return res;
  // }, {});

function shapeDataForLineChart(array){
  //reduce can restructrure an array of information
  //collection is the thing you are building out of the array
  //1) check of collection already has a refernce to item in it (so if collection doesnt have an item with this category)
  //2) then collection with key of agency, is now defined , and now we are gonna set it equal to an array in which first element of array is item were preoviding
  //3) else we're going to push item we're working on into the collection at that key
  //4) if agency does exist, were gonna push the item into that key to make a new array of all the agencies in our dataset

  return array.reduce((collection, item) => {
    if(!collection[item.agency]){
    collection[item.agency] = [item]
    } else {
      collection[item.agency].push(item);
    }
    return collection;
  }, {});
}

function Yshape(collection){
  for(let i = 0; i < collection.length; i++){
    let sum = 0
    for(let x = 0; x< collection[i].length; x++ ){
      sum += collection[i]["amount"]
      //test out with item
    }
  }
  //create an array to assign each value to agency
  
}


function getMaxAgencies(){
  //sorts agency in decreasing order
}

function getRandomIntInclusive(min, max){
  min = Math.ceil(min);
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function injectHTML(list) {
  console.log('fired injectHTML')
  const target = document.querySelector('#agency_list')
  target.innerHTML = '';
  list.forEach((item) => {
    const str = `<li>${item.payee_name}</li>`;
    target.innerHTML += str
  })
}

function filterList(list, query) {
  return list.filter((item) => {
    const lowerCaseName = item.payee_name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);
  });
}

function cutAgencyList(list) {
  console.log('fired cut list');
  const range = [...Array(15).keys()]
  return newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length -1);
    return list[index]
  })
}

function initChart(chart){
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };
  return new Chart(
    chart,
    config
  );
}


async function getData(){
      const url = 'https://data.princegeorgescountymd.gov/resource/2qma-7ez9.json';
      const data= await fetch(url);
      const json = await data.json()
      const reply = json.filter((item) => Boolean(item.amount)).filter((item) => Boolean(item.name))
      return reply;
  }

async function mainEvent() { // API request
    const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    const filterDataButton = document.querySelector('#filter');
    const loadDataButton = document.querySelector('#data_load');
    const generateListButton = document.querySelector('#generate');
    const chartTarget = document.querySelector('#myChart');
    submit.style.display = 'none';
    
    initChart(chartTarget);
    const chartData = await getData();

    if(chartData.length > 0){
      submit.style.display = 'block';

      loadAnimation.classList.remove('lds-ellipsis');
      loadAnimation.classList.add('lds-ellipsis_hidden');

      let currentList = [];

      form.addEventListener('input', (event) => {
        console.log(event.target.value);
        const filteredList = filterList(currentList, event.target.value);
        injectHTML(filteredList);
      });

      form.addEventListener('submit', async(submitEvent) => {
        submitEvent.preventDefault();

        //VALUE of current collection (sorted agencies)
        currentList = cutAgencyList(chartData);

        injectHTML(currentList);
      })




    }

    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = 'none';

     // this is "scoped" to the main event function
    
    loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
      console.log('Loading Data'); 
      loadAnimation.style.display = 'inline-block';
    

     
    /* API data request */
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/2qma-7ez9.json');
      currentList = await results.json();

      const numAgencyType = [];
    for (let i = 1; i < agency.length - 1; i++) {
    numAgencyType.push(sumAgency(i, list));
    }

    console.log("HERE" + numAgencyType);

     

      loadAnimation.style.display = 'none';
      console.table(currentList); 
      injectHTML(currentList);
     });

     
     filterDataButton.addEventListener('click', (event) =>{
      console.log('clicked FilterButton');
  
      const formData = new FormData(mainForm);
      const formProps = Object.fromEntries(formData);
  
      console.log(formProps);
      const newList = filterList(currentList, formProps.agency);
      console.log(newList);
      injectHTML(newList);
    });

    generateListButton.addEventListener('click', (event) => {
      console.log('generate new list');
      const agencyList = cutAgencyList(currentList);
      console.log(agencyList);
      injectHTML(agencyList);
      
  });
    
  };

    
    
    
     

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
    
    
  
    

