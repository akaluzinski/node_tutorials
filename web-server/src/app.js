const initServer = require('./config');

const PORT = 3000;
const app = initServer();

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
    console.log(`Server up on port ${PORT}`);
});
