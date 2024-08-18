const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getPaymentHistory } = require('../controllers/payments_controllers');

router.post('/createOrder', createOrder);
router.post('/verifyPayment', verifyPayment);
router.get('/history', getPaymentHistory);

module.exports = router;
