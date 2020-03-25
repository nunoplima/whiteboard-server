const express = require("express");
const http = require("http");
const logger = require("morgan");
const cors = require("cors");
const errorHandler = require("errorhandler");
const authRouter = require("./routes/authRouter");
const wodRouter = require("./routes/wodRouter");
const resultRouter = require("./routes/resultRouter");
// socketio
const socketio = require("./services/socketio");

const PORT = process.env.PORT || 4000;

const app = express();

// middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/auth/facebook", authRouter);
// app.use("/wods/:wodId/result", resultRouter);
app.use("/wods", wodRouter);
app.use("/leaderboard", resultRouter);

app.use(errorHandler());

const server = http.Server(app);

socketio.attach(server);

// Run the server
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
