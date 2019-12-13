const usersRoutes = require('./users');
const signsRoutes = require('./signs');
const contributionsRoutes = require('./contributions');
const progressRoutes = require('./progress');
const dashboardRoutes = require('./dashboard');
const translateRoutes = require('./translate');
const learningRoutes = require('./learning');
const quizRoutes = require('./quiz');
const signupRoutes = require('./signup');
const loginRoutes = require('./login');

const session = require('express-session');


const constructorMethod = (app) => {
  // const app = express();
  // Middleware:
  app.use(session({
    name: 'AuthCookie',
    secret: 'my auth cookie',
    resave: false,
    saveUninitialized: true
  }));

  app.use('/users', usersRoutes);
  app.use('/signs', signsRoutes);
  app.use('/contributions', contributionsRoutes);
  app.use('/progress', progressRoutes);
  app.use('/dashboard', dashboardRoutes);
  app.use('/translate', translateRoutes);
  app.use('/learning', learningRoutes);
  app.use('/quiz', quizRoutes);
  app.use('/signup', signupRoutes);
  app.use('/login', loginRoutes);


  app.get("/", (req, res) => {
    /** should re-direct to login screen */
    res.redirect("/login");
  });

  // app.get("/pendingContributions", (req, res) => {
  //   res.render("contributions/pendingContri", { hasError: false, error: "", title:'Title'});
  // });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Error code 404: Page not found!" });
  });
};

module.exports = constructorMethod;
