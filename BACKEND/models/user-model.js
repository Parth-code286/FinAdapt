const mongoose = require('mongoose')
 const userSchema = mongoose.Schema(
    {fullname: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
        default:"default.jpg"
    },},
    { timestamps:true}
 )
 module.exports = mongoose.model('user',userSchema)