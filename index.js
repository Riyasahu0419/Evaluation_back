const express = require("express");
const server = express();  //creating server
const Course = require('./model/CourseModel'); //importing model
const User = require('./model/UserModel'); //importing model
const database = require('./Config/db');   //importig database connectivity with mongodb
const authMiddleware=require('./Middleware/auth1')//importing middleware
server.use(express.json());



// get for all cources
// server.get("/",async(req,res)=>{

//         try {     
//              const AllCourse= await Course.find()
//              res.status(200).send(AllCourse)  
//         } catch (error) {
                
//                res.status(401).send("Failed to save Courses");
//         }
// })

// Error Handling Middleware:

server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
  });
  

// port for courses information

server.post("/", async (req, res) => {
    const { courseId ,title,category,difficulty,description} = req.body;
    try {
        const newCourse= new Course({
            courseId ,
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

// get for corces

server.get('/courses', async (req, res) => {
    const { page = 1, limit = 10, category, difficulty } = req.query;
    const query = {};
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
  
    try {
      const courses = await Course.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));
      const AllCourses = await Course.countDocuments(query);
      res.send({ courses, page, totalPages: Math.ceil(AllCourses / limit) });
    } catch (err) {
      res.status(500).send(err);
    }
  });

// post for enroll

server.post('/enroll', authMiddleware, async (req, res) => {
    const { courseId } = req.body;
    try {
      const user = await User.findOne({ userId: req.userId });
      if (!user.listOfCourses.includes(courseId)) {
        user.listOfCourses.push(courseId);
        await user.save();
      }
      res.send({ message: 'Enrollment successful' });
    } catch (err) {
      res.status(500).send(err);
    }
  });
  

// Post for cancel Enroll

server.post('/cancel-enrollment', authMiddleware, async (req, res) => {
    const { courseId } = req.body;
    try {
      const user = await User.findOne({ userId: req.userId });
      user.listOfCourses = user.listOfCourses.filter(id => id !== courseId);
      await user.save();
      res.send({ message: 'Enrollment canceled' });
    } catch (err) {
      res.status(500).send(err);
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

// get for my cources

server.get('/my-courses', authMiddleware, async (req, res) => {
    try {
      const user = await User.findOne({ userId: req.userId });
      const courses = await Course.find({ courseId: { $in: user.listOfCourses } });
      res.send(courses);
    } catch (err) {
      res.status(500).send(err);
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
