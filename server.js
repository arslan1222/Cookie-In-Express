const express = require("express");
const app = express();
const expressSesion = require("express-session");

// Implementation of cookie
let sessionOption = { 
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 3 * 24 * 60 * 60 * 1000,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

// Use session as a Middleware
app.use(expressSesion(sessionOption));

app.get("/test", (req, res)=>{
    res.send("Test successfull!");
});


app.get("/register", (req, res)=>{
    let {name = "NoName"} = req.query;
    req.session.name = name;
    console.log(req.session.name);
    res.redirect("/hello");
});

// We can store information in a single session
app.get("/hello", (req, res)=>{
    res.send("See cookie!")
})


app.listen(8080, ()=>{
    console.log("server is running!");
})