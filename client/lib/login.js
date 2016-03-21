// SignIn template helpers
Template.signIn.helpers({

  closedForm: function() {
    if (Session.get('open_signIn')) {
      return false;
    } else {
      return true;
    }
  },

  needRegister: function() {
    if (Session.get('register_signIn')) {
      return true;
    } else {
      return false;
    }
  },

  userEmail: function() {
    if (Meteor.user()) {
      return Meteor.user().emails[0].address;
    }
  },

  userName: function() {
    if( Meteor.user()) {
      return Meteor.user().name;
    }
  },

});

// SignIn template events
Template.signIn.events({

  'click .js-signIn': function(event) {
    Session.set('open_signIn', true);
  },

  'click .js-signIn-close': function(event) {
    Session.set('open_signIn', false);
    Session.set('register_signIn', false);
  },

  'click .js-signIn-register': function(event) {
    Session.set('register_signIn', true);
  },

  'click .js-signOut': function(event) {
    Meteor.logout();
  },

});

// Register template events
Template.register.events({
  'submit form': function(event){
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Accounts.createUser({
      email: email,
      password: password
    }, function(error){
      if(error){
        console.log(error);
      }
    });
    Session.set('open_signIn', false);
    Session.set('register_signIn', false);
  }
});

// Login template events
Template.login.events({
  'submit form': function(event){
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password').val();
    Meteor.loginWithPassword(email, password, function(error) {
      if(error){
        console.log(error.reason);
      }
    });
    Session.set('open_signIn', false);
    Session.set('register_signIn', false);
  }
});