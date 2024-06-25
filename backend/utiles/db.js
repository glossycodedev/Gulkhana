const mongoose = require('mongoose');

module.exports.dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL,{useUnifiedTopology: true})
        console.log("Database connected..")
    } catch (error) {
        console.log(error.message)
    }
}