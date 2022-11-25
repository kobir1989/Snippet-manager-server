const router = require("express").Router();
const Snippet = require("../models/snippetModel");
const auth = require("../middleware/auth");

//Get Route
router.get("/", auth, async (req, res) => {
  try {
   console.log(req.user, "USer");
    const snippet = await Snippet.find();
    res.status(200).json(snippet);
  } catch (error) {
    console.log(error);
  }
});

//Post Route
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, code } = req.body.snippetInpuptData;
    console.log("POST", title, description, code);
    if (!(title && description && code)) {
      return res.status(400).json({ errorMessage: "You need to enter at least description or some code." });
    }
    const newSnippet = new Snippet({
      title,
      description,
      code,
    });
    await newSnippet.save();
    res.status(200).json({ message: "Snippet saved successfully" });
  } catch (error) {
    res.status(500).send();
  }
});

//Delete Route

router.delete("/:id", auth, async (req, res) => {
  try {
    const snippetId = req.params.id;
    if (!snippetId) {
      return res.status(400).json({ errorMessage: "Snippet id not found." });
    }

    const existingSnippet = await Snippet.findById(snippetId);
    if (!existingSnippet) {
      res.status(400).json({ errorMessage: "Snippet does not Exist" });
    }
    await existingSnippet.delete();
    res.json(existingSnippet);
    console.log(snippetId);
  } catch (error) {
    res.status(500).send();
  }
});

//Put Router
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, code } = req.body.snippetInpuptData;
    console.log("PUT", req.body);
    if (!(title && description && code)) {
      return res.status(400).json({ errorMessage: "Title, Description, Code can not be empty" });
    }
    const snippetId = req.params.id;
    console.log("PUT_ID", snippetId);
    if (!snippetId) {
      return res.status(400).json({ errorMessage: "Snippet id not found" });
    }

    const originalSnippet = await Snippet.findById(snippetId);
    if (!originalSnippet) {
      return res.status(400).json({ errorMessage: "Snippet dose not Exist" });
    }
    originalSnippet.title = title;
    originalSnippet.description = description;
    originalSnippet.code = code;

    const updatedSnippet = await originalSnippet.save();
    res.status(200).json(updatedSnippet);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
