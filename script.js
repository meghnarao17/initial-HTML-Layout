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


async function mainEvent() { // the async keyword means we can make API requests
    const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    const submit = document.querySelector('#form_button')
    const chartTarget = document.querySelector('#myChart');
    submit.style.display = 'none';
    
    /* API data request */
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/2qma-7ez9.json');
    const arrayFromJson = await results.json(); //convert it to JSON
    
    initChart(chartTarget);

    if (arrayFromJson.data.length > 0) {
        submit.style.display = 'block';
    }
    
    let currentArray;
    mainForm.addEventListener('submit', async (submitEvent) => {
        submitEvent.preventDefault(); 
        currentArray = processSpending(arrayFromJson.data);

  });

  

//     const formData = new FormData(mainForm);
//     const formProps = Object.fromEntries(formData);

//     console.log(formProps);
//     const newList = filterList(currentList, formProps.resto);
    
//     console.log(newList);
  
    

}