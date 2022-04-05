const path = require('path');
const express = require('express');

const PORT = 3000;
const publicResourceDir = path.join(__dirname, '../public');

const app = express()

app.set('view engine', 'hbs');
app.use(express.static(publicResourceDir));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app'
    });
});

app.get('/weather', (req, res) => {
   res.send({
      forecast: 'Forecast here'
   });
});

app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`)
});
