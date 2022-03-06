const $animalForm = document.querySelector('#animal-form');

const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };

  fetch('/api/animals', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(animalObject)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      alert('Error: ' + response.statusText);
    })
    .then(postResponse => {
      console.log(postResponse);
      alert('Thank you for adding an animal!');
    });










//   fetch('/api/animals', {
//     method: 'POST', //specify the type of command, otherwise it will default as a GET command
//     headers: { //headers property to inform that this is going to be json data, expect it so that the 'body' portion can work.
//       Accept: 'application/json',
//       'Content-Type':'application/json'
//     },
//     body: JSON.stringify(animalObject) //the animalobjeect from above when the user is entering a new animal, being coverted to json string

//   }).then(response => {
//     if(response.ok){
//       return response.json();
//     }
//     alert('Error: ' + response.statusText);
//   }).then(postResponse => {
//     console.log(postResponse);
//     alert('Thank you for adding an animal!')
//   });

};

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
