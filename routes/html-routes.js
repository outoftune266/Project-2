var path = require("path");

module.exports = function(app) {


  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/form", function(req, res) {
    res.render("formpage")
  });

  // app.get("/blog", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });

  // app.get("/authors", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  // });

};