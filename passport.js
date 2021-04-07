import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import KakaoStrategy from "passport-kakao";
import {
  facebookLoginCallback,
  githubLoginCallback,
  kakaoLoginCallback,
} from "./controller/userController";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy()); // create 'local' strategy

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://84ed071331e4.ngrok.io${routes.facebookCallback}`,
      // domain 변경시 수정해야됨!!
      // https://developers.facebook.com/apps/859347751316051/fb-login/settings/ callback URL 및 site URL 도 같이 수정!!
      profileFields: ["id", "displayName", "email"],
      scope: ["public_profile", "email"],
    },
    facebookLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      callbackURL: `http://localhost:4000${routes.kakaoCallback}`,
    },
    kakaoLoginCallback
  )
);

passport.serializeUser((user, done) => done(null, user)); // cookie 에 주는 정보 : user.id 로 제한 (pasport-local-mongoose 기능)
passport.deserializeUser((user, done) => done(null, user)); // 위에서 받은 정보로 User 를 찾음
