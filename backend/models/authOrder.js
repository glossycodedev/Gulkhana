const {Schema, model} = require("mongoose");

const authSchema = new Schema({
    orderId: {
        type: Schema.ObjectId,
        required : true
    },
    sellerId: {
        type: Schema.ObjectId,
        required : true
    },
    products: {
        type: Array,
        required : true  
    }, 
    price: {
        type: Number,
        required : true  
    },     
    payment_status: {
        type: String,
        required : true  
    },
    shippingInfo : {
        type : Object,
        required : true
    },
    delivery_status: {
        type: String,
        required : true  
    },
    date: {
        type: String,
        required : true
    } 
},{ timestamps: true });

authSchema.index(
    {
        delivery_status: 'text',
        orderId: 'text',
    },
    {
      weights: {
        delivery_status: 5,
        orderId: 4,
      },
    }
  );

module.exports = model('authorOrders',authSchema)