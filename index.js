const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:0000@cluster0.sat0yt9.mongodb.net/my_api"
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}/    🔥`)
  );
});

mongoose.connection.on("error", (error) => {
  console.log("Mongoose connection error: ".error);
});

app.get("/", (req, res) => {
  res.send("testing...");
});

app.use("/products", require("./routes/productsRoute"));
app.use("/categories", require("./routes/categoriesRoutes"));
