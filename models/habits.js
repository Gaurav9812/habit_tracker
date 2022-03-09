const mongoose = require("mongoose");

const habitSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    aim: {
      type: String,
      required: true,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    time: {
      type: String,
      required: true,
    },
    days: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "habitStatus",
      },
    ],
    no_of_days_done: {
      type: Number,
      default: 0,
    },

    current_streak: {
      type: Number,
      default: 0,
    },
    longest_streak: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
