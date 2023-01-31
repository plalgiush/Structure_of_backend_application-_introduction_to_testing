const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(persons => {
      if (persons) {
        response.json(persons)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body
  if (!body.name || !body.phone) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Person({
    name: body.name,
    phone: body.phone,
  })

  return person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    phone: body.phone,
  }

  const validRule = { runValidators: true }

  Person.findByIdAndUpdate(request.params.id, person, validRule)
    .then(updatePerson => {
      response.json(updatePerson)
    })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = personsRouter