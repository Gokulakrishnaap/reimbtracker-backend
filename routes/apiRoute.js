import express from "express";
import { User } from "../models/user.js";
import { Form } from "../models/form.js";
import bcrypt from "bcrypt";

const router = express.Router();

// API - SignUp
router.post("/signup", async (req, res) => {
  try {
    const userFromDB = await User.findOne({ email: req.body.email });
    if (userFromDB) {
      res.status(400).send({ message: "Email already registered" });
      return;
    }
    if (req.body.password.length < 5) {
      res.status(400).send({ message: "Password must be longer" });
      return;
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // New User
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      employeeId: req.body.employeeId,
      contactNumber: req.body.contactNumber,
      city: req.body.city,
    });

    // Save User
    const user = await newUser.save();
    res.status(200).send({ message: "User Added Successfully", user: user });
  } catch (err) {
    console.log("Error...", err);
    res.status(500).send({ message: "Error adding User" });
  }
});

// API - Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send({ message: "Invalid Credentials" });
      return;
    }
    if (req.body.password.length < 5) {
      res.status(400).send({ message: "Invalid Credentials" });
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).send({ message: "Invalid Credentials" });
    } else {
      res.status(200).send({ message: "Login Successful", user: user });
    }
  } catch (err) {
    console.log("Error...", err);
    res.status(500).send({ message: "Login Error" });
  }
});

// API - Form Submit
router.post("/formsubmit", async (req, res) => {
  try {
    // New Form Submit
    const newForm = new Form({
      name: req.body.name,
      employeeId: req.body.employeeId,
      amount: req.body.amount,
      bankacc: req.body.bankacc,
      category: req.body.category,
      desc: req.body.desc,
    });

    if (!req.body.name) {
      res.send({ message: "Enter the Name" });
      return;
    } else if (!req.body.employeeId || req.body.employeeId == -1) {
      res.send({ message: "Enter a valid Employee ID" });
      return;
    } else if (!req.body.amount || req.body.amount == -1) {
      res.send({ message: "Enter a valid Amount" });
      return;
    } else if (!req.body.bankacc || req.body.bankacc == -1) {
      res.send({ message: "Enter a valid Bank Account Number" });
      return;
    } else if (!req.body.category) {
      res.send({ message: "Select the Category" });
      return;
    }

    const uniqueNum = Math.floor(Math.random() * 10000) + 10000;

    // Store Form Data
    const formData = await newForm.save();
    res.status(200).send({
      message: `Form Submitted Successfully. Your Reference Number is ${uniqueNum} `,
      data: formData,
    });
  } catch (err) {
    console.log("Form Error..", err);
    res.status(500).send({ message: "Error submitting form" });
  }
});

export const apiRouter = router;
