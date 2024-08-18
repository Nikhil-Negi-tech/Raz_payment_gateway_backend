const { createRazorpayInstance } = require("../config/razorpay_config");
const crypto = require('crypto');
require('dotenv').config();
const razorpayInstance = createRazorpayInstance();

let paymentHistory = [];  // Temporary in-memory storage for payment history

exports.createOrder = async (req, res) => {
    const { courseId, amount } = req.body;

    const options = {
        amount: amount ,
        currency: 'INR',
        receipt: `receipt_order_${courseId}`,
    };
    try {
        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Some error occurred'
                });
            }
            return res.status(200).json({
                success: true,
                data: order
            });
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(order_id + "|" + payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === signature) {
        paymentHistory.push({
            order_id,
            payment_id,
            amount: req.body.amount,
            courseId: req.body.courseId,
            date: new Date().toISOString(),
        });

        return res.status(200).json({
            success: true,
            message: 'Payment successful'
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'Payment verification failed'
        });
    }
}

exports.getPaymentHistory = (req, res) => {
    return res.status(200).json({
        success: true,
        data: paymentHistory
    });
}
