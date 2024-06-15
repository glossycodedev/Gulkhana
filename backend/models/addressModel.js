const {Schema, model} = require("mongoose");

const addressSchema = new Schema({
    // userId: {
    //     type: Schema.ObjectId,
    //     required : true
    // },
    userId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
      },
    place: {
        type: String,
        required : true
    },
    address: {
        type: String,
        required : true
    },
    phone: {
        type: String,
        required : true
    },
    street: {
        type: String,
        required : true
    },
    city: {
        type: String,
        required : true
    },
    
},{ timestamps: true })

module.exports = model('address',addressSchema)