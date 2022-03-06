const router = require('express').Router();

const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals')
const { animals } = require('../../data/animals')


router.get('/animals',(req, res) => { //req means REQUIRE
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
  router.get('/animals/:id',(req, res) => {
    const result = findById(req.params.id, animals);
    console.log(result)
    if(result){
      res.json(result);
    } else {
      res.sendStatus(404);
    }
      
  })
  
  //CREATING NEW DATA FROM CLIENT SIDE TO STORE IN OUR JSON FILE
  
  router.post('/animals', (req,res) => {
  
    // set id based on what the next index of the array will be
  
    req.body.id = animals.length.toString();
  
  
    console.log(req.body, "THIS SHOULD BE JUST LARRY"); //THIS SHOULD BE JUST ONE ANIMAL
    // if any data in req.body is incorrect, send 400 error back
    if(!validateAnimal(req.body)){
      res.status(400).send('The animal is not properly formatted.');
    } else {
      // add animal to json file and animals array in this function
      const animal = createNewAnimal(req.body, animals)
      res.json(animal); 
    }
  
  })

  module.exports = router