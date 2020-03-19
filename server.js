const express = require("express")
const app = express();
const logger = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/authRouter");

// middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/auth/facebook", authRouter);

const PORT = process.env.PORT || 4000;

// Run the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
