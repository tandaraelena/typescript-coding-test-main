# PDF Uploader

This application allows users to upload a PDF file and a company name, extracts data from the PDF, and compares it with existing database data to find differences.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [File Structure](#file-structure)

## Requirements

- Node.js (version 18 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/tandaraelena/typescript-coding-test-main.git
cd typescript-coding-test-main
```

2. Install the dependencies:

```bash
npm install
```

## Usage

1. Run the development server:

```bash
npm run dev
```

2. The server will start at http://localhost:3000.

3. Use a tool like Postman to interact with the API.

## API Endpoints

### POST /upload

Endpoint to upload a PDF and provide a company name for comparison.

- URL: /upload
- Method: POST
- Body:
  `companyName`: The name of the company (type: text)
  `pdf`: The PDF file to upload (type: file)
- Response:
  `200 OK`: Returns a JSON object with differences.
  `400 Bad Request`: If no file is uploaded, no `companyName` has been provided or `companyName` is invalid.
  `404 Not found`: No missing data.

### Example Request with Postman

1. Set the request method to POST and the URL to http://localhost:3000/upload.
2. Select the `Body` tab and choose `form-data`.
3. Add the following fields:

- `companyName` (type: `text`)
- `pdf` (type: `file`)

## Testing

To run the tests, use the following command:

```bash
npm run test
```

## File Structure

typescript-coding-test-main/
│
├── src/
│   ├── index.ts          # Main server file
│   └── utils/
│       └── index.ts      # Utility functions exported
│
├── data/
│   └── database.csv      # CSV file containing the database data
│
├── assets/
│   └── sample.pdf        # PDF files uploaded and removed after usage
│
└── Other files..


If you have any questions or feedback, feel free to reach me out.