import connectDB from "../../../middleware/database";

const Book = require("../../../models/Book");
const handler = async (req: any, res: any) => {
  if (req.method === "GET") {
    console.log("req:", req.query.id);
    const id = req.query.id;
    Book.findById(id)
      .select("book_file")
      .then((book: any) => {
        // res.set("Content-Type", book.image.contentType);
        res.setHeader("Content-Type", book.book_file.contentType);
        res.send(book.book_file.data);
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
   
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
