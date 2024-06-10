const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin',
  },
});

adminSchema.index(
  {
    name: 'text',
    phone: 'text',
  },
  {
    weights: {
      name: 5,
      phone: 4,
    },
  }
);

module.exports = model('admins', adminSchema);
