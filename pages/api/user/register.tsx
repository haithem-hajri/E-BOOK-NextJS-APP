import connectDB from "../../../middleware/database";
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../../../models/User");

//connectDB();

const register = async (req: any, res: any) => {
  try {
    if (req.method === "POST") {
      const { name, email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        since: new Date(),
      });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      return res.status(201).json({
        message: "User logged in successfully",
        token,
        user: newUser,
      });
      {
        /**********update user************/
      }
    } else if (req.method === "PUT") {
      const user: any = JSON.parse(req.cookies && req.cookies.user);
      const id = user._id;
      const { name, email } = req.body;
      User.findById(id)
        .then((user: any) => {
          if (email) {
            user.email = email;
          }
          if (name) {
            user.name = name;
          }

          user.save().then((user: any) => {
            res.json({
              message: "User updated successfully",
              user: user,
            });
          });
        })
        .catch((err: any) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    }
  } catch (error) {
    console.log(error);
  }
};
export default connectDB(register);
