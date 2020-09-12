const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
 
const jobSchema = new Schema(
  {
    name: String,
    address: String,
    description: String,
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Business'
    }
  },
  {
    timestamps: true
  }
);

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;