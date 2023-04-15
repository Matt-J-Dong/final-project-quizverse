const mongoose = require('mongoose');
import { User } from './user-schema';
const Schema = mongoose.Schema;

const flashcardSchema = mongoose.Schema({
  term: { type: String, required: true },
  definition: { type: String, required: true }
});

const flashcardSetSchema = new Schema({
  title: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20 },
  description: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 50
  },
  createdBy: { type: User, required: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  editedAt: { type: Date, default: () => Date.now() },
  flashcards: flashcardSchema
});

module.exports = mongoose.model('FlashcardSet', flashcardSetSchema);
