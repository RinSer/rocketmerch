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