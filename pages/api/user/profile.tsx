import connectDB from "../../../middleware/database";
const User = require("../../../models/User");
var bcrypt = require("bcryptjs");

const profile = async (req: any, res: any) => {
  try {
    if (req.method === "POST") {
      const { email } = req.body;

      // console.log(email, password, firstName, lastName)

      const user = await User.findOne({ email: email });

      user.password = undefined;

      return res.status(200).send(user);
    }
  } catch (err) {
    console.log(err);
  }
};
export default connectDB(profile);
