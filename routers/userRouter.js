const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body.registerData;
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
    console.log(passwordHash);
    const user = new User({
      name,
      email,
      passwordHash,
    });
    const savedUser = await user.save();

    //JWT
    const jwtData = {
      id: savedUser._id,
    };
    const token = jwt.sign(jwtData, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true }).send();
  } catch (error) {
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body.loginData;
    console.log(email, password);
    if (!(email && password)) {
      return res.status(400).json({ errorMessage: "Please enter all required fields" });
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ errorMessage: "Incorrect Email or Password" });
    }
    const correctPassword = await bcrypt.compare(password, findUser.passwordHash);
    console.log(correctPassword);
    if (!correctPassword) {
      return res.status(401).json({ errorMessage: "Incorrect Email or Password" });
    }

    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET);

    res.cookie("token", token, { httpOnly: true }).send();
  } catch (error) {
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json(null);
    }
    const validateUser = jwt.verify(token, process.env.JWT_SECRET);
    res.json(validateUser.id);
  } catch (error) {
    return res.json(null);
  }
});

router.get("/logout", (req, res) => {
  try {
    res.clearCookie("token").send();
  } catch (error) {
    return res.json(null);
  }
});

module.exports = router;
