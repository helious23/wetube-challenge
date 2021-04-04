import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

import "./passport";

const app = express();

app.use(helmet({ contentSecurityPolicy: false })); // Security
app.set("view engine", "pug"); // view engine Pug
app.use("/uploads", express.static("uploads")); // upload router 로 접속시, upload 폴더에서 file 을 찾을 수 있게 함
app.use("/static", express.static("static")); // /static 으로 접속시, static 폴더로 연결
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // bodyparser -> express 내장 기능으로 변경
app.use(morgan("dev")); // logger
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize()); // passport initialize -> find the cookies
app.use(passport.session()); //

app.use(localsMiddleware); // 변수를 local 에 저장하여 global 하게 사용할 수 있게 함

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
