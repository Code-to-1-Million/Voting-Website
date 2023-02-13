// require express for handling HTTP requests
const express = require('express');
// require morgan for simplified logging of requests
const morgan = require('morgan');
// require path for handling file paths and directories
const path = require('path');

// create an express application
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// middleware & static files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
});

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/resources', (req, res) => {
    res.render('resources', { title: 'Resources' });
});

app.get('/volunteering', (req, res) => {
    res.render('volunteering', { title: 'Volunteering' });
});

app.get('/fundraising', (req, res) => {
    res.render('fundraising', { title: 'Fundraising' });
});

app.get('/talent-show', (req, res) => {
    res.render('talent-show', { title: 'Talent Show' });
});

app.get('/events', (req, res) => {
    res.render('events', { title: 'Events' });
});

app.get('/about-us', (req, res) => {
    res.render('about-us');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});