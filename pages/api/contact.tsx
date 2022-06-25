import connectDB from "../../middleware/database";
//import {Contact} from '../../models/Contact';
const Contact = require("../../models/Contact");

const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    // Check if name, email or password is provided
    const { name, email, message } = req.body;
    if (name && email && message) {
      try {
        // Hash password to store it in DB

        var contact = new Contact({
          name,
          email,
          message,
        });
        // Create new user
        var contactCreated = await contact.save();
        return res.status(200).send(contactCreated);
      } catch (error: any) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
