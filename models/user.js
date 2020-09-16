const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username:  {  
    type: String,
    required: true,
    unique: true},
  password: {
    type: String,
    required: true},
  email: {  
    type: String,
    },
    
  picture: {
    type: String,
    default: "https://exclipart.com/transparent450_/user-silhouette.png"
  }  
}, 
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;