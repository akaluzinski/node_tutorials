const express = require('express');
require('./db/mongoose');
const User = require('./models/user'); //todo replace with import

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', ({body}, res) => {
   const user = new User(body);
   user.save().then(()=>{
      res.send(user);
   }).catch(()=>{
      res.status(500).send({ error: 'oops'}) //todo more specific error messages
   })

});

app.listen(port, () => {
   console.log(`Server is on port ${port}`);
});
