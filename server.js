const express = require("express")
const app = express();
const logger = require("morgan");
const cors = require("cors");
const errorHandler = require("errorhandler");
const authRouter = require("./routes/authRouter");
const wodRouter = require("./routes/wodRouter");


// middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/auth/facebook", authRouter);
app.use("/wods", wodRouter);

const PORT = process.env.PORT || 4000;

app.use(errorHandler());

// Run the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
