const mongoose = require('mongoose');


const driverSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  address: { type: String, required: true },
  license: { type: String, required: true },
  phone: { type: String, required: true },
  amount: { type: String, required: true },
  weekAmount: { type: String, required: true },
  carMake: { type: String, required: true },
  carModel: { type: String, required: true },
  carChasis: { type: String, required: true },
  carReg: { type: String, required: true },
  date: { type: String }
});




module.exports = mongoose.model('Driver', driverSchema);

