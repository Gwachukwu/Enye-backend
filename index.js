const express = require("express");

const app = express();
const requestRoutes = require("./routes/requestRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/rates", requestRoutes);

// error handlers
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
