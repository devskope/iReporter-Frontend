require('dotenv').config();

const express = require('express');
const path = require('path');

const logger = require('debug')('iReporter-clientServer:: ');

const {
  env: { PORT },
} = process;

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

app.listen(PORT, () => logger(`server started on ${PORT}`));
