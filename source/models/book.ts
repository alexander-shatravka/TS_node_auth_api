import mongoose, { Schema } from 'mongoose';
import IBook from '../interfaces/book';

const BookSchema: Schema = new Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true },
    isbn: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    publisher: { type: String },
    description: { type: String },
    publishedDate: { type: String },
    image: { type: String },
    rating: { type: Number, default: 0 }
  },
  {
    // timestamps: true
  }
);

export default mongoose.model<IBook>('Book', BookSchema);
