const express = require('express');
const Bundler = require('parcel-bundler');
const data = require('./data');

const bundler = new Bundler('./client/src/index.html');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/levels', (req, res) => {
    res.status(200).json({ message: 'Hello world', data: data.LEVELS });
});

app.get('/api/levels/:levelID/tests', (req, res) => {
    const levelID = req.params.levelID.toString();
    const levelTests = data.TESTS.find(test => test.id === levelID);

    if (!levelTests) {
        res.status(500).error(`Tests for level ${levelID} not found!`);
    }
    res.status(200).json({ message: 'Your tests', data: levelTests });
});

app.use(bundler.middleware());
app.listen(port, () => console.info(`Server listen on port:${port}`));
