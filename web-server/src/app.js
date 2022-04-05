const express = require('express');

const PORT = 3000;

const app = express()

app.get('', (req, res) => {
   res.send('Hello express');
});

app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`)
});
