const mongoose = require("mongoose");

const IssueSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Issues", IssueSchema);
