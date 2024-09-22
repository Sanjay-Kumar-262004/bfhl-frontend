const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;
  const alphabets = [];
  const numbers = [];
  let highestLowercase = null;

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase()) {
        if (!highestLowercase || item > highestLowercase) {
          highestLowercase = item;
        }
      }
    }
  });


  let fileValid = false;
  let fileMimeType = '';
  let fileSizeKb = 0;

  if (file_b64) {
    fileValid = true; 
    fileMimeType = 'application/octet-stream'; 
    fileSizeKb = (Buffer.from(file_b64, 'base64').length / 1024).toFixed(2);
  }

  res.status(200).json({
    is_success: true,
    user_id: 'john_doe_17091999',
    email: 'john@xyz.com',
    roll_number: 'RA2111004010123',
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb
  });
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
