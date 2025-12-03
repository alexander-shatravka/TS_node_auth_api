import { Document } from 'mongoose';

interface IBook extends Document {
  _id: string
  name: string
  isbn: string
  author: string
  genre?: string
  publisher?: string
  description?: string
  publishedDate?: string
  image?: string
  rating?: number
  ownerId?: string
  createdAt?: Date
  updatedAt?: Date
}

export default IBook;
