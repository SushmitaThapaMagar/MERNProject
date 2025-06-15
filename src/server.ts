import express from "express";
const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
  });
});

app.listen(PORT, () => {
  console.log(`Server is sunning at http://localhost:${PORT}`);
});
