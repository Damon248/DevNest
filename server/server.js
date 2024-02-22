const express = require("express");
const connectToDB = require("./config/db");

const app = express();

connectToDB();

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("API Running!");
});

// initialising middleware
app.use(express.json({ extended: false }));

// Defining routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
