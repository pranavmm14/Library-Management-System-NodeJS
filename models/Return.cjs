const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        bookid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true,
        },
        duedate: { type: Date },
        fine: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Return = mongoose.model("Return", returnSchema);
module.exports = Return;
