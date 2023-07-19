const pageRoute = require("./page");

const constructorMethod = (app) => {
  app.use("/", pageRoute);

  app.use("*", (_, res) => {
    res.status(404).json({ error: "Not Found" });
  });
};

module.exports = constructorMethod;
