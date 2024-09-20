const express = require("express");
const bodyparser = require("body-parser");
const mongoos = require("mongoose");
const bycrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const Leavedata=require("./mongo");//leavea data mongo db schema and connect ot data base
const { Router } = require("express");
//Logind page schema and data and password encrypt
mongoos.set('strictQuery', true) 
const passwords=async (password)=>{
    const passwordhash=await bycrypt.hash(password,12)
    console.log(passwordhash)
}


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
const loginschemas =new mongoos.Schema({
  name: String,
  email: String,
  password: String,
});

const Logind = mongoos.model("Logind", loginschemas);


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

app.get("/index", (req, res) => {
  res.render("index")

//   Login.findOne({ name: name }, (err, post) => {
//     res.render("home", { name: post.name });
//   });
   
});
app.get("/login",(req,res)=>{
  res.render("login")
})
app.post("/", async(req, res) => {
  name = req.body.username;
  password = req.body.password;
   const username=await Logind.findOne({name:name})
   const isMatch=await bycrypt.compare(password,username.password)
   console.log(isMatch)
  //  const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2FjOTBiNGFkYzc4YjNlZDM4NzY0MzAiLCJpYXQiOjE2NzIzOTk2NDZ9.doH4EETXFrPa2e93WA5WGisuJ9bVpnAIMnMfe_KTHhc"
  //  const user=jwt.verify(t,"thisisjayanthmadhavadminofcbitleaveportalwebsite")
  //  console.log(user)
   if(isMatch){
    res.redirect("/index");
   }

   else{
    res.redirect("/login")
   }
   app.get("/scucces", (req, res) => {
    res.render("scucces");
  });

  app.post("/index", async (req, res) => {
      const leavedata= new Leavedata({
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    eid : req.body.eid,
    email:req.body.email,
    noleav : req.body.noleav,
    leavereason:req.body.leavereason,
    startdate : req.body.startdate,
    enddate : req.body.enddate,
    isapprove:false
  })
      const datasent=await leavedata.save()
    res.status(200).redirect("/scucces");
  });
});
app.listen(8000, (req, res) => {
  console.log("the server is on");
});
