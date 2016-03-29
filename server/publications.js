// Publish orders data
Meteor.publish('ordersData', function() {

	if (this.userId) {
		var currentUser = Meteor.users.findOne({_id: this.userId});
		if (currentUser.admin || currentUser.seller) {
			return Orders.find({}, {fields: {client: 1, address: 1, products: 1, status: 1}});
		}
	}

});

// Publish products data
Meteor.publish('productsData', function() {

	return Products.find({}, {fields: {category: 1, title: 1, description: 1, price: 1, img: 1, quantity: 1}});

});

// Publish clients data
Meteor.publish('usersData', function() {
	
	if (this.userId) {
		var currentUser = Meteor.users.findOne({_id: this.userId});
		if (currentUser.admin || currentUser.seller) {
			return Meteor.users.find({}, {fields: {name: 1, emails: 1, client: 1, address: 1}});
		}
	}
	
});

// Publish info data
Meteor.publish('infoData', function() {

	return Info.find({}, {fields: {title: 1, address: 1, description: 1}});

});
