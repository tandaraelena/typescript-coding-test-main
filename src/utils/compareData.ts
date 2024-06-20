import { CompanyPDFData } from "./pdf-service";

// Function to compare extracted data with database data
export const compareData: (
  extractedData: CompanyPDFData,
  databaseData: CompanyPDFData
) => Array<CompanyPDFData> = (extractedData, databaseData) => {
  const diff: Array<CompanyPDFData> = [];

  // Create a list of keys and remove the duplicated ones
  const keys = new Set([
    ...Object.keys(extractedData),
    ...Object.keys(databaseData),
  ]);

  // Map the list of keys and compare the values from db with the values
  // from extracted company
  keys.forEach((key: string) => {
    // If the values are different, add them to the list of differences
    if (`${extractedData[key]}` !== `${databaseData[key]}`) {
      diff.push({
        key,
        companyHas: extractedData[key],
        clientHas: databaseData[key],
      });
    }
  });

  return diff;
};


