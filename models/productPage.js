//Require Mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//Create Schema
var ProductPageSchema = new Schema ({
	name: {
		type: String,
		required: true
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
var ProductPage = mongoose.model("ProductPage", ProductPageSchema);

//Export Model
module.exports = ProductPage;