const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Hardcoded login (matches front-end)
const USER = {
  username: "us",
  password: "ss"
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    res.sendFile(path.join(__dirname, 'quiz.html'));
  } else {
    res.send('Invalid credentials. Please go back and try again.');
  }
});

app.post('/submit', (req, res) => {
  const data = req.body;
  let prediction = "No Heart Disease";

  if (
    parseInt(data.age) > 50 &&
    parseInt(data.chol) > 240 &&
    data.High_BP === "yes" &&
    data.Chest_Pain === "yes"
  ) {
    prediction = "Heart Disease Detected";
  }

  res.redirect(`/thankyou.html?result=${encodeURIComponent(prediction)}&data=${encodeURIComponent(JSON.stringify(data))}`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
