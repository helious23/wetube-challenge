import express from "express";
import {
  postAddComment,
  postDeletePost,
  postRegisterView,
} from "../controller/videoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, postDeletePost);

export default apiRouter;
