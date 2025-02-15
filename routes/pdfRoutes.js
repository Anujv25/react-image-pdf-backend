import { Router } from "express";
import multer, { memoryStorage } from "multer";
import { convertImagesToPDF } from "../controller/pdfController.js";

const router = Router();

app.use(express.json({ limit: "50mb" }));  // JSON payloads
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Form data

// Multer storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
});


router.post("/convert-to-pdf", upload.array("images", 10), convertImagesToPDF);
router.get("/", (req, res) => {
    res.send("Welcome to PDF Converter API");
})

export {router as psdRouter};
