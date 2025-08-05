import express from 'express';

import { createStripeFineSession, verifyPayment } from '../controller/payment.js';

const paymentRouter = express.Router();

paymentRouter.post('/stripe-fine-session', createStripeFineSession)
paymentRouter.post('/verify-fine', verifyPayment)

export default paymentRouter;