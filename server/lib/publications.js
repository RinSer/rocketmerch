// Publish clients data
Meteor.publish('clientsData', function() {
	
	if (this.userId) {
		var currentUser = Meteor.users.findOne({_id: this.userId});
		if (currentUser.admin || currentUser.seller) {
			return Meteor.users.find({}, {fields: {name: 1, emails: 1, client: 1}});
		}
	}
	
});

// Publish products data
Meteor.publish('productsData', function() {

	return Products.find();

});