const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API KEY pk_3a0ea28079d24c0a84f9294307ac00c7
// create call_api function
function call_api(callback, stock) {
	request('https://cloud.iexapis.com/stable/stock/' + stock + '/quote?token=pk_3a0ea28079d24c0a84f9294307ac00c7', {json: true}, (err, res, body) => {
		if (err) {
			return console.log(err);
		};
		if (res.statusCode === 200) {
			callback(body);
		};
	});
};

// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set handlebar index GET route
/* app.get('/searchResult.html', function(req, res) {
	call_api(function(success) {
		res.render('home', {
			stock: success
		});
	});
}); */

// Set handlebar index POST route
app.post('/', function(req, res) {
	call_api(function(success) {
		//postedItem = req.body.stock_ticker;
		res.render('searchResult', {
			stock: success
		});
	}, req.body.stock_ticker);
});

// Create home page route
app.get('/', function(req, res) {
	res.render('home')
});

// Create about page route
app.get('/about.html', function(req, res) {
	res.render('about')
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on Port ' + PORT));