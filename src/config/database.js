const mongoose = require('mongoose');

const  connectdb = async()=>{

    await mongoose.connect(
       "mongodb+srv://just_zaid:Adamas09@cluster0.beagy.mongodb.net/devTinder" 
    );
}
module.exports= connectdb;

 