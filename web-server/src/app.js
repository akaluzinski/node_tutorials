const path = require('path');
const express = require('express');

const PORT = 3000;
const publicResourceDir = path.join(__dirname, '../public');

const app = express()

app.use(express.static(publicResourceDir));

app.get('/weather', (req, res) => {
   res.send({
      forecast: 'Forecast here'
   });
});

app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`)
});
