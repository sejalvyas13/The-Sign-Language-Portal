const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + "/public");
// const api = require('./quickstart');
const seed = require('./seed');

const configRoutes = require("./routes");

const exphbs = require("express-handlebars");

const Handlebars = require('handlebars');

Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});
Handlebars.registerHelper('notEqual', function(lvalue, rvalue, options) {
  if (arguments.length < 3)
      throw new Error("Handlebars Helper equal needs 2 parameters");
  if( lvalue==rvalue ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});
Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
  if (arguments.length < 3)
      throw new Error("Handlebars Helper equal needs 2 parameters");
  if( lvalue!=rvalue ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);


async function main(){
  try{
    // TODO: uncomment to run seed
    await seed.runSetup();
  }
  catch(e){
    console.log({"message" : e});
  }

}
main().catch(e => {
  console.log(e);
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
