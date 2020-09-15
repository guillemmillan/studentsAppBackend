const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const businessSchema = new Schema(
  {
    Name: String,
    Addres: String,
    Description: String,
    imageUrl:{
      type: String,
      default: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    },
    jobs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Offer'
      }
    ],
    owner:{
      type: Schema.Types.ObjectId, 
      ref: 'User'}
  },
  {
    timestamps: true
  }
);
 
const Business = mongoose.model('Business', businessSchema);
module.exports = Business;