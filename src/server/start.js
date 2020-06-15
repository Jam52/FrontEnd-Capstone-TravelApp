const app = require('./index.js');

//setting port for heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log('listening on port 8080');
})