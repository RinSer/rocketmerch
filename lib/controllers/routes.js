Router.route('/', function () {
  this.render('main');
});

Router.route('/register', function() {
  this.render('register');
});

Router.route('/login', function() {
  this.render('login');
});

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
});

Router.map(function () {
  this.route('admin>products', {
    path: '/admin/products',
    template: 'admin',
    layoutTemplate: 'admin',
    yieldTemplates: {
    	'admin_header': {to: 'header'},
    	'admin_products': {to: 'main'}
    }
  });
});