const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  prn: {
    type: String,
    required: true,
    unique: true,
  },
  transactionHash: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
