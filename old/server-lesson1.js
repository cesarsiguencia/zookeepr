const { animals } = require('./data/animals');

const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();


// FOR API THAT GIVE BACK JUST PLAIN OBJECTS WITH STRINGS
// function filterByQuery(query,animalsArray){
//     let filteredResults = animalsArray;
//     if (query.diet) {
//       filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
//     }
//     if (query.species) {
//       filteredResults = filteredResults.filter(animal => animal.species === query.species);
//     }
//     if (query.name) {
//       filteredResults = filteredResults.filter(animal => animal.name === query.name);
//     }
//     return filteredResults;
// }

// FOR API THAT GIVE BACK RESULTS WITH STRINGS IN ARRAYS

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
      // Save personalityTraits as a dedicated array.
      // If personalityTraits is a string, place it into a new array and save.
      if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
      } else {
        personalityTraitsArray = query.personalityTraits;
      }
      // Loop through each trait in the personalityTraits array:
      personalityTraitsArray.forEach(trait => {
        // Check the trait against each animal in the filteredResults array.
        // Remember, it is initially a copy of the animalsArray,
        // but here we're updating it for each trait in the .forEach() loop.
        // For each trait being targeted by the filter, the filteredResults
        // array will then contain only the entries that contain the trait,
        // so at the end we'll have an array of animals that have every one 
        // of the traits when the .forEach() loop is finished.
        filteredResults = filteredResults.filter(
          animal => animal.personalityTraits.indexOf(trait) !== -1
        );
      });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
  }

function findById(id, animalsArray){
  const result = animalsArray.filter(animal => animal.id === id)[0]
  return result
}

// filterbyquery is for a big group of animals, based on many attributes
app.get('/api/animals',(req, res) => { //req means REQUIRE
  let results = animals
  console.log("TEST 1")
  console.log(req.query)
  if (req.query){
      results = filterByQuery(req.query, results);
  }
  console.log(results)
  res.json(results)
})

// filterbyid is for an individual animal, and we are obtaining that by id
app.get('/api/animals/:id',(req, res) => {
  const result = findById(req.params.id, animals);
  console.log(result)
  if(result){
    res.json(result);
  } else {
    res.sendStatus(404);
  }
    
})

//before we made PORT at the top, use this: 
// app.listen(3001, () => {
//     console.log(`API server now on port 3001!`)
// })

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`)
})