var nodemailer = require("nodemailer");
const Leavedata = require("./mongo");
// const mail=require("./approve")

var transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: "ugs21034_aids.madhav@cbit.org.in",
    pass: "Jamin@2004",
  },
});

var getmail = async () => {
  var n = await Leavedata.findOne({ firstname: "jayanth" }).exec();
  console.log(n.email);
};
getmail();

var mailOptions = {
  from: "ugs21034_aids.madhav@cbit.org.in",
  to: "pradyumnabirudaraju@gmail.com",
  subject: "Sending Email using Node.js",
  text: "hi ra",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
