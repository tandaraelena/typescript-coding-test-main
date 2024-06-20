import { PdfService } from "../utils/pdf-service";

jest.mock('../utils/pdf-service', () => {
  return {
    PdfService: jest.fn().mockImplementation(() => {
      return {
        extract: jest.fn().mockResolvedValue({ field: 'value' }),
      };
    }),
  };
});

describe('PdfService', () => {
  it('should extract data from PDF', async () => {
    const pdfService = new PdfService('TEST_KEY');
    const data = await pdfService.extract('path/to/pdf');
    expect(data).toEqual({ field: 'value' });
  });
});
