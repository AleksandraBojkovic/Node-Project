const express = require("express");
const Issue = require("../models/Issue");
const router = express.Router();

//Get back all the issues
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submits a issue
router.post("/", async (req, res) => {
  const issue = new Issue({
    description: req.body.description,
    date: req.body.date
  });
  await issue.save();
  res.send(true);
});

//Specific issue
router.get("/:issueId", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.issueId);
    res.json(issue);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete Issue
router.delete("/:issueId", async (req, res) => {
  try {
    const removedIssue = await Issue.remove({ _id: req.params.issueId });
    res.json(removedIssue);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a issue
router.patch("/:issueId", async (req, res) => {
  try {
    const updateIssue = await Issue.updateOne(
      { _id: req.params.issueId },
      { $set: { description: req.body.description } }
    );
    res.json(updateIssue);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/status/:issueId", async (req, res) => {
  try {
    const newStatus = req.body.status;
    const issueId = req.params.issueId;
    const updateStatus = await Issue.updateOne(
      { _id: issueId },
      { $set: { status: newStatus } }
    );
    res.json(updateStatus);
  } catch (err) {
    res.json({ message: err });
  }
});

//Comments
router.post("/comment/:issueId", async (req, res) => {
  try {
    const issueId = req.params.issueId;
    const newComment = req.body.comment;
    if (newComment == null) {
      res.send("Comment format is incorrect.");
    }
    const updateComment = await Issue.updateOne(
      { _id: issueId },
      { $push: { comments: newComment } }
    );
    res.json(updateComment);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
