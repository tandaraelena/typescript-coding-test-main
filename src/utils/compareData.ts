import { CompanyPDFData } from "./pdf-service";

// Function to compare extracted data with database data
export const compareData: (
  clientData: CompanyPDFData,
  dbData: CompanyPDFData
) => Array<CompanyPDFData> = (clientData, dbData) => {
  const diff: Array<CompanyPDFData> = [];

  // Create a list of keys and remove the duplicated ones
  const keys = new Set([
    ...Object.keys(clientData),
    ...Object.keys(dbData),
  ]);

  // Map the list of keys and compare the values from db with the values
  // from extracted company
  keys.forEach((key: string) => {
    // If the values are different, add them to the list of differences
    if (`${clientData[key]}` !== `${dbData[key]}`) {
      diff.push({
        key,
        clientHas: clientData[key],
        companyHas: dbData[key],
      });
    }
  });

  return diff;
};


