import passport from "passport";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controller/userController";
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

passport.serializeUser((user, done) => done(null, user)); // cookie 에 주는 정보 : user.id 로 제한 (pasport-local-mongoose 기능)
passport.deserializeUser((user, done) => done(null, user)); // 위에서 받은 정보로 User 를 찾음
