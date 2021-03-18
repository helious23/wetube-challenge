import express from "express";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.users, (req, res) => res.send("Users"));
userRouter.get(routes.editProfile, (req, res) => res.send("Edit Profile"));
userRouter.get(routes.changePassword, (req, res) =>
  res.send("Change Password")
);
userRouter.get(routes.userDetail, (req, res) => res.send("User Detail")); // User Detail 이 맨 아래에 와야됨

export default userRouter;
