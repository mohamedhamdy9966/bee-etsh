require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { type } = require('os');
const nodemailer = require('nodemailer');



const app = express();
const port = process.env.PORT || 4000;

const blacklistedTokens = [];

const allowedOrigins = [
  'https://pharmaca.vercel.app',
  'https://pharmaca-admin.vercel.app'
];

app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Define the Question schema
const questionSchema = new mongoose.Schema({
  id: {type: Number, required: true,},
  question: { type: String, required: true },  // The question text
  image: { type: String },  // Optional URL or path to an image associated with the question
  explanation: { type: String },  // Required explanation for the question
  category: { type: String},
  date: { type: Date, default: Date.now},
  answers: [
    {
      text: { type: String, required: true },  // The answer text
      correct: { type: Boolean, required: true }  // Indicates if the answer is correct
    }
  ]
});

// Define the Question model
const Question = mongoose.model("Question", questionSchema);

// Endpoint to add a question
app.post('/addquestion', async (req, res) => {
  try {
    let questions = await Question.find({}).sort({ id: 1 });
    let id;

    if (questions.length > 0) {
      let last_question = questions[questions.length - 1];
      id = Number.isInteger(last_question.id) ? last_question.id + 1 : 1;
    } else {
      id = 1;  // Set id to 1 if no questions exist in the database
    }

    const question = new Question({
      id: id,
      question: req.body.question,
      image: req.body.image,
      explanation: req.body.explanation,
      category: req.body.category,
      answers: req.body.answers
    });

    console.log(question);
    await question.save();

    res.json({
      success: true,
      message: "Question added successfully",
      question: question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add question",
      error: error.message
    });
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // This allows connections to servers with self-signed certificates
  }
});

const testEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'mh7008006@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email sent from Node.js server.'
    });

    console.log('Test email sent:', info.response);
  } catch (error) {
    console.error('Error sending test email:', error);
  }
};

testEmail();

app.post('/sendmail', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'mh7008006@gmail.com',
    subject: `Message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Message sent successfully!');
  });
});

// endpoint to get all questions
app.get('/allquestions', async (req,res)=>{
  try {
    const questions = await Question.find(); // Fetch all questions from MongoDB
    res.json(questions);
  } catch (error) {
    res.status(500).json({ errors: "Failed to fetch questions" });
  }
});


// Middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ errors: "Use valid token" });
  }

  if (blacklistedTokens.includes(token)) {
    return res.status(401).send({ errors: "Invalid token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Session expired or invalid token. Please log in again." });
  }
};

// Database connection with MongoDB
mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
  console.log("MongoDB connected");
}).catch((error) => {
  console.log("MongoDB connection error:", error);
});

// Image Upload Configurations
const storage = multer.diskStorage({
  destination: './upload/Images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Endpoint for serving images
app.use('/Images', express.static('upload/Images'));

// Image upload endpoint
app.post("/upload", upload.single('image'), (req, res) => {
  res.json({
    success: 1,
    image_url: `https://pharmaca-production.up.railway.app:${port}/Images/${req.file.filename}`
  });
});

// Define the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date:{type:Date,
    default:Date.now,
  }
});

const Users = mongoose.model("Users", userSchema);

// Endpoint for user signup
app.post('/signup', async (req, res) => {
  try {
    let checkEmail = await Users.findOne({ email: req.body.email });
    let checkUserName = await Users.findOne({ username: req.body.username });
    if (checkEmail) {
      return res.status(400).json({ success: false, errors: "Exisiting User With The Same Email Already In Use" });
    }
    if (checkUserName) {
      return res.status(400).json({ success: false, errors: "Exisiting User With The Same Username , Please Change Your Username" });
    }
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new Users({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();

    const data = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, errors: "Server error" });
  }
});

// Endpoint for user login
app.post('/login', async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ success: false, errors: "Invalid email" });
    }

    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (!passCompare) {
      return res.status(400).json({ success: false, errors: "Invalid password" });
    }

    const data = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, errors: "Server error" });
  }
});

// Start the server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.log("Error: " + error);
  }
});

app.get('/protected-route', fetchUser, (req, res) => {
  res.json({ success: true, message: "Access granted to protected resource" });
});

app.post('/logout', fetchUser, (req, res) => {
  const token = req.header('auth-token');
  blacklistedTokens.push(token);
  res.send({ success: true, message: "Logged out successfully" });
});

// Endpoint for deleting a question
app.post('/removequestion', async (req, res) => {
  try {
    const removedQuestion = await Question.findOneAndDelete({ id: req.body.id });
    
    if (!removedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      });
    }

    console.log("Question removed", removedQuestion);
    res.json({
      success: true,
      message: "Question removed successfully",
      questionId: removedQuestion.id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove question",
      error: error.message
    });
  }
});
