const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
 
const jobSchema = new Schema(
  {
    Name: String,
    Company: String,
    imageUrl: String,
    imgPath: String,
    Address: String,
    Description: String,
    companyJob: [{
      type: Schema.Types.ObjectId,
      ref: 'business'
    }]
  },
  {
    timestamps: true
  }
);

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;