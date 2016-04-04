// Add fields to user accounts
Accounts.onCreateUser(function(options, user) {
  user.name = options.name;
  user.admin = options.admin || false;
  user.seller = options.seller || false;
  user.client = options.client || false;
  user.address = options.address || false;
  return user;
});

// Publish custom fields
Meteor.publish('userData', function() {
	if(!this.userId) return null;
	return Meteor.users.find(this.userId, {fields: {
		name: 1,
		admin: 1,
		seller: 1,
		client: 1,
		address: 1
	}});
});

// Publish orders data
Meteor.publish('ordersData', function() {

	if (this.userId) {
		var currentUser = Meteor.users.findOne({_id: this.userId});
		if (currentUser.admin || currentUser.seller) {
			return Orders.find({}, {fields: {client: 1, address: 1, products: 1, status: 1}, sort: {createdAt: -1}});
		}
	}

});

// Publish products data
Meteor.publish('productsData', function(search_string) {

	if (search_string) {
		return Products.find({$text: {$search: search_string}}, {fields: {score: {$meta: 'textScore'}, category: 1, title: 1, description: 1, price: 1, img: 1, quantity: 1}, sort: {score: {$meta: 'textScore'}}});
	} else {
		return Products.find({}, {fields: {category: 1, title: 1, description: 1, price: 1, img: 1, quantity: 1}});
	}

});

// Publish clients data
Meteor.publish('usersData', function(search_string) {
	
	if (this.userId) {
		var currentUser = Meteor.users.findOne({_id: this.userId});
		if (currentUser.admin || currentUser.seller) {
			if (search_string) {
				return Meteor.users.find({$text: {$search: search_string}}, {fields: {score: {$meta: 'textScore'}, name: 1, emails: 1, client: 1, address: 1}, sort: {score: {$meta: 'textScore'}}});
			} else {
				return Meteor.users.find({}, {fields: {name: 1, emails: 1, client: 1, address: 1}, sort: {name: 1}});
			}
		}
	}
	
});

// Publish info data
Meteor.publish('infoData', function() {

	return Info.find({}, {fields: {title: 1, address: 1, description: 1}});

});
