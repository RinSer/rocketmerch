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
    if (Meteor.user()) {
      if (Meteor.user().admin || Meteor.user().seller) {
        this.next();
      } else {
        this.render('adminLogin');
      }
    } else {
      this.render('adminLogin');
    }
  }
}

Router.before(adminBefore.isLoggedIn, {only: ['admin', 'admin>orders', 'admin>products', 'admin>clients', 'admin>info', 'admin>settings']});

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

  this.route('admin>orders', {
    path: '/admin/orders',
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

  this.route('admin>info', {
    path: '/admin/info',
    template: 'admin',
    layoutTemplate: 'admin',
    yieldTemplates: {
      'admin_header': {to: 'header'},
      'admin_info': {to: 'main'}
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

