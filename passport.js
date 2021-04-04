import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); // cookie 에 주는 정보 : user.id 로 제한 (pasport-local-mongoose 기능)
passport.deserializeUser(User.deserializeUser()); // 위에서 받은 정보로 User 를 찾음
