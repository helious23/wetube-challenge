import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile"); // HTML(upload.pug) 에서 input 으로 받는 file 항목의 name
