const express = require("express");

const app = express();
const port = 5000;
app.get("/", (req, res) => {
  res.send("API Running!");
});
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
