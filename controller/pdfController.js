import  PDFDocument from "pdfkit";

const convertImagesToPDF = (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No images uploaded" });
    }

    const doc = new PDFDocument();
    
    // Set response headers
    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=converted.pdf",
    });

    doc.pipe(res); // Stream PDF to response

    // Add first image to the default page
    doc.image(req.files[0].buffer, {
        fit: [500, 700],
        align: "center",
        valign: "center",
    });

    // Add remaining images on new pages
    req.files.slice(1).forEach((file) => {
        doc.addPage().image(file.buffer, {
            fit: [500, 700],
            align: "center",
            valign: "center",
        });
    });

    doc.end(); // Close the document stream
};

export { convertImagesToPDF };
