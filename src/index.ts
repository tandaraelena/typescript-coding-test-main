import express from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import { CompanyPDFData, PdfService } from "./pdf-service";
import fs from "fs";
import path from "path";
import cors from "cors";
import { compareData, loadDbData } from "./util";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS with wildcard
app.use(cors({ origin: "*" }));

// Use express-fileupload middleware
app.use(fileUpload());

// Send response for when localhost is accesed
app.get("/", (req, res) => {
  return res.send("Pdf uploader");
});

const dbData = loadDbData();

app.post("/upload", async (req, res) => {
  const companyName: string = req.body.companyName;
  const pdfFile = req.files?.pdf as UploadedFile;

  if (!pdfFile) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  if (!companyName) {
    return res.status(400).json({ error: "companyName is required" });
  }

  // Filter the database data for the specified company
  const companyData: CompanyPDFData | undefined = dbData.find(
    (row: CompanyPDFData) => row["Company Name"] === companyName
  );

  if (!companyData) {
    return res.status(400).json({ error: "invalid companyName" });
  }

    // Build the 'pdfPath' without src/ folder
    const dirNameWithoutSrc = __dirname.replace(/src/g, "");
    const pdfPath = path.join(dirNameWithoutSrc, "assets", pdfFile.name);
  
    // Ensure the assests directory exists
    const uploadsDir = path.join(dirNameWithoutSrc, "assets");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

  try {
    // Save the uploaded file
    pdfFile.mv(pdfPath, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: `Failed to save uploaded file: ${err}` });
      }

      // Initialize the PdfService
      const pdfService = new PdfService("TEST_KEY");

      // Extract data from the PDF
      const extractedData: CompanyPDFData = await pdfService.extract(
        `assets/${pdfFile.name}`
      );

      if (!extractedData) {
        return res
          .status(404)
          .json({ error: "Cannot extract data. Invalid file provided." });
      }

      // Throw error if the company doesn't exist in db
      if (companyData.length === 0) {
        return res
          .status(404)
          .json({ error: `Company data not found for: ${companyName}` });
      }

      // Compare the extracted data with the company data
      const differences = compareData(extractedData, companyData);

      // Clean up the uploaded file
      fs.unlink(pdfPath, (err) => {
        if (err) {
          console.error("Failed to delete uploaded file:", err);
        }
      });

      // Return the summary of differences
      res.json({ differences });
    });
  } catch (error) {
    res.status(500).json({ error: (error as { message: string }).message });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
