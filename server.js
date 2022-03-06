const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const express = require('express');



const PORT = process.env.PORT || 3001;

const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }))
// parse incoming JSON data
app.use(express.json())

app.use(express.static('public'));;

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);



// this middleware method is a calls all the files under the directory in public to be used


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

// filterbyquery is for a big group of animals, based on many attributes




app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`)
})