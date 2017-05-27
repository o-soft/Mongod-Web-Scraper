//Require Mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//Create Schema
var CommentsSchema = new Schema ({
	name: {
		type: String,
		required: true
	},

	content: {
		type: String,
		required: true
	},

});

//Create Model from above Schema using mongoose
var Comments = mongoose.model("Comments", CommentsSchema);

//Export Model
module.exports = Comments;
