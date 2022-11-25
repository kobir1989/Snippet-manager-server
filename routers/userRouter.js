const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword);
    if (!(name && email && password && confirmPassword)) {
      return res.status(400).json({ errorMessage: "Please enter all required fields" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ errorMessage: "Password did not match" });
    }
    if (password.length < 6) {
      return res.status(400).json({ errorMessage: "Password can not be less then 6 char:" });
    }
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(400).json({ errorMessage: "Email already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash)
    const user = new User({
      name,
      email,
      passwordHash,
    });
   const savedUser =  await user.save();
   
   //JWT
   const jwtData = {
    id: savedUser._id
   }
  const token = jwt.sign(jwtData, process.env.JWT_SECRET);
  res.cookie("token", token, {httpOnly:true}).send()
  } catch (error) {
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
});

module.exports = router;
