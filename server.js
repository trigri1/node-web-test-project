var express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log)

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to write to server.log');
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');

    // res.send({
    //     name: "name",
    //     array: [index1 = "0",
    //         index2 = "1"
    //     ]
    // });

    res.render('home.hbs', {
        title: 'Home Page',
        welcomeMessage: 'Welcome'
    });
});

app.get('/about', (req, res) => {
    // res.send('About Page');
    res.render('about.hbs', {
        title: 'New About Page',
    });
});



app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Error finding the request."
    });
});

app.listen(3000, () => {
    console.log('Server is running on port : 3000');
});