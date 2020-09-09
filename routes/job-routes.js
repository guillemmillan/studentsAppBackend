const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Job = require('../models/job')
const { response } = require('../app')
//const fileUploader = require('../configs/cloudinary.config');


router.post('/add-job', /*uploadCloud.single("image"),*/(req, res, next)=>{Job.create({
  name: req.body.Name,
  company: req.body.Company,
  address: req.body.Address,
  description: req.body.Description,
  imageUrl: req.body.image
})
   
  .then(response=>{
    res.json
  })
  .catch(err =>{
    res.json(err)
  })
})

{/*router.get('/jobs', (req, res, next =>{
  //Muestra trabajos publicados
  Job.find()
  .populate('business')
  .then(job => {
    res.json(job)
  })
  .catch(err=> {
    res.json(err)
  })
})) */}


router.get('/projects', (req, res, next) => {
  // recoger TODOS los proyectos, y devolver como JSON
  // TO-DO: popular con las tasks
  Project.find()
  .populate('tasks')
  .then(projects => {
    res.json(projects)
  })
  .catch(err => {
    res.json(err)
  })

})


router.get('/jobs/:id', (req, res,next)=> {
  Job.findById(req.params.id)
  .then(job =>  {
    res.json(job)
  })
})


module.exports = router