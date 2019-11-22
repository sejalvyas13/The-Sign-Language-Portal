const usersRoutes = require('./users');
const signsRoutes = require('./signs');
const contributionsRoutes = require('./contributions');
const progressRoutes = require('./progress');

const constructorMethod = (app) => {
  app.use('/users', usersRoutes);
  app.use('/signs', signsRoutes);
  app.use('/contributions', contributionsRoutes);
  app.use('/progress', progressRoutes);

  app.get("/", (req, res) => {
    res.render("contributions/form", { hasError: false, error: "", title:'Title'});
  });

  // app.get("/pendingContributions", (req, res) => {
  //   res.render("contributions/pendingContri", { hasError: false, error: "", title:'Title'});
  // });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Error code 404: Page not found!" });
  });
};

module.exports = constructorMethod;
