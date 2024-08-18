const razorpay = require('razorpay');

const dotenv = require('dotenv');

dotenv.config();

exports.createRazorpayInstance = () => {
    return new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID, // Your razorpay_key_id
        key_secret: process.env.RAZORPAY_KEY_SECRET // Your razorpay_key_secret
    });
}

