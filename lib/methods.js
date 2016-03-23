Meteor.methods({

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

	}

});