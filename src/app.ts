import express, { Request, Response, NextFunction} from "express";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import * as dotenv from "dotenv";
import cors from "cors";

const app: express.Application = express();

dotenv.config({ path: path.join(__dirname, "../.env")});

app.set("port", process.env.PORT || "3000");
app.set("view engine", "html");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.COOKIE_SECRET!,
  resave: false,
  saveUninitialized: false
}));  

app.use(cors());

app.get("/", (req, res, next) =>{
  res.send("hello");
});

export default app;