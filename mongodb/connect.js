let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ele", {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "数据库连接失败"));
db.once("open", () => {
	console.log("数据库连接成功");
});


mongoose.set('useFindAndModify', false);
