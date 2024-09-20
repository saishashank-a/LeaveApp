const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const Leavedata = require("./mongo");
var firstname = "";
var lastname = "";
var eid = "";
var email = "";
var noleav = "";
var startdate = "";
var enddate = "";
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/scucces", (req, res) => {
  res.render("scucces");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.post("/leaveapp", (req, res) => {
  if (req.body.approve == true) {
    res.redirect("/approve");
  } else {
    res.redirect("/decline");
  }
});
app.post("/", async (req, res) => {
  const leavedata = new Leavedata({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    eid: req.body.eid,
    email: req.body.email,
    noleav: req.body.noleav,
    leavereason: req.body.leavereason,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    isapprove: false,
  });
  const datasent = await leavedata.save();
  res.status(200).redirect("/scucces");
});
app.listen(8000, () => {
  console.log("sever is on");
});
module.exports = email;
