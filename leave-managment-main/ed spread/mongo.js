const mongoose = require("mongoose");
require("mongoose-type-email");
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://jayanth:jayanth@cluster0.8himuj3.mongodb.net/jayanth",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("not connected");
  });
const leaveschema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  eid: {
    type: Number,
    require: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    require: true,
  },
  noleav: {
    type: Number,
    require: true,
  },
  leavereason: {
    type: String,
    require: true,
  },
  startdate: {
    type: Date,
    require: true,
  },
  enddate: {
    type: Date,
    require: true,
  },
});
const Leavedata = new mongoose.model("Leavedata", leaveschema);
module.exports = Leavedata;
