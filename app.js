const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const ImageModel = require("./postSchema");

const DB =
  "mongodb://Muhammad:muhammad123@ac-avz4iuk-shard-00-00.b1uwuq9.mongodb.net:27017,ac-avz4iuk-shard-00-01.b1uwuq9.mongodb.net:27017,ac-avz4iuk-shard-00-02.b1uwuq9.mongodb.net:27017/?ssl=true&replicaSet=atlas-bvpxef-shard-0&authSource=admin&retryWrites=true&w=majority";
console.log(`the value of db ${DB}`);
mongoose
  .connect(DB)
  .then(() => {
    console.log("the connection is successful");
  })
  .catch((err) => {
    console.log("connection cant be successful ", err);
  });

// dotenv.config({ path: "./config.env" });
// require("./db/conn");

//storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("img");
const User = require("./userSchema");
// app.use(multer({ storage: Storage }).fields([{ name: "image", maxCount: 1 }]));

app.use(express.json());
var database;
app.use(express.urlencoded({ extended: false }));
const staticPath = path.join(__dirname);
console.log(staticPath + "contact.html");
app.use(express.static(staticPath));

// // link to the route files
app.use(require("./auth"));
//select template engine
app.set("view engine", "ejs");
var database;
const port = 5000;
app.get("/", (req, res) => {
  res.send("Hello world from the server from app js");
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// for the post request
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log("the err of img is", err);
    } else {
      const newImage = new ImageModel({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        subCategory: req.body.subCategory,
        city: req.body.city,
        img: {
          data: req.file.filename,
          contentType: "image/png",
        },
      });
      console.log(req.body.title);
      newImage
        .save()
        .then(() => res.send("successfully upload"))
        .catch((err) => console.log("error", err));
    }
  });
  res.redirect("/");
});
app.get("/image", (req, res) => {
  console.log(req.body);
  ImageModel.find({}, function (err, data) {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    res.json(data);
  });
});

app.listen(3000, () => {
  console.log(`server is runnning at port number ${port}`);
});
