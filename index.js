const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');
const port = 8080;
const path = require("path");
const methodOverride = require('method-override')
app.set(express.static("public"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));

app.listen(port,()=>{
    console.log("Server started ",port);
})

// We are not connected to any db, hence create a dumy db
let posts = [
    {
        id : uuidv4(),
        username : "apnacollege",
        content : "I love coding"
    },
    {
        id : uuidv4(),
        username : "shradhkhapra",
        content : "Hardwork is way to success"
    },
    {
        id : uuidv4(),
        username : "rahulkumar",
        content : "I got my first internship"
    },
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})


app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");// By default get request 
    console.log("Post added");
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = reqparams;
    let post = posts.find((p) => id === p.id);
    let {newContent} = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    // let {id} = req.params;
    // let post = posts.find((p) => id === p.id);
    // res.render("edit.ejs",{post});
    res.send("This feature is under development");
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})