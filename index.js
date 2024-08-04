
const express = require("express");
const server = express();  //creating server
const Course = require('./model/CourseModel'); //importing model
const User = require('./model/UserModel'); //importing model
const database = require('./Config/db');   //importig database connectivity with mongodb
server.use(express.json());


server.get("/",async(req,res)=>{

        try {     
             const AllCourse= await Course.find()
             res.status(200).send(AllCourse)  
        } catch (error) {
                
               res.status(401).send("Failed to save Courses");
        }
})

// courses information

server.post("/", async (req, res) => {
    const { id ,title,category,difficulty,description} = req.body;
    try {
        const newCourse= new Course({
            id ,
            title,
            category,
            difficulty,
            description
            
        });
        await newCourse.save();
        res.status(201).send({"message": "Successfully enrolled in the course."});
    } catch (error) {
        console.error("Error saving Course data:", error);
        res.status(400).send("Failed to save Course data");
    }
});


// user information


server.post("/", async (req, res) => {
    const { id , username,password,enrolledCourse} = req.body;
    try {
        const newUser= new User({
            id ,
            username ,
            password,
            enrolledCourse   
        });
        await newUser.save();
        res.status(201).send({"message": "Successfully enrolled in the course."});
    } catch (error) {
        console.error("Error saving Course data:", error);
        res.status(400).send("Failed to save Course data");
    }
});



// connectivity with server  , created server
server.listen(7070, async () => {
    try {
        await database;
        console.log("Server connected to database");
    } catch (error) {
        console.error(`Failed to connect to the database: ${error}`);
    }
});
