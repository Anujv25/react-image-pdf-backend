import { Router } from "express";
import multer, { memoryStorage } from "multer";
import { convertImagesToPDF } from "../controller/pdfController.js";

const router = Router();
const upload = multer({ storage: memoryStorage() });

router.post("/convert-to-pdf", upload.array("images", 10), convertImagesToPDF);
router.get("/", (req, res) => {
    res.send("Welcome to PDF Converter API");
})

export {router as psdRouter};
