// import modules
const path = require("path");
const express = require("express"); // handlebars import syntax
const exphbs = require("express-handlebars");
const routes = require("./controllers"); // import routes
const sequelize = require("./config/connection.js"); // import sequelize instance

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

app.engine("handlebars", hbs.engine); // given template registers as handlebars
app.set("view engine", "handlebars");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ exended: true }));
app.use(express.static(path.join(__dirname, "public"))); //static files will be in the public folder, this joins the root path with it

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
