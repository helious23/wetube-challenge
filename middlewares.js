import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = req.user || {}; // passport 에서 받은 user data 를 req 에 담아줌. 없으면 {}
  next();
};

export const uploadVideo = multerVideo.single("videoFile"); // HTML(upload.pug) 에서 input 으로 받는 file 항목의 name
