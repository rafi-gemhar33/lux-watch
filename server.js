import express from "express";
import colors from "colors";
import dotenv from "dotenv";


dotenv.config();
const app = express();


app.get("/", (req, res) => {
  res.send("<h1>Welcome to Lux Watch app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});