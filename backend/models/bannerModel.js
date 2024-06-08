const { Schema, model } = require('mongoose');

const bannerSchema = new Schema(
  {
    // productId: {
    //     type: Schema.ObjectId,
    //     required : true
    // },
    // bannerName: {
    //   type: String,
    //   required: true,
    // },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('banners', bannerSchema);
