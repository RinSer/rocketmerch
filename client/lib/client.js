// Template helpers

// On rendered admin_products
Template.admin_products.onRendered(function() {

	this.$('.jq-admin-add-button').click(function() {
		$('.css-admin-products-add-new-form').animate({width:'toggle'}, "slow");
		$('.jq-admin-add-button').hide();
	});

	this.$('.jq-admin-new-form-close').click(function() {
		$('.css-admin-products-add-new-form').animate({width:'toggle'});
		$('.jq-admin-add-button').show();
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

Template.admin_product.helpers({

	update:function(template) {

		const product_id = Template.instance().data.product._id;
		return Session.get(product_id+"_update");

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