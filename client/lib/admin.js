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

// On rendered admin_language
Template.admin_language.onRendered(function() {

	if (TAPi18n.getLanguage() === 'ru') {
		$('.js-switch-to-russian').removeClass('css-admin-language-button').addClass('css-admin-language-button-active');
		$('.js-switch-to-english').removeClass('css-admin-language-button-active').addClass('css-admin-language-button');
	}

});

// On rendered admin_users
Template.admin_users.onRendered(function() {

	this.$('.jq-admin-add-user-button').click(function() {
		$('.css-admin-new-user-form').animate({width:'toggle'}, 'slow');
		$('.jq-admin-add-user-button').hide();
	});

	this.$('.jq-admin-new-user-close').click(function() {
		$('.css-admin-new-user-form').animate({width:'toggle'});
		$('.jq-admin-add-user-button').show();
	});

});

// On created admin_orders
Template.admin_orders.onCreated(function() {

	Session.set('orders_status', 'all');

});

// Helpers for admin_orders
Template.admin_orders.helpers({

	// Show all orders
	orders:function() {

		var status = Session.get('orders_status');

		switch (status) {
			case "all":
				return Orders.find({});
			case "new":
				return Orders.find({status: "new"});
			case "pending":
				return Orders.find({status: "pending"});
			case "delivered":
				return Orders.find({status: "delivered"});
			default:
				console.log("Unknown status!");
				break;
		}

	}

});

// Helpers for admin_order
Template.admin_order.helpers({

	status:function() {

		const status = Template.instance().data.order.status;

		if (TAPi18n.getLanguage() === 'ru') {
			return admin_order_status_ru.statuses[status];
		} else {
			return status;
		}

	},

	client:function() {

		const client_id = Template.instance().data.order.client;

		const client = Meteor.users.findOne({_id: client_id});

		return client;

	},

	products:function() {

		const product_ids = Template.instance().data.order.products;

		const products = [];

		_.each(product_ids, function(product_id) {

			var product = Products.findOne({_id: product_id.title});
			product.quantity = product_id.quantity;
			product.total = ((product.price*100)*product_id.quantity)/100;
			products.push(product);

		});

		return products;

	},

	total:function() {

		const product_ids = Template.instance().data.order.products;

		var total = 0;

		_.each(product_ids, function(product_id) {

			var product = Products.findOne({_id: product_id.title});
			var product_total = ((product.price*100)*product_id.quantity)/100;
			total += product_total;

		});

		return total;

	},

	button_status:function() {

		const status = Template.instance().data.order.status;
		var statuses;

		if (TAPi18n.getLanguage() === 'ru') {
			statuses = admin_order_status_ru.buttons;
		} else {
			statuses = admin_order_status_en.buttons;
		}

		switch (status) {
			case "new":
				return statuses.send;
			case "pending":
				return statuses.pending;
			case "delivered":
				return statuses.delivered;
			default:
				console.log(statuses.mistake+"!");
				break;
		}

	},

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

// Helpers for admin_client
Template.admin_client.helpers({

	see_orders:function() {

		const client_id = Template.instance().data.client._id;
		return Session.get(client_id+'_orders_visible');

	},

	orders:function() {

		const client_id = Template.instance().data.client._id;
		if (Orders.find({client: client_id}).count() > 0) {
			return Orders.find({client: client_id});
		} else {
			return false;
		}

	},

});

// Helpers for admin_users
Template.admin_users.helpers({

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

// Events for admin_orders
Template.admin_orders.events({

	'click .js-admin-orders-all': function(event) {

		event.preventDefault();

		Session.set('orders_status', 'all');
		$('.css-admin-orders-current-status').removeClass('css-admin-orders-current-status');
		$('.js-admin-orders-all').addClass('css-admin-orders-current-status');

	},

	'click .js-admin-orders-new': function(event) {

		event.preventDefault();

		Session.set('orders_status', 'new');
		$('.css-admin-orders-current-status').removeClass('css-admin-orders-current-status');
		$('.js-admin-orders-new').addClass('css-admin-orders-current-status');

	},

	'click .js-admin-orders-pending': function(event) {

		event.preventDefault();

		Session.set('orders_status', 'pending');
		$('.css-admin-orders-current-status').removeClass('css-admin-orders-current-status');
		$('.js-admin-orders-pending').addClass('css-admin-orders-current-status');

	},

	'click .js-admin-orders-delivered': function(event) {

		event.preventDefault();

		Session.set('orders_status', 'delivered');
		$('.css-admin-orders-current-status').removeClass('css-admin-orders-current-status');
		$('.js-admin-orders-delivered').addClass('css-admin-orders-current-status');

	},

});

// Events for admin_order
Template.admin_order.events({

	'click .js-admin-order-change-status': function(event, template) {

		event.preventDefault();

		const order_id = template.data.order._id;
		var order_status = template.data.order.status;

		switch (order_status) {
			case "new":
				Meteor.call('updateStatus', order_id, "pending");
				break;
			case "pending":
				Meteor.call('updateStatus', order_id, "delivered");
				break;
			case "delivered":
				Meteor.call('deleteOrder', order_id);
				break;
			default:
				console.log("Unknown status!");
				break;
		}

	},

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
		Meteor.call('deleteProduct', product_id);

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
		var price = event.target.product_price.value;
		var quantity = event.target.product_quantity.value;
		var date = new Date();

		var new_product = {
			category: category,
			title: title,
			img: img,
			description: description,
			price: price,
			quantity: quantity,
		};

		if (this.product) {
			const id = this.product._id;

			new_product.updatedAt = date;

			Meteor.call('updateProduct', id, new_product);

	        Session.set(id+"_update", false);
		} else {
			new_product.createdAt = date;

			Meteor.call('addProduct', new_product);

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

// Events for admin_client
Template.admin_client.events({

	'click .js-admin-client-show-orders':function(event, template) {

		event.preventDefault();

		const client_id = template.data.client._id;
		Session.set(client_id+'_orders_visible', true);

	},

	'click .js-admin-client-close-orders':function(event, template) {

		event.preventDefault();

		const client_id = template.data.client._id;
		Session.set(client_id+'_orders_visible', false);

	},

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

// Events for admin_info_form
Template.admin_info_form.events({

	'submit .js-admin-info-form':function(event) {


		event.preventDefault();

		var title = event.target.info_title.value;
		var address = event.target.info_address.value;
		var description = event.target.info_description.value;

		var new_info = {
			title: title,
			address: address,
			description: description
		};

		Meteor.call('updateInfo', new_info);

		Session.set('update_info', false);

	}

});

// Events for admin_language
Template.admin_language.events({

	'click .js-switch-to-english':function(event) {

		event.preventDefault();

		TAPi18n.setLanguage('en');
		$('.js-switch-to-english').removeClass('css-admin-language-button').addClass('css-admin-language-button-active');
		$('.js-switch-to-russian').removeClass('css-admin-language-button-active').addClass('css-admin-language-button');

	},

	'click .js-switch-to-russian':function(event) {

		event.preventDefault();

		TAPi18n.setLanguage('ru');
		$('.js-switch-to-russian').removeClass('css-admin-language-button').addClass('css-admin-language-button-active');
		$('.js-switch-to-english').removeClass('css-admin-language-button-active').addClass('css-admin-language-button');

	},

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

	},

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