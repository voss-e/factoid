const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/user')


// @desc POST route for singing up

router.post('/signup', (req, res, next) => {
  User.find({ email: req.body.email })
  .exec()
  .then( user => {
    // Check if mail is taken
    if (user >= 1) {
      return res.status(422).json({
        message: 'Mail already exists'
      })
    } else {
      // Create a hash ( 3rd argument is a func that returns either err or hash)
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        // if it returns err
        if (err) {
          return res.status(500).json({
            error: err
          })
          // if it returns hash
        } else {
          // create new user
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          })
          // save the user to the DB
          user.save()
          .then( result => {
            res.status(201).json({
              message: 'User created'
            })
          })
          .catch( err => {
            res.status(500).json({
              error: err
            })
          })
        }
      })
    }
  })
  .catch( err => {
    res.status(500).json({
      error: err
    })
  })
})


// @desc POST ROUTE FOR LOGGING IN

router.post('/login', (req, res, next) => {
  User.find({ email: req.body.email })
  .exec()
  .then( user => {
    // Check if given user exists
    if (user.length < 1) {
      return res.status(401).json({
        message: 'Auth failed'
      })
    }
    // If user exists
    // 3rd argument is func, if it returns  -> error res.status(401)
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
      // if it returns result create a token
      if (result) {
        const token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        })
        // gg
        return res.status(200).json({
          message: 'Auth successful',
          token: token
        })
      }
      res.status(401).json({
        message: 'Auth failed'
      })
    })
  })
  .catch( err => {
    res.status(500).json({
      error: err
    })
  })
})


// @desc DELETE ROUTE

router.delete('/:userId', (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
  .exec()
  .then( result => {
    res.status(200).json({
      message: 'User deleted'
    })
  })
  .catch( err => {
    res.status(500).json({
      error: err
    })
  })
})


module.exports = router
