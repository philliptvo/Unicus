import mongoose from 'mongoose';

// MongoDB config
const db = process.env.MONGODB_URI;

const connectDB = () => {
  return mongoose.connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

export default connectDB;
