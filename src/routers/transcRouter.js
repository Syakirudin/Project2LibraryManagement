import express from 'express';
import TranscController from '../controllers/transcController.js';

const TranscRouter = express.Router();

// Routes for transaction management
TranscRouter.post('/add', TranscController.addTransc);
TranscRouter.get('/', TranscController.getAllTransc);
TranscRouter.put('/edit/:id', TranscController.updateTransc); // Update transaction by id

export default TranscRouter;
