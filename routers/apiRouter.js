import express from "express";
import { postRegisterView } from "../controller/videoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.get(routes.registerView, postRegisterView);

export default apiRouter;
