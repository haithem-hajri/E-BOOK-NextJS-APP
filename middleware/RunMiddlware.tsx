import { AnyBulkWriteOperation } from "mongodb";

const SECRET : string | any = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

 const  runMiddleware=(req:any, res:any)=> {
  const { cookies } = req;
  const token:any = cookies.token;
  if (token) {
   // const token  = token.split(" ")[1];
    jwt.verify(token, SECRET, (err:any, decoded:any) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      req.user = decoded;
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export default runMiddleware; 