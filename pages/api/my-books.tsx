import connectDB from "../../middleware/database";
const User = require("../../models/User");
const Book = require("../../models/Book");
const handler = async (req: any, res: any) => {
  if (req.method === "GET") {
    const user: any = JSON.parse(req.cookies && req.cookies.user);
    const id = user._id;

    if (user) {
      // const id = req.query.id;
      Book.find({ created_by: id })
        .select("-image -book_file")
        .then((book: any) => {
          res.status(200).json(book);
        })
        .catch((err: any) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    } else {
      res.status(422).send("you must logged in");
    }
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
