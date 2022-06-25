import connectDB from "../../../middleware/database";

const Book = require("../../../models/Book");
const handler = async (req: any, res: any) => {
  if (req.method === "GET") {
    console.log("req:", req.query.id);
    const id = req.query.id;
    Book.findById(id)
      .select("image")
      .then((book: any) => {
        // res.set("Content-Type", book.image.contentType);
        res.setHeader("Content-Type", book.image.contentType);
        res.send(book.image.data);
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
    // res.send(id)
    /* try {
      const books = await Book.find()
      .select("-image -book_file")
      .populate('created_by','name', User);
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json(err);
    }*/
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
