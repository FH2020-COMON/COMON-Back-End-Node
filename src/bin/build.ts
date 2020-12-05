import https, { ServerOptions, Server } from "https";
import fs from "fs";
import app from "../app";
import webSocket from "../socket";
import verifyToken from "../middleware/VerifyToken";

const port = app.get("port");

const option: ServerOptions = {
  key: fs.readFileSync("./private.pem"),
  cert: fs.readFileSync("./public.pem"),
}

const server: Server = https.createServer(option, app).listen(port, () => {
  console.log("Server on ", app.get("port"));
});

webSocket(server, app, verifyToken);