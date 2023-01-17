const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("./userSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
const staticPath = path.join(__dirname);
console.log(path.join(__dirname));
app.use(express.static(staticPath));

require("./userSchema");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
router.get("/register", (req, res) => {
  User.find()
    .then((result) => {
      res.status(200).json({
        studentData: result,
      });
    })
    .catch((err) => {
      console.log("error of user", err);
    });
  res.send("Hello world from the server from auth js");
});

router.post("/register", async (req, res) => {
  const { name, password, cnpassword, email, phone, userType } = req.body;
  console.log("data", req.body.name);
  if (!name || !password || !cnpassword || !email || !phone || !userType) {
    return res
      .status(422)
      .json({ error: "All these fields must be fulfilled" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).sendFile(path.join(__dirname, "register.html"));
    }

    const user = new User({
      name,
      password,
      cnpassword,
      email,
      phone,
      userType,
    });

    await user.save();
    res
      .status(201)
      .send(
        `<h1> register successfully</h1><br/><button class=".btn-style-one"><a href="index.html">Go to home</a></button>`
      );
  } catch (err) {
    console.log(err);
  }
});

//LOGIN ROUTE
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ err: "field can't be empty" });
    }
    const userLogin = await User.findOne({ email: email });

    //for matching the password
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "user doesn't exist password wrong" });
      } else {
        res.sendFile(path.join(__dirname, "post.html"));
      }
    } else {
      res.status(400).json({ error: "user doesn't exist" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/logindonee", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ err: "field can't be empty" });
    }
    const userLogin = await User.findOne({ email: email });

    //for matching the password
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "user doesn't exist password wrong" });
      } else {
        res.sendFile(path.join(__dirname, "shop-single.html"));
      }
    } else {
      res.status(400).json({ error: "user doesn't exist" });
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/logincharity", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ err: "field can't be empty" });
    }
    const userLogin = await User.findOne({ email: email });

    //for matching the password
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "user doesn't exist password wrong" });
      } else {
        res.sendFile(path.join(__dirname, "appreovere.html"));
      }
    } else {
      res.status(400).json({ error: "user doesn't exist" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
