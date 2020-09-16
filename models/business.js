const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const businessSchema = new Schema(
  {
    Name: String,
    Addres: String,
    Description: String,
    imageUrl:{
      type: String,
      default: "http://clientes.wiroagency.com/pruebas/wp-content/uploads/sites/5/2020/09/photo-1497366754035-f200968a6e72.jpg"
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