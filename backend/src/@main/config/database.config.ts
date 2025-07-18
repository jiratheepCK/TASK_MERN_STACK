import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const databaseUrl: string = process.env.MONGO_URL || 'mongodb://mongo:27017/task_db';
    await mongoose.connect(databaseUrl);
    console.log(`MongoDB ${databaseUrl} connected`);
  } catch (err) {
    console.log(process.env.MONGO_URL)
    console.error(err);
    process.exit(1);
  }
};