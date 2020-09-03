var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");

var app = express();

app.engine("html", require("express-art-template"));
app.use("/public", express.static("public"));
app.use("/node_modules", express.static("node_modules"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var stuRouter = require("./routes/stu");
app.use("/stu", stuRouter);
var registerRouter = require("./routes/register");
app.use("/register", registerRouter);
var loginRouter = require("./routes/login");
app.use("/login", loginRouter);

app.listen(8088, function() {
  console.log("启动成功，访问：http://localhost:8088");
});
