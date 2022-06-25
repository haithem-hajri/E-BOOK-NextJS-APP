import connectDB from "../../../middleware/database";
//import {Contact} from '../../models/Contact';
const formidable = require("formidable");
const fs = require("fs");
const Book = require ("../../../models/Book")
const User = require("../../../models/User");
const handler = async (req: any, res: any) => {
  
  
   if (req.method === "GET") {
   
   
  } else {
    res.status(422).send("req_method_not_supported");
  }
};
export const config = {
  api: {
    bodyParser: false,
  },
};
export default connectDB(handler);
