const express = require('express')
const mongoose = require('mongoose')


const app = express()


// Import routes

const factRoutes = require('./api/routes/facts.js')
const userRoutes = require('./api/routes/user.js')


mongoose.connect(`mongodb://vosse:${process.env.MONGO_ATLAS_PW}@ds211648.mlab.com:11648/factoid`, {
  useNewUrlParser: true
})

// Built in express body-parser

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({
    })
  }
  next()
})


app.use('/facts', factRoutes)
app.use('/user', userRoutes)


port = process.env.PORT || 3000

app.listen(port)
