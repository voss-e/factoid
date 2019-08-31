const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()


const Fact = require('../models/fact.js')

const FactsController = require('../controllers/facts.js')


// Routes

router.get('/', FactsController.facts_get_all)

router.get('/:factId', FactsController.facts_get_id)

router.post('/', FactsController.fact_post)

router.delete('/:factId', FactsController.fact_delete)


module.exports = router
