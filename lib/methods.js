Meteor.methods({

	// User methods
	updateUser: function(userId, newData) {

		if (newData.email) {
			if (Meteor.isServer) Accounts.addEmail(userId, newData.email);
		}
		if (newData.password) {
			if (Meteor.isServer) Accounts.setPassword(userId, newData.password);
		}
		Meteor.users.update({_id:userId}, {$set: newData});
		
	},

	addUser: function(userData) {

		if (Meteor.isServer) Accounts.createUser(userData);

	},

	deleteUser: function(userId) {

		Meteor.users.remove(userId);

	},

	// Product methods
	updateProduct: function(productId, productData) {

		Products.update({_id:productId}, {$set: productData});

	},

	addProduct: function(productData) {

		Products.insert(productData);

	},

	deleteProduct: function(productId) {

		Products.remove(productId);

	},

	// Info methods
	updateInfo: function(newInfo) {

		const info = Info.findOne();

		Info.update({_id:info._id}, {$set: newInfo});

	}

});