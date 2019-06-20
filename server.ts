const express = require('express');
const Bundler = require('parcel-bundler');

const bundler = new Bundler('./client/src/index.html');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/levels', (req, res) => {
    res.json({ levels: 'hello' });
});

app.get('/api/levels/:levelID/tests', (req, res) => {
    res.json({ tests: 'world' });
});

app.use(bundler.middleware());
app.listen(port, () => console.info(`Server listen on port:${port}`));
