const mongoose = require('mongoose')


const Fact = require('../models/fact.js')


// @desc GET METHOD FOR ALL FACTS

exports.facts_get_all = (req, res, next) => {
  Fact.find()
  .select('_id content fact_id')
  .exec()
  .then( facts => {
    const response = {
      count: facts.length,
      facts: facts.map( fact => {
        return {
          content: fact.content,
          _id: fact._id
        }
      })
    }
    res.status(200).json(facts)
  })
  .catch( err => {
    res.statuts(500).json({
      error: err
    })
  })
}


// @desc GET MATHOD FOR GETTING FACTS WITH CERTAIN ID

exports.facts_get_id = (req, res, next) => {
  Fact.findOne({ 'fact_id': req.params.fact_id })
  .exec()
  .then( fact => {
    res.status(200).json({
      fact: fact
    })
  })
  .catch( err => {
    res.status(500).json({
      error: err
    })
  })
}


// @desc POST METHOD FOR ... POSTING FACTS

exports.fact_post = (req, res, next) => {
  const fact = new Fact({
    _id: new mongoose.Types.ObjectId(),
    content: req.body.content
  })

  fact.save()
  .then( result => {
    res.status(201).json({
      createdFact: {
        content: result.content,
        _id: result._id
      }
    })
  })
  .catch( err => {
    res.status(500).json({
      error: err
    })
  })
}


// @desc DELETE METHOD

exports.fact_delete = (req, res, next) => {
  Fact.remove({ 'fact_id': req.params.fact_id })
  .exec()
  .then( res => {
    res.status(200).json({
      message: res
    })
  })
  .catch( err => {
    res.status(500).json({
      error: err
    })
  })
}
