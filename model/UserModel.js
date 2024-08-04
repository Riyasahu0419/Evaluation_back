const mongoose=require("mongoose")
const UserSchema=mongoose.Schema({
    id:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
    enrolledCourse:{type:String, required:true}    
    
},{versionKey:false})

const UserModel=mongoose.model("User",UserSchema)

module.exports=UserModel
