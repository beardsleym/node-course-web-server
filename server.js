
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + "/views/partials")
app.set('view engine', 'hbs');

//Middleware example. Must call next, or it will never move on.
app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method}: ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if(error) {
      console.log(error);
    }
  });
  next();
})

//Middleware res.render maintainence mode.
// app.use((req, res, next) => {
//   res.render('maintainence.hbs', {
//     pageTitle: 'Maintainence Mode',
//   });
// })

// app.use(express.static('~/node-web-server/public/html'));
app.use(express.static(__dirname + "/public/html"));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});



app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'hello matt what is up'
  });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
})

//Non arrow function version
// app.get('/', function(req, res) {
// })

app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Server.js is running');
});
