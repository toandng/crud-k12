require("module-alias/register");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const router = require("./src/routes/api");
const adminRouter = require("./src/routes/admin");

const notFoudHandler = require("./src/middlewares/notFoundHandler");
const errorHandler = require("./src/middlewares/errorHandler");
const handleSidebar = require("@/middlewares/admin/handleSidebar");
// const handleSession = require("@/middlewares/admin/handleSession");
const Session = require("@/middlewares/admin/session");
const shareLocals = require("@/middlewares/admin/shareLocals");
const checkAuth = require("@/middlewares/admin/checkAuth");

const app = express();

app.use(cors());
app.use(express.json());

app.use(cookieParser());

// cau hình router đến public
app.use(express.static("public"));
app.use(express.urlencoded());

//  view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(expressLayouts);
app.set("layout", "admin/layouts/default");

// Hỗ trợ từ query hoặc input hidden
app.use(methodOverride("_method"));

app.use("/api/v1", router);
app.use("/admin", Session, shareLocals, checkAuth, handleSidebar);

app.use("/admin", adminRouter);

app.use(notFoudHandler);
app.use(errorHandler);

app.listen(3001, () => {
  console.log("App running on port 3001");
});
