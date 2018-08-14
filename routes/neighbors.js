const express = require("express")
const router = express.Router()

const queries = require("../db/queries")

router.get('/', (req,res,next) => {
    queries.list('neighbors')
    .then(event => {
        res.json({event})
    })
})

router.get('/:id', function(request,response){
  queries.read("neighbors", request.params.id).then(event => {
      event
          ? response.json({event})
          : response.status(404).json({message: 'Not found'})
  })
})

router.post('/', function(request,response,next){
  queries.post("neighbors", request.body)
  .then(newEvent => {
    response.status(201).json({newEvent})
  })
})

router.put('/:id', function(request,response,next){
  queries.update("neighbors", request.params.id, request.body)
  .then(updatedEvent => response.json(updatedEvent))
})

router.delete('/:id', function(request,response,next){
  queries.deleteOne("neighbors", request.params.id)
  .then(() => {
    response.status(204).json()
  })
})

router.use(function(error,request,response,next){
  console.error(error.stack)
  response.status(400).send('Error Something Went Wrong')
})

 module.exports = router
