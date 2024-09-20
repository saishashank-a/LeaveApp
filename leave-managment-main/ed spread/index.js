const express = require("express");
const bodyparser = require("body-parser");
const mongoos = require("mongoose");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Leavedata = require("./mongo"); //leavea data mongo db schema and connect ot data base
const { Router } = require("express");
//login page schema and data and password encrypt
mongoos.set("strictQuery", true);
const passwords = async (password) => {
  const passwordhash = await bycrypt.hash(password, 12);
  console.log(passwordhash);
};

mongoos
  .connect(
    "mongodb+srv://jayanth:jayanth@cluster0.8himuj3.mongodb.net/jayanth",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("error");
  });
const loginschema = new mongoos.Schema({
  name: String,
  email: String,
  password: String,
});

const Login = mongoos.model("Login", loginschema);

const app = express();
var name = "";
var password = "";
app.set("view engine", "ejs");
//login and home page
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/home", (req, res) => {
  Login.findOne({ name: name }, (err, post) => {
    res.render("home", { name: post.name });
  });
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/", async (req, res) => {
  name = req.body.username;
  password = req.body.password;
  const username = await Login.findOne({ name: name });
  const isMatch = await bycrypt.compare(password, username.password);
  console.log(isMatch);
  const t =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2FjOTBiNGFkYzc4YjNlZDM4NzY0MzAiLCJpYXQiOjE2NzIzOTk2NDZ9.doH4EETXFrPa2e93WA5WGisuJ9bVpnAIMnMfe_KTHhc";
  const user = jwt.verify(
    t,
    "thisisjayanthmadhavadminofcbitleaveportalwebsite"
  );
  console.log(user);
  if (isMatch) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});
//leaveapp data collection
app.get("/leaveapp", function (req, res, next) {
  Leavedata.find((err, docs) => {
    if (!err) {
      res.render("leaveapp", {
        data: docs,
      });
      console.log(docs);
    } else {
      console.log("failed to retrive the data");
    }
  });
});

// app.post("/leaveapp",(req,res)=>{
//   Leavedata.collection.drop()
//   console.log(req.body.approve)
//   if(req.body.approve=true){
//     res.render("approve")
//   }
//  else{
//   res.render("decline")
//  }
// })
const createtoken = async () => {
  const token = await jwt.sign(
    { _id: "63ac90b4adc78b3ed3876430" },
    "thisisjayanthmadhavadminofcbitleaveportalwebsite"
  );
  console.log(token);
};

var nodemailer = require("nodemailer");

// const mail=require("./approve")

app.post("/accept",(req,res)=>{
  var data = [];
  Leavedata.find((err, docs) => {
    var transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: "ugs21034_aids.madhav@cbit.org.in",
        pass: "Jamin@2004",
      },
    });
    for (var i = 0; i < docs.length; i++) {
      console.log(docs[i].email);
      data.push(docs[i].email);
      console.log(data);
    }

    var mailOptions = {
      from: "ugs21034_aids.madhav@cbit.org.in",
      to: data,
      subject: "Sending Email using Node.js",
      text: "your leave is accepted",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
  res.render("approve")
})
app.post("/reject",(req,res)=>{
  var data = [];
  Leavedata.find((err, docs) => {
    var transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: "ugs21034_aids.madhav@cbit.org.in",
        pass: "Jamin@2004",
      },
    });
    for (var i = 0; i < docs.length; i++) {
      console.log(docs[i].email);
      data.push(docs[i].email);
      console.log(data);
    }

    var mailOptions = {
      from: "ugs21034_aids.madhav@cbit.org.in",
      to: data,
      subject: "Sending Email using Node.js",
      text: "your mail is rejected",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
  res.redirect("decline")
})

createtoken();
app.listen(3000,(req,res)=>{
  console.log("the server is on at 3000")
})