import mongoose, { ConnectOptions } from "mongoose";
const DB =
  process.env.MONGODB_URI ||
  "mongodb+srv://movie:99256188@movie.mp36rv4.mongodb.net/?retryWrites=true&w=majority";
const connectDB = (handler: any) => async (req: any, res: any) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as ConnectOptions);
  return handler(req, res);
};

export default connectDB;
