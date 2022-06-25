import mongoose from "mongoose";
const validator = require("validator");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  since: {
    type: Date,
    default: Date.now,
  },
});

//var Contact = mongoose.model('Contact', contactSchema);

//export default Contact;
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
