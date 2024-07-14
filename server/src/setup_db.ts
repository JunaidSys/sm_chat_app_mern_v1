import mongoose from 'mongoose';
import { config } from '@root/config';
import Logger from 'bunyan';
const log: Logger = config.createLogger('setup_database mongoose error');

export default () => {

  const connectDB = async () => {
    try {
      const response = await mongoose.connect(`${config.DATABASE_URL}`);
      if (!response) return process.exit(1);
      log.info('Database connected........');
      console.log(`DB connected ${config.DATABASE_URL}`);
      console.log(`Redis is connected on port ${config.REDIS_HOST}`);
    } catch (error) {
      //  console.log(error)
      //  console.log(`Error Mongoose DB :${error}`);
      log.error(error);
      log.error(`Error Mongoose DB :${error}`);
      return process.exit(1);
    }
  };
  connectDB();
  mongoose.connection.on('disconnected', connectDB);

    //method 1
  // const connectDB = () => {
  //     mongoose.connect("mongodb://127.0.0.1:27017/appsm").then(() => {
  //         console.log("Successfully connected to database")
  //     }).then(error => {
  //         console.log(error)
  //         console.log(`Error Mongoose DB :${error}`);
  //         return process.exit(1)

  //     })
  // }
  // connectDB()
  // mongoose.connection.on("disconnected", connectDB)
  //method 2
};

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL);
//     console.log("DB has been connected");
//   } catch (error) {
//     console.log("DB Connection failed", error.message);
//   }
// };

// module.exports = connectDB;
