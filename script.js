

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
    const lowerCaseName = item.name.toLowerCase();
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

function initChart(){
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


async function mainEvent() { // API request
    const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    const filterDataButton = document.querySelector('#filter');
    const loadDataButton = document.querySelector('#data_load');
    const generateListButton = document.querySelector('#generate');
    const chartTarget = document.querySelector('#myChart');
    
    

    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = 'none';

    let currentList = []; // this is "scoped" to the main event function
    
    loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
      console.log('Loading Data'); 
      loadAnimation.style.display = 'inline-block';
    

     
    /* API data request */
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/2qma-7ez9.json');
      currentList = await results.json();

      initChart(chartTarget);

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
    
    
  
    

