const express = require('express');
const path = require('path');

const app = express();

const hbs = require('express-handlebars');

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname + `/views/${name}`));
  };
  next();
});

app.use(express.static(path.join(__dirname + '/public')));

app.use('/user', (req, res, next) => {
  res.send('Please log in');
  next();
});

app.get('/user/panel', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/forbidden.html'));
});

app.get('/user/settings', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/forbidden.html'));
});

app.get('/hello/:name', (req, res) => {
  // res.send(`Hello ${req.params.name}`);
  // res.render('hello', { id: req.params.id, name: req.params.name, date: '21-02-2019' });
  // res.render('hello', { name: req.params.name });
  res.render('hello', { layout: false, name: req.params.name });
});

app.get('/', (req, res) => {
  res.show('home.html');
});

app.get('/home', (req, res) => {
  res.show('home.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname + `/views/404.html`));
})

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});