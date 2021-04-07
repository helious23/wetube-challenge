import express from "express";
import {
  changePassword,
  getEditProfile,
  postEditProfile,
  userDetail,
} from "../controller/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail); // User Detail 이 맨 아래에 와야됨, id 값을 받아서 route 에 적용: function

export default userRouter;
