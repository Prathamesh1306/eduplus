const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const studentModel = require("./models/student");
const authModel = require("./models/authentication");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", function(req, res){
    res.send("Page 1");
});


app.post("/register", async function(req, res){
    let {username, email, password, role} = req.body;
    
    let user = authModel.findOne({email});
    if(user) return res.status(500).send('User Already Exists!')
    
        // bcrypt.genSalt(10, function (err, salt) {
        //     bcrypt.hash(password, salt, async function (err, hash) {
                let createdUser = await authModel.create({
                    username,                                      
                    email,
                    password,
                    role
                });
                let token = jwt.sign({ email: email, user: createdUser._id, username: username, role: createdUser.role }, "shhh");
                res.cookie("token", token);
                res.status(201).send("Registered");
            });
        // });
    // });        



    // Login Part
    app.post("/login", async (req, res) => {
        const { email, password } = req.body;
            
        const user = await authModel.findOne({ email });
        if (!user) {
            return res.status(500).send("No User Found!");
        }
            
        if (password === user.password) {
            const token = jwt.sign(
                {
                    email: email,
                    user: user._id,
                    username: user.username,
                    role: user.role,
                },
                "shhh"
            );
    
            res.cookie("token", token);
            res.status(200).send("Logged In");
        } else {
            res.status(401).send("Invalid Credentials");
        }
    });
    


    // app.post("/login", async (req, res) => {
    //     let { email, password } = req.body;
    //     let user = await authModel.findOne({ email });
    //     if (!user) return res.status(500).send('No User Found!');
    
    //     bcrypt.compare(password, user.password, function (err, result) {
    //         if (result) {
    //             let token = jwt.sign({ email: email, user: user._id, username: user.username, role: user.role,}, "shhh");
    //             res.cookie("token", token);
    //             res.status(200).send("Logged In");
    //         } else {
    //             res.status(401).send("Invalid Credentials");
    //         }
    //     });
    // });


    app.get("/students", async (req, res) => {
        try {
            const students = await Student.find(); // Fetch all students from the collection
            res.status(200).json(students);
        } catch (error) {
            console.error("Error fetching students:", error);
            res.status(500).send("An error occurred while fetching students.");
        }
    });


app.listen(3000, function(req, res){
    console.log("Working!");
    
})

