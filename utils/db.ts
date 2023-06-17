const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log('Connected to database.');
  } catch (error) {
    console.log(error, 'Could not connect to database.');
  }
};

export default connection;