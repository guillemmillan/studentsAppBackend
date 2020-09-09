const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Business = require('../models/business')
const { response } = require('../app')
//const fileUploader = require('../configs/cloudinary.config');

/*
router.post('/add-business', /*fileUploader.single('image'),*//* (req, res, next)=> {
  Business.create({
    name: req.body.Name,
    imageUrl: req.body.image,
    address: req.body.address,
    description: req.body.description,
  })
  .then(response=>{
    res.json
  })
  .catch(err =>{
    res.json(err)
  })
})

router.get('/business', (req, res, next =>{
  //Muestra trabajos publicados
  //req.body
  Business.find()
  /*.populate('jobs')
  .then(business => {
    res.json(business)
  })
  .catch(err=> {
    res.json(err)
  })
}))*/
module.exports = router