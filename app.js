const express = require("express");
const app = express();
const PORT = 3300;
require("./helpers/dbCon");

const noteRoutes = require("./routes/noteRoutes");

//Common middleware
app.use(express.json());

//basic route
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// Base route for notes
app.use("/api/notes", noteRoutes);

//route for wrong url
app.use((req, res) => {
  res.status(404).json({ error: { message: "Not Found" } });
});

//Bind and Listen the connection
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
