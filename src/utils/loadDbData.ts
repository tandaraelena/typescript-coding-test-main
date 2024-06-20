import { createReadStream } from "fs";
import { CompanyPDFData } from "./pdf-service";
import csv from "csv-parser";

// Load database data and store it in memory
export const loadDbData = () => {
  let databaseData: Array<CompanyPDFData> = [];

  createReadStream("data/database.csv")
    .pipe(csv())
    .on("data", (row) => {
      databaseData.push(row);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });

  return databaseData;
};