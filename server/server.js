const express = require("express");
const connectToDB = require("./config/db");
const cors = require("cors");

const app = express();

connectToDB();

const port = process.env.port || 5000;
app.get("/", (req, res) => {
  res.send("API Running!");
});

// const corsOptions = {
//   origin: "https://devnest-client.onrender.com", // Replace with your frontend URL
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // Enable credentials (cookies, authorization headers, etc.)
// };

// app.use(cors(corsOptions));

app.use(cors());

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
