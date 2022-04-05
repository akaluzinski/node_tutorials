const path = require('path');
const express = require('express');

const PORT = 3000;
const publicResourceDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../src/templates');

const app = express()

app.set('view engine', 'hbs');
app.set('views', viewPath);
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
