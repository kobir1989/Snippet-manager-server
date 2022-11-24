const router = require("express").Router();
const Snippet = require("../models/snippetModel");

router.post("/", async (req, res) => {
  const { title, description, code } = req.body;
  try {
    if(!(title && description && code)){
      return res.status(400).json({errorMessage: "You need to enter at least description or some code."})
    }
    const newSnippet = new Snippet({
      title,
      description,
      code,
    });
    await newSnippet.save();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
