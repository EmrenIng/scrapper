var express = require('express');
var router = express.Router();
// Route for getting all headline from the db
app.get("/headlines", function(req, res) {
    db.Headline.find({})
        .then(function(dbHeadline) {
            res.json(dbHeadline);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// Route for grabbing a specific headline by id, populate it with it's note
app.get("/headline/:id", function(req, res) {
    db.headline.findOne({ _id: req.params.id })
        .populate("note")
        .then(function(dbHeadline) {
            res.json(dbHeadline);
        })
        .catch(function(err) {
            res.json(err);
      });
});

// Route for saving/updating an Headline's associated Note
app.post("/headlines/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Headline.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function(dbHeadline) {
            res.json(dbHeadline);
        })
        .catch(function(err) {
            res.json(err);
        });
});

module.exports = router;