import PDFDocument from "pdfkit";
import express from "express";
import axios from "axios";

const router = express.Router();





router.post("/convert-to-pdf", async (req, res) => {
    try {
        const { imageUrls } = req.body
       
        if (!imageUrls || imageUrls.length === 0) {
            return res.status(400).json({ error: "No image URLs provided" });
        }

        const doc = new PDFDocument();
        const buffers = [];

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=converted.pdf",
        });

        doc.on("data", (chunk) => buffers.push(chunk));
        doc.on("end", () => {
            res.end(Buffer.concat(buffers));
        });

       
        // Add images to PDF
        for (let i = 0; i < imageUrls.length; i++) {
            const response = await axios.get(imageUrls[i], { responseType: "arraybuffer" });
            doc.image(response.data, { fit: [500, 700] });

            // Add a new page only if this is NOT the last image
            if (i < imageUrls.length - 1) {
                doc.addPage();
            }
        }


        doc.end();
    } catch (error) {
        console.error("PDF Conversion Error:", error);
        res.status(500).json({ error: "Failed to convert images to PDF" });
    }
});


export { router as psdRouter };
