import express, { Request, Response, NextFunction} from "express";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import * as dotenv from "dotenv";

const app: express.Application = express();

dotenv.config({ path: path.join(__dirname, "../.env")});

app.set("port", "8005");
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

app.use((req: Request, res: Response, next: NextFunction) => {
  res.end();
});

const server = app.listen(app.get("port"), () => {
  console.log("server on ", app.get("port"));
});