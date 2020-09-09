const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const businessSchema = new Schema(
  {
    Name: String,
    Addres: String,
    Description: String,
    imageUrl: String,
    imgPath: String,
    jobs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Offer'
      }
    ],
    owner:[{
      type: Schema.Types.ObjectId, 
      ref: 'User'} ] 
  },
  {
    timestamps: true
  }
);
 
const Business = mongoose.model('Business', businessSchema);
module.exports = Business;