// Collection to store Products data
Products = new Mongo.Collection('products');

// Collection to store Orders data
Orders = new Mongo.Collection('orders');

// Collection to store Info data
Info = new Mongo.Collection('info');

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