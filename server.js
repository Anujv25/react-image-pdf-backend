import express from "express";
import {psdRouter} from "./routes/pdfRoutes.js";
import {uploadRouter} from "./routes/upload.js";
import cors from 'cors'
const app = express();
const port = 3000;
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

app.use(cors());
app.use("/api", psdRouter);
app.use("/api", uploadRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
