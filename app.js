const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require("axios");

// Load environment variables from .env file
dotenv.load();

// Routers
const index = require('./src/routes/index');

const app = express();

// const abcd = async () => {
//     try {
//         console.log("calling func")
//         const url = 'http://ddaa2b87.ngrok.io/webhooks';
//         const response = await axios.post(url, {})
//         console.log("abra", response.body)
//     } catch (error) {
//         console.log("abra error", error)
//     }
//     setTimeout(abcd, 10000)
// }

// abcd();

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, './src/public', '/images/favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, './src/public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    // res.render('pages/404', {
    //     'message': 'Page not found'
    // });
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.error("error ->", err)
    // res.render('pages/error');
});

module.exports = app;