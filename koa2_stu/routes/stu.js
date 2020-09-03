const router = require("koa-router")();
const stuModle = require("../models/stuDao");
const moment = require("moment");

router.prefix("/stu");

router.get("/", async function(ctx, next) {
  var data = await stuModle.mysql("select * from stu");
  await ctx.render("student.html", {
    msgs: data
  });
});

router.get("/add", function(ctx, next) {
  ctx.render("new.html");
});

router.get("/doAdd", async function(ctx, next) {
  var getData = ctx.query;
  console.log(getData);

  var gender = "";
  if (getData.gender == "1") {
    gender = "女";
  } else {
    gender = "男";
  }
  var date = moment().format("YYYY-MM-DD hh:mm:ss");

  var data = await stuModle.mysql(
    `insert into stu values(null,'${getData.name}','` +
      gender +
      `',${getData.age},'${getData.hobbies}','` +
      date +
      `');`
  );
  ctx.response.redirect("/stu");
});

module.exports = router;
