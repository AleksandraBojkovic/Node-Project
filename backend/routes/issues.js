const express = require('express');
const Issue = require("../models/Issue");
const router = express.Router();


//Get back all the issues
router.get("/", async (req, res) => {
    try {
        const issues = await Issue.find();
        res.json(issues);
    } catch(err){
        res.json({message: err});
    }
}); 

//submits a issue
router.post("/", async (req, res)=> {
     const issue = new Issue({
         description: req.body.description,
         date: req.body.date
     });
     await issue.save();
     res.send(true);
});

//specific issue
router.get('/:issueId', async (req,res) => {
    try { 
    const issue = await Issue.findById(req.params.issueId)
    res.json(issue); 
} catch(err){
    res.json({message: err});
}
});

//Delete Issue
router.delete('/:issueId', async (req, res) => {
    try { 
   const removedIssue = await Issue.remove({_id: req.params.issueId });
    res.json(removedIssue)
} catch(err){ 
    res.json({message: err});
 }
});

module.exports = router;