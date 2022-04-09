const initServer = require('./config');
const forecast = require('../../weather-app/forecast');

const PORT = 3000;
const app = initServer();


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.location) {
        res.status(400).send({
            error: 'Please provide a location'
        });
    }

    forecast(req.query.location, (message, error) => {
        if (error) {
            return res.status(500).send({ error });
        }
        return res.send({ message });

        // if (success) {
        //     res.status(200).body({xd:'xd'})
        // } else {
        //     res.status(500).send({ error })
        // }
    });
});

app.get('*', (req, res) => {
   res.status(404).json({ error: '404'})
});

app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
});
