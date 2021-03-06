import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CokieStore = MongoStore(session);

app.use(helmet({ contentSecurityPolicy: false })); // Security
app.set("view engine", "pug"); // view engine Pug
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static"))); // /static 으로 접속시, static 폴더로 연결
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // bodyparser -> express 내장 기능으로 변경
app.use(morgan("dev")); // logger
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }), // session 정보를 mongodb에 저장
  })
);
app.use(flash()); // flash message middleware
app.use(passport.initialize()); // passport initialize -> find the user by cookies
app.use(passport.session()); // save cookies to session

app.use(localsMiddleware); // 변수를 local 에 저장하여 global 하게 사용할 수 있게 함

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter); // API router

export default app;
