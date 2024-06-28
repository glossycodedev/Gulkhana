const { Schema, model } = require('mongoose');

const sellerSchema = new Schema(
  {
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
      select: false,
    },
    category: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'seller',
    },
    slug: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
    payment: {
      type: String,
      default: 'inactive',
    },
    method: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    shopInfo: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

sellerSchema.index(
  {
    name: 'text',
    phone: 'text',
    category: 'text',
  },
  {
    weights: {
      name: 5,
      phone: 4,
    },
  }
);

module.exports = model('sellers', sellerSchema);
