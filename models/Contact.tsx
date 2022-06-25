// model schema for Contact
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  since: {
    type: Date,
    default: Date.now
  }
});

//mongoose.models = {};

//var Contact = mongoose.model('Contact', contactSchema);

//export default Contact;
module.exports = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
//module.exports = mongoose.model("Contact", contactSchema);
