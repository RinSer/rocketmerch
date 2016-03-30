// Collection to store Products data
Products = new Mongo.Collection('products');

Products.schema = new SimpleSchema({
  category: {type: String},
  title: {type: String, unique: true},
  description: {type: String},
  price: {type: Number, decimal: true, min: 0},
  img: {type: String},
  quantity: {type: Number, min: 0},
  createdAt: {type: Date},
  updatedAt: {type: Date, optional: true}
});

Products.attachSchema(Products.schema);

// Collection to store Orders data
Orders = new Mongo.Collection('orders');

Orders.schema = new SimpleSchema({
  client: {type: String},
  address: {type: String},
  products: {type: [Object]},
  "products.$.title": {type: String},
  "products.$.quantity": {type: Number, min: 1},
  status: {type: String, allowedValues: ["new", "pending", "delivered"]},
  createdAt: {type: Date}
});

Orders.attachSchema(Orders.schema);

// Collection to store Info data
Info = new Mongo.Collection('info');

Info.schema = new SimpleSchema({
  title: {type: String},
  address: {type: String},
  description: {type: String}
});

Info.attachSchema(Info.schema);

// Collections to store image files
const imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
	stores: [imageStore],
	filter: {
		maxSize: 3145728,
		allow: {
		    contentTypes: ['image/*'],
			  extensions: ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']
		}
	}
});

Images.allow({
  insert: function(userId) {
  	if (userId) {
  		var user = Meteor.users.findOne({_id:userId});
  		if (user.seller || user.admin) {
  			return true;
  		} else {
  			return false;
  		}
  	}
  },
  update: function(userId, doc) {
  	if (userId) {
  		var user = Meteor.users.findOne({_id:userId});
  		if (user.seller || user.admin) {
  			return true;
  		} else {
  			return false;
  		}
  	}
  },
  remove: function(userId, doc) {
    if (userId) {
  		var user = Meteor.users.findOne({_id:userId});
  		if (user.seller || user.admin) {
  			return true;
  		} else {
  			return false;
  		}
  	}
  },
  download: function() {
    return true;
  }
});