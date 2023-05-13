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
    const str = `<li>${item.agency} --> $${item.amount}</li>`;
    target.innerHTML += str
  })
}

function filterList(list, query) {
  return list.filter((item) => {
    const lowerCaseName = item.agency.toLowerCase();
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


function groupAgency(response){
  const groupedAgency = {};

  for(const item of response){
    const {agency} = item;

    if(!groupedAgency[agency]){
      groupedAgency[agency] = [];
    }
    groupedAgency[agency].push(item)
  }
  return groupedAgency;

}

function sumValues(groupedAgency){
  const sums = {};

  for(const agency in groupedAgency){
    const rows = groupedAgency[agency];
    let total = 0;

    for(const item of rows){
      total += item.amount;
    }

    sums[agency] = total;

  }

  return sums;
}

function createBarChart(agencies, values){
  const ctx = document.querySelector('barChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: agencies,
      datasets: [{
        label: 'Total Value',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



function initChart(chart, object){
  const labels = Object.keys(object);
  const info = Object.keys(object).map((item) => object[item].length);

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: info,
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {}
  };
  return new Chart(
    chart,
    config
  );
}




function shapeDataForLineChart(array){
  return array.reduce((collection, item) => {
    if(!collection[item.agency]){
    collection[item.agency] = [item]
    } else {
      collection[item.agency].push(item);
    }
    return collection;
  }, {});
}


async function getData(){
      const url = 'https://data.princegeorgescountymd.gov/resource/2qma-7ez9.json';
      const data= await fetch(url);
      const json = await data.json()
      const reply = json.filter((item) => Boolean(item.amount)).filter((item) => Boolean(item.agency))
      return reply;
  }

async function mainEvent() { // API request
    const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    const filterDataButton = document.querySelector('#filter');
    const loadDataButton = document.querySelector('#data_load');
    const generateListButton = document.querySelector('#generate');
    const chartTarget = document.querySelector('#myChart');
    
    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = 'none';

   


    const chartData = await getData();
    const shapedData = shapeDataForLineChart(chartData);
    //const sumData = sumValues(chartData)
    //console.log("HERE" + shapedData)
    const myChart = initChart(chartTarget, shapedData);
    

    let currentList = [];

    loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
      console.log('Loading Data'); 
      loadAnimation.style.display = 'inline-block';

    /* API data request */
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/2qma-7ez9.json');
    var response = await results.json()
    
    const groupedAgency = groupAgency(response);
    const sums = sumValues(groupedAgency);
    const agencies = Object.keys(sums);
    const values = Object.values(sums);
    //createBarChart(agencies, values);
    
    
    currentList = response
    //currentList = cutAgencyList(chartData);
    loadAnimation.style.display = 'none';
    console.table(currentList); 
    injectHTML(currentList);

    
  })

    
     
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
    
    
  
    

