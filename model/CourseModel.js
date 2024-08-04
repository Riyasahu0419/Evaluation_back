const mongoose=require("mongoose")
const CourseSchema=mongoose.Schema({
    courseId:{type:String, required:true},
    title:{type:String, required:true},
    category:{type:String, required:true},
    difficulty:{type:String, required:true},
    description:{type:String, required:true}, 
    
},{versionKey:false})

const CourseModel=mongoose.model("Course",CourseSchema)

module.exports=CourseModel
