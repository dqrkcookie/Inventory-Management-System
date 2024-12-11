import mongoose from 'mongoose';

const dbConnect = () => {
  mongoose
    .connect('mongodb://localhost')
    .then(() => console.log('Connected to DB!'))
    .catch((err) => console.log(`Error encountered: ${err}`));
};

export default dbConnect;
