//Dependencies

var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require('express-handlebars');

//Require Models
var ProductPage = require("./models/productPage.js");
var Comments = require("./models/comments.js");

//Scraping Tools
var request = require("request");
var cheerio = require("cheerio");

//Mongoose Promises
var Promise = require("bluebird");

mongoose.Promise = Promise;

//Initialize Express
var app = express();

//Use Morgan and body-parser with app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static("public"));


//DB configuration for mongoose
//db: productScrape
mongoose.connect("mongo.db://localhost/product-scrape");

//Link db to mongoose
var db = mongoose.connection;

//Log mongoose error
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

db.once("open", function() {
	console.log("Mongoose connection successful.");
});

app.get("/", function(req, res) {
	res.send(index);
})

app.get("/scrape", function(req, res) {
	//Grab body of html with request
	request("https://www.dotmed.com/equipment/newest", function(error, response, html){
		// load page into cheerio 
		var $ = cheerio.load(html);

		$("div.listings_table_d").each(function(i, element) {
			var result = {};

			result.name = $(element).children("dt.listing_head").children("a").text().trim() + "";

			result.link = $(element).children("dt.listing_head").children("a").attr("href").trim();

			result.price = $(element).children("dl.datePosted").children("dd").children("p").text().trim();

			var entry = new ProductPage(result);
			console.log(entry);

			entry.save(function(err, doc) {
				if (err) {
					console.log(err);
				}
				else {
					console.log(doc);
				}
			});
		});
	});
	res.send("Scrape Complere");
});

//Import Routes
var router = require("./controller/controller.js)";
app.use("/", router);

//Launch App
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Running on port: " + port);
})