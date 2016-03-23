Meteor.startup(function () {
    // code to run on server at startup
    // Create dev users
    const init_users = [
        // Admin user
        {
            name: "admin",
            email: "serj.dukareff@gmail.com",
            password: "rocket",
            admin: true
        },
        // Seller users
        {
            name: "seller1",
            email: "seller1@merch.com",
            password: "seller1",
            seller: true
        },
        {
            name: "seller2",
            email: "seller2@merch.com",
            password: "seller2",
            seller: true
        },
        // Client users
        {
            name: "test1",
            email: "test1@test.com",
            password: "123",
            client: true
        },
        {
            name: "test2",
            email: "test2@test.com",
            password: "123",
            client: true
        },
        {
            name: "test3",
            email: "test3@test.com",
            password: "123",
            client: true
        },
        {
            name: "test4",
            email: "test4@test.com",
            password: "123",
            client: true
        },
        {
            name: "test5",
            email: "test5@test.com",
            password: "123",
            client: true
        },
    ];
    if (Meteor.users.find().count() === 0) {
        _.each(init_users, function(user) {
            Accounts.createUser(user);
            console.log("Created user "+user.name);
        });
    }
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
    // Create dev Info data
    const init_info = {
        title: "RocketMerch",
        address: "Moscow, Red Square, 25",
        description: "Brand new engin for ecommerce that will conquer the world."
    };
    if (Info.find().count() === 0) {
        Info.insert(init_info);
        console.log("Added initial info.");
    };
  });