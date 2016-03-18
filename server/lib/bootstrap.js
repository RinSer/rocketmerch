Meteor.startup(function () {
    // code to run on server at startup
    // Create dev collection elements
    const init_products = [
    	{
    		category: "one",
    		title: "One_one",
    		description: "Your product description goes here.",
    		img: "/600x400.png",
            quantity: 5,
            createdAt: new Date(),
    	},
    	{
    		category: "one",
    		title: "Two_one",
    		description: "Your product description goes here.",
    		img: "/600x400.png",
            quantity: 4,
            createdAt: new Date(),
    	},
    	{
    		category: "one",
    		title: "Three_one",
    		description: "Your product description goes here.",
    		img: "/600x400.png",
            quantity: 3,
            createdAt: new Date(),
    	},
    	{
    		category: "one",
    		title: "Four_one",
    		description: "Your product description goes here.",
    		img: "/600x400.png",
            quantity: 2,
            createdAt: new Date(),
    	},
    	{
    		category: "one",
    		title: "Five_one",
    		description: "Your product description goes here.",
    		img: "/600x400.png",
            quantity: 12,
            createdAt: new Date(),
    	},
    	{
    		category: "two",
    		title: "One_two",
    		description: "Your product description goes here.",
    		img: "/600x400.png",
            quantity: 1,
            createdAt: new Date(),
    	},
    	{
    		category: "two",
    		title: "Two_two",
    		description: "Your product description goes here.",
    		img: "/600x400.png",
            quantity: 0,
            createdAt: new Date(),
    	},
    	{
    		category: "two",
    		title: "Three_two",
    		description: "Your product description goes here.",
    		img: "/600x400.png",
            quantity: 10,
            createdAt: new Date(),
    	},
    ];
    if (Products.find().count() === 0) {
        _.each(init_products, function(doc) {
            Products.insert(doc);
            console.log("Added "+doc.title+" to Products.");
        });
    };
  });