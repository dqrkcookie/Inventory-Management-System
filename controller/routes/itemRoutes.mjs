import { Router } from 'express';
import { Item } from '../../model/itemSchemas.mjs';
import session from 'express-session';
import flash from 'connect-flash';
import { validationResult, matchedData, checkSchema } from 'express-validator';
import { inputValidators } from '../src/utils/userInputValidators.mjs';

const router = Router();

router.use(
  session({ secret: 'secret', resave: false, saveUninitialized: true })
);
router.use(flash());

router.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).render('main', { items });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error retrieving data from the database: ${err}` });
  }
});

router.post('/post', checkSchema(inputValidators), async (req, res) => {
  const body = matchedData(req);
  const newItem = new Item(body);
  try {
    const savedItem = await newItem.save();
    if (!savedItem) return res.status(400).json({ message: 'Bad request' });
    req.flash('success', 'New item added successfully!');
    return res.status(201).redirect('/');
  } catch (err) {
    req.flash('missing', 'Adding item failed!');
    return res.status(400).redirect('/');
  }
});

router.delete('/delete/:id', async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const deleteItem = await Item.findByIdAndDelete(id);
    if (!deleteItem)
      return res.status(404).json({ message: 'Item not found!' });
    req.flash('deleted', `Item ${deleteItem.model} has been deleted!`);
    return res.status(200).redirect('/');
  } catch (err) {
    console.log(err);
  }
});

router.patch('/patch/:id', checkSchema(inputValidators), async (req, res) => {
  const { id } = req.params;
  const data = matchedData(req);
  const updatedItem = await Item.findByIdAndUpdate(id, data);
  const result = validationResult(req);
  // console.log(result.isEmpty());
  if (result.isEmpty()) {
    try {
      if (!updatedItem) return res.status(400).json({ message: 'Bad request' });
      req.flash('updated', `Item ${updatedItem.model} has been updated!`);
      return res.status(200).redirect('/');
    } catch (err) {
      console.log(err);
    }
  }
  req.flash('failed', `Updating ${updatedItem.model} failed!`);
  return res.status(400).redirect('/');
});

export default router;
