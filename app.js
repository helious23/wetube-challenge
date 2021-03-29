import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.use(helmet({ contentSecurityPolicy: false })); // Security
app.set("view engine", "pug"); // view engine Pug
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // bodyparser -> express 내장 기능으로 변경
app.use(morgan("dev")); // logger
app.use(localsMiddleware); // 변수를 local 에 저장하여 global 하게 사용할 수 있게 함

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
