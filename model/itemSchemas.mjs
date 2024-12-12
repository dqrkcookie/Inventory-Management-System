import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 36,
    trim: true,
  },
  model: {
    type: String,
    minlength: 3,
    maxlength: 36,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
});

export const Item = mongoose.model('Item', itemSchema);
