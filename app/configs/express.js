const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const methodOverride = require("method-override");

const footballRoute = require("../routes/football_route");
const teamRoute = require("../routes/team_route");
const iscontainletterRoute = require("../routes/iscontain_letter_route");

exports.start = (config) => {
  const app = express();

  app.use(cors());

  // lets you use HTTP verbs such as PUT or DELETE
  // in places where the client doesn't support it
  app.use(methodOverride());

  // parse body params and attache them to req.body
  app.use(bodyParser.json({ limit: "50mb" }));

  // support parsing of application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get(`/`, function (req, res) {
    res.status(200).json({
      status_code: 200,
      success: false,
      message: "berhasil masuk",
    });
  });

  app.use("/football", footballRoute);
  app.use("/team", teamRoute);
  app.use("/is-contain-letters", iscontainletterRoute);

  try {
    app.listen(config.port, () => {
      console.log(`Server start on port ${config.port}`);
    });
  } catch (error) {
    console.log("Error start server:", error);
  }
};
