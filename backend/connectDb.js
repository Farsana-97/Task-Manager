import mongoose from "mongoose";

const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log(`Connected to MongoDB`);
    });
  } catch (error) {
    return console.error("Mongo error:", error.message);
  }
};

export default connect;
