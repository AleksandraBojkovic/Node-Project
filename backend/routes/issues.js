const express = require("express");
const Issue = require("../models/Issue");
const router = express.Router();

/**
 * Get back all the issues.
 * @path {GET} /issues
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * Submits a issue.
 * @path {POST} /issues
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 * @param req.body.description {String} The issue description 
 * @param req.body.date {String} The issue date 
 */
router.post("/", async (req, res) => {
  try {
    const issue = new Issue({
      description: req.body.description,
      date: req.body.date
    });
    if (issue.description == undefined || issue.description == null) {
      res.end("Incorect post input.");
      return;
    } else {
      await issue.save();
      res.send(true);
    }
  } catch (err) {
    res.json({ message: err });
  }
});
/**
 * Get specific issue via Id.
 * @path {GET} /:issueId
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 * @param req.params.issueId {String} The issueId param.
 */
router.get("/:issueId", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.issueId);
    res.json(issue);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * Delete specific issue.
 * @path {DELETE} /:issueId
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 * @param req.params.issueId {String} The issueId param.
 */
router.delete("/:issueId", async (req, res) => {
  try {
    const removedIssue = await Issue.remove({ _id: req.params.issueId });
    res.json(removedIssue);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * Update an issue.
 * @path {PATCH} /:issueId
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 * @param req.params.issueId {String} The issueId param.
 * @param req.body.description {String} The issue description.

 */
router.patch("/:issueId", async (req, res) => {
  try {
    const newDescription = req.body.description;
    const issueId = req.params.issueId;
    const updateIssue = await Issue.updateOne(
      { _id: issueId },
      { $set: { description: newDescription } }
    );
    if (
      newDescription == undefined ||
      newDescription == null
    ) {
      res.end("Incorect update input.");
      return;
    } else {
      res.json(updateIssue);
    }
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 *  Update status.
 * @path {POST} /status/:issueId
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 * @param req.params.issueId {String} The issueId param.
 * @param req.body.status {String} The issue status.
 */
router.post("/status/:issueId", async (req, res) => {
  try {
    const newStatus =  req.body.status;
    const issueId = req.params.issueId;
    const updateStatus = await Issue.updateOne(
      { _id: issueId },
      { $set: { status: newStatus } }
    );
    if (newStatus == undefined || newStatus == null) {
      res.end("Incorect status input.");
      return;
    } else {
      res.json(updateStatus);
    }
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * Update comments
 * @path {POST} /:issueId/comment
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 * @param req.params.issueId {String} The issueId param.
 * @param req.body.comment {String} The issue comment.
 */
router.post("/:issueId/comment", async (req, res) => {
  try {
    const issueId = req.params.issueId;
    const newComment = {
      "text": req.body.comment
    };
    if (newComment.text == null || newComment.text == undefined) {
      res.end("Comment format is incorrect.");
      return;
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
