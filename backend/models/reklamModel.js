const { Schema, model } = require('mongoose');

const reklamSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

reklamSchema.index({
  title: 'text',
});

module.exports = model('reklams', reklamSchema);
