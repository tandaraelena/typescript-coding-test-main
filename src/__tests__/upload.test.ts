import request from 'supertest';
import app from '../../src/index'; 

describe('POST /upload', () => {
  it('should return an error if no file is uploaded', async () => {
    const response = await request(app).post('/upload').field('companyName', 'FinanceLLC');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'No file uploaded');
  });
});
