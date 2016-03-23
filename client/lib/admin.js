// Template helpers

// On rendered admin_products
Template.admin_products.onRendered(function() {

	this.$('.jq-admin-add-button').click(function() {
		$('.css-admin-products-add-new-form').animate({width:'toggle'}, 'slow');
		$('.jq-admin-add-button').hide();
	});

	this.$('.jq-admin-new-form-close').click(function() {
		$('.css-admin-products-add-new-form').animate({width:'toggle'});
		$('.jq-admin-add-button').show();
	});

});

// On rendered admin_settings
Template.admin_settings.onRendered(function() {

	this.$('.jq-admin-add-user-button').click(function() {
		$('.css-admin-new-user-form').animate({width:'toggle'}, 'slow');
		$('.jq-admin-add-user-button').hide();
	});

	this.$('.jq-admin-new-user-close').click(function() {
		$('.css-admin-new-user-form').animate({width:'toggle'});
		$('.jq-admin-add-user-button').show();
	});

});

// Helpers for admin_products
Template.admin_products.helpers({

	// Show all products
	products:function() {

		return Products.find({});

	},

});

// Set initial view to product
Template.admin_product.onCreated(function () {
    // not update view
    Session.set(this.data.product._id+"_update", false);
    
});

// Helpers for admin_product
Template.admin_product.helpers({

	update:function(template) {

		const product_id = Template.instance().data.product._id;
		return Session.get(product_id+"_update");

	},

});

// Helpers for admin_clients
Template.admin_clients.helpers({

	clients:function() {

		return Meteor.users.find({client: true});

	},

});

// Helpers for admin_settings
Template.admin_settings.helpers({

	users:function() {

		if (Meteor.user().admin) {
			return Meteor.users.find({client: false});
		} else {
			return Meteor.users.find({_id:Meteor.user()._id});
		}

	}

});

// Helpers for admin_user
Template.admin_user.helpers({

	update:function() {

		const user_id = Template.instance().data.user._id;
		return Session.get(user_id+"_update_user");

	}

});

// Helpers for admin_info
Template.admin_info.helpers({

	info:function() {

		return Info.findOne();

	},

	update:function() {

		return Session.get("update_info");

	}

});

// Events for admin_product
Template.admin_product.events({

	// Update product
	'click .js-admin-form-close': function(event) {

		event.preventDefault();

		const product_id = this.product._id;
        Session.set(product_id+"_update", false);
        
	},	

	'click .js-admin-product': function(event) {
		// Prevent default browser form submit
        event.preventDefault();
        
        const product_id = this.product._id;
        Session.set(product_id+"_update", true);
        
	},

	// Delete product
	'click .js-admin-delete-button': function(event) {

		event.preventDefault();

		const product_id = this.product._id;
		Products.remove(product_id);

	},

});

// Events for Admin product update form
Template.admin_product_form.events({

	'submit .js-admin-product-form': function(event) {
		
		event.preventDefault();

		var category = event.target.product_category.value;
		var title = event.target.product_title.value;
		var img = event.target.product_image.value;
		var description = event.target.product_description.value;
		var quantity = event.target.product_quantity.value;
		var date = new Date();

		if (this.product) {
			const id = this.product._id;

			Products.update({_id:id}, {$set: {
					category: category,
					title: title,
					img: img,
					description: description,
					quantity: quantity,
					updatedAt: date
				}
			});

	        Session.set(id+"_update", false);
		} else {
			Products.insert({
				category: category,
				title: title,
				img: img,
				description: description,
				quantity: quantity,
				createdAt: date
			});

			$('.css-admin-products-add-new-form').animate({width:'toggle'});
			$('.jq-admin-add-button').show();
		}
	
	},

	'change .js-admin-product-image': function(event, template) {

		FS.Utility.eachFile(event, function(file) {
			Images.insert(file, function(err, fileObj) {
				if (err) {
					// handle error
				} else {
					file_id = template.find('.js-admin-product-img').value.substring(18);
					if (Images.findOne({_id:file_id})) {
						Images.remove({_id:file_id});
					}
					const imgURL = "/cfs/files/images/"+fileObj._id;
					template.find('.js-admin-product-img').value = imgURL;
					console.log(Images.findOne({_id:file_id}));
				}
			});
		});

	}

});

// Events for admin_info
Template.admin_info.events({

	'click .js-admin-info-update':function(event) {

		event.preventDefault();

		Session.set('update_info', true);

	},

	'click .js-admin-info-form-close':function(event) {

		event.preventDefault();

		Session.set('update_info', false);
		
	}

});

// Events for admin_user
Template.admin_user.events({

	'click .js-admin-user':function(event) {

		event.preventDefault();

		const user_id = this.user._id;
		Session.set(user_id+'_update_user', true);

	},

	'click .js-admin-user-form-close':function(event) {

		event.preventDefault();

		const user_id = this.user._id;
		Session.set(user_id+'_update_user', false);

	},

	'click .js-admin-delete-user-button':function(event) {

		event.preventDefault();

		const id = this.user._id;
		Meteor.call('deleteUser', id);

	}

});

// Events for admin_user_form
Template.admin_user_form.events({

	'submit .js-admin-user-form': function(event) {
		
		event.preventDefault();

		var name = event.target.user_name.value;
		var email = event.target.user_email.value;
		var password = event.target.user_password.value;
		var password_confirmation = event.target.user_password_confirmation.value;
		var date = new Date();

		if (password !== password_confirmation) {
			$('.css-admin-user-form-notification').html('Password should match its confirmation!');
			$('.css-admin-user-form-notification').show();
			return
		}

		var new_user = {
			name: name,
			email: email,
			password: password,
			updatedAt: date
		};

		if (Meteor.user().admin) {
			var group = event.target.user_group.value;
			if (group) {
				new_user.admin = false;
				new_user.seller = false;
				new_user.client = false;
				new_user[group] = true;
			}
		}

		if (this.user) {
			const id = this.user._id;

			Meteor.call('updateUser', id, new_user, function(err, data) {
				if (err) {
					$('.css-admin-user-form-notification').html(err.reason);
					$('.css-admin-user-form-notification').show();
					return
				} else {
					Session.set(id+"_update_user", false);
				}
			});
		} else {
			if (!group) {
				$('.css-admin-user-form-notification').html('Please choose the user group');
				$('.css-admin-user-form-notification').show();
				return
			}
			Meteor.call('addUser', new_user, function(err, data) {
				if (err) {
					$('.css-admin-user-form-notification').html(err.reason);
					$('.css-admin-user-form-notification').show();
					return
				} else {
					$('.css-admin-new-user-form').animate({width:'toggle'});
					$('.jq-admin-add-user-button').show();
				}
			});
		}
	},

});