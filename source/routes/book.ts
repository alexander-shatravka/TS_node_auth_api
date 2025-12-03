import express from 'express';
import controller from '../controllers/book';

const router = express.Router();

router.post('/add', controller.add);
router.patch('/:id/update', controller.update);
router.delete('/remove', controller.remove);
router.get('/get/all', controller.getAllBooks);
router.get('/get/my', controller.getUserBooks);
router.get('/get-by-isbn/:isbn', controller.getBookByByIsbn);
router.get('/get/:id', controller.getBookById);
router.put('/:id/approve-swap', controller.approveBookSwap);

export = router;
