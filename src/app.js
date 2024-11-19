import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import userRouter from "./routers/userRouter.js";
import viewRouter from "./routers/viewRouter.js";

const __dirname = path.resolve();

import './config/database.js';
import GlobalError from "./utils/GlobalError.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.static(path.join(__dirname, "public")));




app.use("/api/v1/users", userRouter);
app.use("/", viewRouter);


app.all("*", (req, res, next) => {
    return next(new GlobalError(404, `Can't find ${req.originalUrl} on this server!`));
})


app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
})





const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

