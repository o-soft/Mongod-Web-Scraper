//Require Mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//Create Schema
var ProductSchema = new Schema ({
	name: {
		type: String,
		required: true,
		trim: true
	},

	link: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
  	//Create a relationship with Comment Model
  	comments: [{
  		type: Schema.Types.ObjectId,
  		ref: "Comments"
  	}]

});

//Create Model from above Schema using mongoose
var Product = mongoose.model("Product", ProductSchema);

//Export Model
module.exports = Product;

app.get("/scrape", function(req, res) {
    //Grab body of html with request
    request("https://www.dotmed.com/equipment/newest", function(error, response, html){
        // load page into cheerio 
        var $ = cheerio.load(html);

        $("div.listings_table_d").each(function(i, element) {
            var result = {};

            result.name = $(element).children("dt.listing_head").children("a").text().trim() + "";
            // $(element).find('dt.listing_head h3 a ').text().trim()

            result.link = $(element).children("dt.listing_head").children("a").attr("href").trim();

            result.price = $(element).children("dl.datePosted").children("dd").children("p").text().trim();
            // $(element).find('div.datePosted p').text().trim()

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