const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');

app.set('port', process.env.PORT || 3031);

mongoose.connect('mongodb://localhost/crud-chrr', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.log(err));

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use('/', routes);

app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
})