getUserLanguage = function() {

	var language = navigator.language || navigator.userLanguage;
	return language.slice(0, 2);

};

Meteor.startup(function() {
	
	if (getUserLanguage() === 'ru') {
		TAPi18n.setLanguage('ru');
	} else {
		TAPi18n.setLanguage('en');
	}
	
});