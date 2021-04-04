import express from "express";
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin,
} from "../controller/userController";
import { home, search } from "../controller/videoController";
import { onlyPublic } from "../middlewares";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); // postJoin 의 data를 postLogin 으로 넘겨줌

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

export default globalRouter;
