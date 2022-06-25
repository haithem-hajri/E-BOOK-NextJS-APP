import connectDB from "../../middleware/database";
//import {Contact} from '../../models/Contact';
const formidable = require("formidable");
const fs = require("fs");
const Book = require("../../models/Book");
const User = require("../../models/User");
import runMiddleware from "../../middleware/RunMiddlware";
const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    await runMiddleware(req, res);
    const user: any = JSON.parse(req.cookies && req.cookies.user);
    const promise = new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();
      form.parse(req, (err: any, fields: any, files: any) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    return promise.then(({ fields, files }: any) => {
      const { title, author, category, description, language, rating } = fields;
      var book = new Book({
        title,
        author,
        category,
        description,
        language,
        rating,
        created_by: user._id,
      });
      if (files.image) {
        if (files.image.size > 10000000) {
          res.status(400).json({
            error: "Image should be less then 1mb in size",
          });
        }
        book.image.data = fs.readFileSync(files.image.filepath);
        book.image.contentType = files.image.mimetype;
      } else {
        res.status(400).json({ error: "upload image" });
      }
      if (files.book_file) {
        book.book_file.data = fs.readFileSync(files.book_file.filepath);
        book.book_file.contentType = files.book_file.mimetype;
      } else {
        res.status(400).json({ error: "upload book" });
      }
      book.save();
      res.status(200).json(book);
    });
  } else if (req.method === "GET") {
    const { language, category } = req.query;
    let query: any = {};
    if (language) {
      query.language = { $in: language.split(",") };
    }
    if (category) {
      query.category = { $in: category.split(",") };
    }
    try {
      const books = await Book.find(query)
        .select("-image -book_file")
        .populate("created_by", "name", User);
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json(err);
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
