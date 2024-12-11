import express from 'express';
import path from 'path';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
import itemRouter from '../routes/itemRoutes.mjs';
import dbConnect from '../../model/dbConnection.mjs';

const app = express();
const PORT = process.env.PORT || 4000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../../views')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(itemRouter);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../views'));

dbConnect();

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
