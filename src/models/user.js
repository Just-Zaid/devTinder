const mongoose = require ('mongoose');
const validator = require("validator");

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        minLength:1,
        maxLength:25,
        required:true
    },
    lastName:{
        type:String,
        minLength:1,
        maxLength:25,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        maxLength:25,
        lowercase:true,
        trim:true,
        validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Email not valid " + value);
        }
        }
    },
    password:{
        type:String,
        minLength:6,
        maxLength:25,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://cdn2.iconfinder.com/data/icons/business-hr-and-recruitment/100/account_blank_face_dummy_human_mannequin_profile_user_-512.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Photo not valid " + value);
            }
            }
    },
    about:{
    type:String,
    default:"This about is auto generated"
    },
    skills:{
     type: [String]
    },
   },
  {
    timestamps:true
  },
);

module.exports = mongoose.model("User",userSchema);
