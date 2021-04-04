import express from "express";
import {
  changePassword,
  editProfile,
  userDetail,
  users,
} from "../controller/userController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail); // User Detail 이 맨 아래에 와야됨, id 값을 받아서 route 에 적용: function

export default userRouter;
