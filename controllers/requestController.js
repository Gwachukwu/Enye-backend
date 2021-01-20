const axios = require("axios");

exports.requestRates = async (req, res, next) => {
  const { base, currency } = req.query;
  if (!base || !currency) {
    return res.status(400).json({
      status: 400,
      message: "Please provide the base and currency parameters",
    });
  }
  try {
    const exchangeRates = await axios.get(
      `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`
    );
    if (exchangeRates) {
      return res.status(200).json({
        results: exchangeRates.data,
      });
    } else {
      return res.status(500).json({
        status: 500,
        results: "something went wrong, please try again later",
      });
    }
  } catch (error) {
    next(error);
  }
};
