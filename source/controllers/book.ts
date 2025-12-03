import { NextFunction, Request, Response } from 'express';
import Book from '../models/book';
import User from '../models/user';

const BOOK_STATUS = {
  available: 'available',
  requested: 'requested',
  not_available: 'not_available'
};

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
  const query = {};

  if (req.query.status) {
    // @ts-ignore
    query['status'] = req.query.status;
  }

  // TODO: add pagination, sorting, search, filtering
  // Book.find({
  //   $or: [
  //     { name: { $regex: search, $options: 'i' } },
  //     { isbn: { $regex: search, $options: 'i' } },
  //     { author: { $regex: search, $options: 'i' } }
  //   ]
  // })
  Book.find(query)
    .exec()
    .then((books) => {
      if (books.length === 0) {
        return res.status(200).json({
          message: 'No books found'
        });
      }

      return res.status(200).json({
        books: books,
        count: books.length
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const getUserBooks = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  // const token = authHeader.split(' ')[1];

  const ownerId = '67c83ddc479dc920c70045a8'; // TODO: get user id from token
  const status = req.query.status || null;

  const query = {ownerId};

  if (req.query.status) {
    // @ts-ignore
    query['status'] = req.query.status;
  }

  Book.find(query)
    .exec()
    .then((books) => {
      if (books.length === 0) {
        return res.status(200).json({
          message: 'No books found for this user'
        });
      }

      return res.status(200).json({
        books: books,
        count: books.length
      });
    })
    .catch((error) => {
      console.log('get user books error', error);
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const getBookByByIsbn = (req: Request, res: Response, next: NextFunction) => {
  const { isbn } = req.params;
  console.log('111isbn', isbn);

  const MOCKED_IMDB_BOOK = {
    name: 'Mocked Book',
    author: 'Mocked Author',
    genre: 'Mocked Genre',
    publisher: 'Mocked Publisher',
    description: 'Mocked Description',
    publishedDate: '2023-01-01',
    image: '',
  };

  return res.status(200).json({
    ...MOCKED_IMDB_BOOK
  });
};

const approveBookSwap = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  console.log('approveBookSwap book id', id);

  const ownerId = req.body.ownerId || '67c83ddc479dc920c70045a8';
  const updateData = {
    status: BOOK_STATUS.not_available,
    ownerId
  };

  console.log('new ownerId', ownerId);

  Book.updateOne({ _id: id }, updateData).then((result) => {
    if (result.nModified === 0) {
      return res.status(404).json({
        message: 'Book not found or no changes made'
      });
    }

    return res.status(200).json({
      message: 'Book approved successfully',
      book: updateData
    });
  }).catch((error) => {
    console.log('approve swap book error', error);
    return res.status(500).json({
      message: error.message,
      error
    });
  });
};

const getBookById = (req: Request, res: Response, next: NextFunction) => {
  console.log('get book by id', req.params);
  const { id } = req.params;

  Book.findById(id)
    .exec()
    .then((book) => {
      if (!book) {
        return res.status(404).json({
          message: 'Book not found'
        });
      }

      return res.status(200).json({
        book: book
      });
    })
    .catch((error) => {
      console.log('get book by id error', error);
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const add = (req: Request, res: Response, next: NextFunction) => {
  const book = new Book(req.body);

  book
    .save()
    .then((result) => {
      return res.status(201).json({
        message: 'Book added successfully',
        book: result
      });
    })
    .catch((error) => {
      console.log('add book error', error);

      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

const update = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  console.log('update book id', id);

  const updateData = req.body;

  console.log('update book data', updateData);

  Book.updateOne({ _id: id }, updateData).then((result) => {
    if (result.nModified === 0) {
      return res.status(404).json({
        message: 'Book not found or no changes made'
      });
    }

    return res.status(200).json({
      message: 'Book updated successfully',
      book: updateData
    });
  }).catch((error) => {
    console.log('update book error', error);
    return res.status(500).json({
      message: error.message,
      error
    });
  });
};

const remove = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: 'remove book'
  });
};

export default {
  getAllBooks,
  getUserBooks,
  getBookById,
  getBookByByIsbn,
  approveBookSwap,
  add,
  update,
  remove
};
