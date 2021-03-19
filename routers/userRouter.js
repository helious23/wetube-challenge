import express from "express";
import {
  changePassword,
  editProfile,
  userDetail,
  users,
} from "../controller/userController";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail); // User Detail 이 맨 아래에 와야됨

export default userRouter;
