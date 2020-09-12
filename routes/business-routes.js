const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Business = require('../models/business')
const { response } = require('../app')

router.post('/add-business', (req, res, next)=> {
  Business.create({
    Name: req.body.businessName,
    Address: req.body.businessAddress,
    Description: req.body.businessDescription,
    owner: req.session.currentUser._id,
  })
  .then(response=>{
    res.status(200).json(response)
  })
  .catch(err =>{
    res.json(err)
  })
})

router.get('/business', (req, res, next)=>{
  Business.find()
  .populate('jobs')
  .then(business => {
    res.json(business)
  })
  .catch(err=> {
    res.json(err)
  })
})

router.get('/business/:_id', (req, res, next)=>{
  Business.findById(req.params.id)
  .then(business =>  {
    res.json(business)
  })
})

module.exports = router