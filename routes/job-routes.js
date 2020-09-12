const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Job = require('../models/job')
const { response } = require('../app')
const Business = require('../models/business')

router.post('/add-job', async (req, res, next)=>{
 try{
  const business = await Business.findOne({owner:req.session.currentUser._id})
  console.log(business)
  console.log(req.session.currentUser)
  console.log(req.body)
  const newJob = await Job.create({
  name: req.body.jobName,
  company: business._id,
  address: req.body.jobAddress,
  description: req.body.jobDescription,
})
 res.status(200).json(newJob)  
 }
 catch(err){
   console.log(err)
 }

})

router.get('/jobs/:id', (req, res,next)=> {
  //detalles de oferta de trabajo
  console.log("error al pasar datos", req.params)
  Job.findById({_id: req.params.id})
  .populate("company")
  .then(job =>  {
    res.status(200).json(job)
    console.log(job)
  })
  .catch(err =>{
    console.log(err)
    res.status(400).json(err)
  })
})

router.get('/jobs', (req, res, next) =>{
  //Muestra trabajos publicados
  Job.find()
  .populate("company")
  .then(jobs => {
    console.log("error jobs", jobs)
    res.status(200).json(jobs)
  })

  .catch(err=> {
    res.json(err)
  })
}) 





module.exports = router