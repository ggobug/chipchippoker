require("dotenv").config(
  !!process.env.CONFIG ? { path: process.env.CONFIG } : {}
);
var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var OpenVidu = require("openvidu-node-client").OpenVidu;
var cors = require("cors");
var app = express();

// Environment variable: PORT where the node server is listening
var SERVER_PORT = 8500;
// Environment variable: URL where our OpenVidu server is listening
var OPENVIDU_URL = "https://chipchippoker.shop";
// Environment variable: secret shared with our OpenVidu server
var OPENVIDU_SECRET = "CCP_VIDU";

// Enable CORS support
app.use(
  cors({
    origin: "*",
  })
);

var server = http.createServer(app);
var openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);

// Allow application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Allow application/json
app.use(bodyParser.json());

// Serve static resources if available
app.use(express.static(__dirname + "/public"));

// Serve application
server.listen(SERVER_PORT, () => {
  console.log("Application started on port: ", SERVER_PORT);
  console.warn("Application server connecting to OpenVidu at " + OPENVIDU_URL);
});

app.get("/signal-server/test", async (req, res) => {
  res.send("hi");
});

app.post("/signal-server/sessions", async (req, res) => {
  var session = await openvidu.createSession(req.body);
  res.setHeader('Access-Control-Allow-origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.send(session.sessionId);
});

app.post("/signal-server/sessions/:sessionId/connections", async (req, res) => {
  res.setHeader('Access-Control-Allow-origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  var session = openvidu.activeSessions.find(
    (s) => s.sessionId === req.params.sessionId
  );
  if (!session) {
    res.status(404).send();
  } else {
    var connection = await session.createConnection(req.body);
    res.send(connection.token);
  }
});

process.on("uncaughtException", (err) => console.error(err));
