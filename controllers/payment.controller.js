// import razorpay from "../config/razorpay.js";
// import crypto from "crypto";
// import User from "../models/User.js";

// // CREATE ORDER
// export const createOrder = async (req, res) => {
//   const options = {
//     amount: 19900, // ₹199
//     currency: "INR",
//     receipt: "receipt_" + Date.now(),
//   };

//   const order = await razorpay.orders.create(options);
//   res.json(order);
// };

// // VERIFY PAYMENT
// export const verifyPayment = async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//   } = req.body;

//   const sign = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSign = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(sign.toString())
//     .digest("hex");

//   if (expectedSign === razorpay_signature) {
//     // ✅ upgrade user
//     await User.findByIdAndUpdate(req.user.id, {
//       plan: "pro",
//     });

//     res.json({ success: true });
//   } else {
//     res.status(400).json({ success: false });
//   }
// };

import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import User from "../models/User.js";

// ✅ CREATE ORDER

// export const createOrder = async (req, res) => {
//   try {
//     const options = {
//       amount: 19900, // ₹199
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };

//     const order = await razorpay.orders.create(options);

//     res.json(order);
//   } catch (err) {
//     console.log("CREATE ORDER ERROR:", err);
//     res.status(500).json({ msg: "Order creation failed" });
//   }
// };

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // ✅ get amount from frontend

    if (!amount) {
      return res.status(400).json({ msg: "Amount is required" });
    }

    const options = {
      amount: amount * 100, // ✅ convert ₹ → paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    console.log("Creating order for:", amount); // 🧪 debug

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    console.log("CREATE ORDER ERROR:", err);
    res.status(500).json({ msg: "Order creation failed" });
  }
};

// ✅ VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      // ✅ upgrade user
      await User.findByIdAndUpdate(req.user.id, {
        plan: "pro",
      });

      return res.json({ success: true }); // ✅ VERY IMPORTANT
    }

    return res.status(400).json({ success: false });

  } catch (err) {
    console.log("VERIFY ERROR:", err);
    res.status(500).json({ msg: "Verification failed" });
  }
};