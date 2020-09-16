const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
 
const jobSchema = new Schema(
  {
    name: String,
    address: String,
    description: String,
    imageUrl:{
      type: String,
      default: "http://clientes.wiroagency.com/pruebas/wp-content/uploads/sites/5/2020/09/photo-1454165804606-c3d57bc86b40.jpg"
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