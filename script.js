// function filterList(list, query) {
//     return list.filter((item) => {
//       const lowerCaseName = item.name.toLowerCase();
//       const lowerCaseQuery = query.toLowerCase();
//       return lowerCaseName.includes(lowerCaseQuery);
//     });
// }

async function mainEvent() { // the async keyword means we can make API requests
    const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    const visualization = document.querySelector('.visualization');
    let currentList = []; 
    mainForm.addEventListener('submit', async (submitEvent) => {
        submitEvent.preventDefault(); 
        console.log('form submission');

        const results = await fetch('https://data.princegeorgescountymd.gov/resource/2qma-7ez9.json');
        currentList = await results.json();
        console.table(currentList); 
  });

  visualization.addEventListener('click', (event) =>{
     console.log('clicked FilterButton');

//     const formData = new FormData(mainForm);
//     const formProps = Object.fromEntries(formData);

//     console.log(formProps);
//     const newList = filterList(currentList, formProps.resto);
    
//     console.log(newList);
  });
    

}