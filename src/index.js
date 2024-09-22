const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
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

    res.status(200).json({
        is_success: true,
        user_id: 'john_doe_17091999',
        roll_number: 'RA2111004010123',
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
