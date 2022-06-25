import connectDB from "../../../middleware/database";
const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
//import jwt from "jsonwebtoken";
var bcrypt = require("bcryptjs");
const SECRET: string | any = process.env.JWT_SECRET;
const handler = async (req: any, res: any) => {
  const { email, password } = req.body;

  // console.log(req.body)
  try {
    if (req.method === "POST") {
      if (!email || !password) {
        return res.status(422).json({ error: "please add all the fields" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "Invalid credentials" });
      }
      const doMatch = await bcrypt.compare(password, user.password);
      if (!doMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      } else if (doMatch) {
        const token = jwt.sign({ userId: user._id }, SECRET, {
          expiresIn: "7d",
        });

        res.status(201).json({
          token,
          user,
          message: "login successful",
        });
      }
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};
export default connectDB(handler);
