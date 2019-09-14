const mongoose = require("mongoose");

const statusEnum = Object.freeze({
  PENDING: "pending",
  COMPLETE: "complete"
});

const IssueSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "pending",
    enum: Object.values(statusEnum)
  },
  comments: [
    {
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  file: {
    type: Buffer,
    required: false
  }
});

module.exports = mongoose.model("Issues", IssueSchema);
