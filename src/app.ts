import express, { Request, Response, NextFunction} from "express";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import * as dotenv from "dotenv";
import cors from "cors";

import { db } from "./models";
import ComonRouter from "./routes";
import { request } from "http";

const app: express.Application = express();

dotenv.config({ path: path.join(__dirname, "../.env")});

app.set("port", process.env.PORT || "3000");
app.set("view engine", "html");

db.sequelize.sync({ force: false })
.then(() => console.log("Database connection successful"))
.catch(console.error);  

app.use(morgan("combined"));
app.use("/", express.static(path.join(__dirname, "../uploads")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.COOKIE_SECRET!,
  resave: false,
  saveUninitialized: false
}));  
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/", ComonRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).end();
});

export default app;