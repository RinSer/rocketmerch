Router.route('/', function () {
  this.render('main');
});

Router.route('/register', function() {
  this.render('register');
});

Router.route('/login', function() {
  this.render('login');
});

// Admin Before Hooks
var adminBefore;
adminBefore = {
  isLoggedIn: function() {
    var currentUser = Meteor.user();
    if (Meteor.userId()) {
      if (currentUser.admin || currentUser.seller) {
        this.next();
      } else {
        console.log('should be admin or seller');
        this.render('adminLogin');
      }
    } else {
      console.log('should log');
      this.render('adminLogin');
    }
  }
}

Router.before(adminBefore.isLoggedIn, {only: ['admin', 'admin>products', 'admin>clients', 'admin>info', 'admin>settings']});

Router.map(function () {

  this.route('admin', {
    path: '/admin',
    template: 'admin',
    layoutTemplate: 'admin',
    yieldTemplates: {
    	'admin_header': {to: 'header'},
    	'admin_orders': {to: 'main'}
    }
  });

  this.route('admin>products', {
    path: '/admin/products',
    template: 'admin',
    layoutTemplate: 'admin',
    yieldTemplates: {
      'admin_header': {to: 'header'},
      'admin_products': {to: 'main'}
    }
  });

  this.route('admin>clients', {
    path: '/admin/clients',
    template: 'admin',
    layoutTemplate: 'admin',
    yieldTemplates: {
      'admin_header': {to: 'header'},
      'admin_clients': {to: 'main'}
    }
  });

  this.route('admin>settings', {
    path: '/admin/settings',
    template: 'admin',
    layoutTemplate: 'admin',
    yieldTemplates: {
      'admin_header': {to: 'header'},
      'admin_settings': {to: 'main'}
    }
  });

});

