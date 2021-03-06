import http, { ServerOptions, Server } from "http";
import fs from "fs";
import app from "../app";
import webSocket from "../socket";
import verifyToken from "../middleware/VerifyToken";

const port = app.get("port");

const server: Server = http.createServer(app).listen(port, () => {
  console.log("Server on ", app.get("port"));
});

webSocket(server, app, verifyToken);