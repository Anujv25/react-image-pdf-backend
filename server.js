import express from "express";
import {psdRouter} from "./routes/pdfRoutes.js";
import cors from 'cors'
const app = express();
const port = 3000;
// const cors = require("cors")
app.use(cors());
app.use("/api", psdRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
