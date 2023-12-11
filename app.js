const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// METHOD POST request
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));

// METHOD DELETE request
app.use(require("./routes/delete"));

//METHOD PATCH request
app.use(require("./routes/update"));

//METHOD GET request
app.use(require("./routes/users"));

app.get("/", (req, res) => {
  res.send("Response successful");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is up and listening on http://localhost:${PORT}`);
});
