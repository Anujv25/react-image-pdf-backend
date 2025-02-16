import { Router } from "express";
import { cloudinary } from "../config/cloudinary.js";
import multer from "multer";
import axios from "axios";
const router = Router();
// Multer storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
});

// Upload images to Cloudinary
router.post("/upload", upload.array("images"), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        // Upload each image to Cloudinary
        const uploadPromises = req.files.map(async (file) => {
            const base64Image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
            const result = await cloudinary.uploader.upload(base64Image, {
                folder: "uploads",
                resource_type: "image",
            });
            return result.secure_url; // Store Cloudinary URL
        });

        // Wait for all uploads to complete
        const imageUrls = await Promise.all(uploadPromises)
        // console.log("IMAGE----------------->", imageUrls)

        // Call Convert-to-PDF API with image URLs
        const pdfResponse = await axios.post("https://react-image-pdf-backend.vercel.app/api/convert-to-pdf",
             {imageUrls},{ headers: { "Content-Type": "application/json" }, responseType: "arraybuffer" });

        console.log("PDF Response:", pdfResponse);

        // Send the PDF as a response
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=converted.pdf",
        });
        res.end(pdfResponse.data);

    } catch (error) {
        console.error("Upload & Convert Error:", error);
        res.status(500).json({ error: "Failed to process images" });
    }
});
router.get("/", (req, res) => {
    res.send("Upload Route");
})


export { router as uploadRouter };
