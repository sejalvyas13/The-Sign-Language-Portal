const usersRoutes = require('./users');
const signsRoutes = require('./signs');
const contributionsRoutes = require('./contributions');
const progressRoutes = require('./progress');
const dashboardRoutes = require('./dashboard');
const translateRoutes = require('./translate');
const learningRoutes = require('./learning');
const quizRoutes = require('./quiz');



const constructorMethod = (app) => {
  app.use('/users', usersRoutes);
  app.use('/signs', signsRoutes);
  app.use('/contributions', contributionsRoutes);
  app.use('/progress', progressRoutes);
  app.use('/dashboard',dashboardRoutes);
  app.use('/translate',translateRoutes);
  app.use('/learning',learningRoutes);
  app.use('/quiz',quizRoutes);


  app.get("/", (req, res) => {
    /** should re-direct to login screen */
  });

  // app.get("/pendingContributions", (req, res) => {
  //   res.render("contributions/pendingContri", { hasError: false, error: "", title:'Title'});
  // });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Error code 404: Page not found!" });
  });
};

module.exports = constructorMethod;
