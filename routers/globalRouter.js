import express from "express";
import passport from "passport";
import {
  getJoin,
  getLogin,
  githubLogin,
  logout,
  getMe,
  postGithuLogin,
  postJoin,
  postLogin,
  facebookLogin,
  postFacebookLogin,
  kakaoLogin,
  postKakaoLogin,
} from "../controller/userController";
import { home, search } from "../controller/videoController";
import { onlyPrivate, onlyPublic } from "../middlewares";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); // postJoin 의 data를 postLogin 으로 넘겨줌 (email & password)

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

// github router

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithuLogin
);

// facebook router

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  postFacebookLogin
);

// kakao router

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: "/login" }),
  postKakaoLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
