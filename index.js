const express = require("express");
const app = express();
const requestRoutes = require('./routes/requestRoutes');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/rates',requestRoutes);

//error handlers
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Enye Backend Challenge",
      endpoint: "api/rates?base=the base currency&currency=the currencies you want separated by commas",
    });
  });

if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server started on ${PORT}`);
});
