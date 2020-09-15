const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
 
const jobSchema = new Schema(
  {
    name: String,
    address: String,
    description: String,
    imageUrl:{
      type: String,
      default: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    },
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