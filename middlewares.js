import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "healty-pharm-tube/video",
  }),
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "healty-pharm-tube/avatar",
  }),
});

export const uploadVideo = multerVideo.single("videoFile"); // HTML(upload.pug) 에서 input 으로 받는 file 항목의 name
export const uploadAvatar = multerAvatar.single("avatar"); // editProfile.pug 에서 input 으로 받는 file 항목의 name

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null; // passport 에서 받은 user data 를 req 에 담아줌. 없으면 null
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home); // req.user 있을 경우 -> 로그인 한 경우
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home); // req.user 없을 경우 ->  로그아웃 한 경우
  }
};
