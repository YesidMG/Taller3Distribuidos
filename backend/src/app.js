const express = require('express');
const app = express();
const port = 3000;

let clientRegistryCount = {};

app.use(express.json());

app.post('/register', (req, res) => {
    const clientId = req.body.clientId;
    if (!clientId) {
        return res.status(400).json({ error: 'clientId is required' });
    }

    if (!clientRegistryCount[clientId]) {
        clientRegistryCount[clientId] = 0;
    }
    clientRegistryCount[clientId]++;

    res.status(200).json({ message: `Client ${clientId} registered. Count: ${clientRegistryCount[clientId]}` });
});

app.get('/status', (req, res) => {
    res.status(200).json(clientRegistryCount);
});

app.listen(port, () => {
    console.log(`Backend service running at http://localhost:${port}`);
});