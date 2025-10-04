const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const PORT = 5001;
const corsOptions = {
    origin: 'http://localhost:8601', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204 
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json()); 

const storedString = new Set(); 

app.post('/api/check-string', (req, res) => {
    const { inputString } = req.body; 

    if (!inputString || typeof inputString !== 'string') {
        return res.status(400).json({ error: 'Invalid string provided.' });
    }
    const wasSentBefore = storedString.has(inputString);

    if (!wasSentBefore) {
        storedString.add(inputString);
    }
    res.json({ wasSentBefore: wasSentBefore });
});

app.listen(PORT, () => {
    console.log(`Node.js API running on http://localhost:${PORT}`);
    console.log(`CORS is configured to accept requests from http://localhost:8601`);
});