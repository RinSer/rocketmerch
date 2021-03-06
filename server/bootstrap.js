Meteor.startup(function () {
    // Search indeces
    Meteor.users._ensureIndex({
        "name":"text",
        "address":"text"
    });

    Products._ensureIndex({
        "category":"text",
        "title":"text"
    });

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
            client: true,
            address: "test1 address"
        },
        {
            name: "test2",
            email: "test2@test.com",
            password: "123",
            client: true,
            address: "test2 address"
        },
        {
            name: "test3",
            email: "test3@test.com",
            password: "123",
            client: true,
            address: "test3 address"
        },
        {
            name: "test4",
            email: "test4@test.com",
            password: "123",
            client: true,
            address: "test4 address"
        },
        {
            name: "test5",
            email: "test5@test.com",
            password: "123",
            client: true,
            address: "test5 address"
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
            price: 101.01,
    		img: "/600x400.png",
            quantity: 5,
            createdAt: new Date(),
    	},
    	{
    		category: "one",
    		title: "Two_one",
    		description: "Your product description goes here.",
            price: 102.02,
    		img: "/600x400.png",
            quantity: 4,
            createdAt: new Date(),
    	},
    	{
    		category: "one",
    		title: "Three_one",
    		description: "Your product description goes here.",
            price: 103.03,
    		img: "/600x400.png",
            quantity: 3,
            createdAt: new Date(),
    	},
    	{
    		category: "one",
    		title: "Four_one",
    		description: "Your product description goes here.",
            price: 104.04,
    		img: "/600x400.png",
            quantity: 2,
            createdAt: new Date(),
    	},
    	{
    		category: "one",
    		title: "Five_one",
    		description: "Your product description goes here.",
            price: 105.05,
    		img: "/600x400.png",
            quantity: 12,
            createdAt: new Date(),
    	},
    	{
    		category: "two",
    		title: "One_two",
    		description: "Your product description goes here.",
            price: 201.01,
    		img: "/600x400.png",
            quantity: 1,
            createdAt: new Date(),
    	},
    	{
    		category: "two",
    		title: "Two_two",
    		description: "Your product description goes here.",
            price: 202.02,
    		img: "/600x400.png",
            quantity: 0,
            createdAt: new Date(),
    	},
    	{
    		category: "two",
    		title: "Three_two",
            price: 203.03,
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
    // Create orders data
    const product1_id = Products.findOne({title: "One_one"})._id;
    const product2_id = Products.findOne({title: "Two_one"})._id;
    const product3_id = Products.findOne({title: "Three_one"})._id;
    const product4_id = Products.findOne({title: "One_two"})._id;
    const product5_id = Products.findOne({title: "Two_two"})._id;
    const customer1_id = Meteor.users.findOne({name: "test1"})._id;
    const customer2_id = Meteor.users.findOne({name: "test2"})._id;
    const customer3_id = Meteor.users.findOne({name: "test3"})._id;
    const init_orders = [
        {
            client: customer1_id,
            address: "index, state, city, street, 25",
            products: [
                {
                    title:product1_id,
                    quantity: 2
                }
            ],
            status: "new",
            createdAt: new Date(),
        },
        {
            client: customer2_id,
            address: "index, state, city, street, 25",
            products: [
                {
                    title:product2_id,
                    quantity: 1
                },
                {
                    title:product3_id,
                    quantity: 1
                }
            ],
            status: "new",
            createdAt: new Date(),
        },
        {
            client: customer3_id,
            address: "index, state, city, street, 25",
            products: [
                {
                    title: product4_id,
                    quantity: 1
                },
                {
                    title: product5_id,
                    quantity: 3
                },
                {
                    title: product1_id,
                    quantity: 5
                }
            ],
            status: "new",
            createdAt: new Date(),
        },
        {
            client: customer1_id,
            address: "index, state, city, street, 25",
            products: [
                {
                    title:product2_id,
                    quantity: 1
                },
                {
                    title:product3_id,
                    quantity: 1
                }
            ],
            status: "pending",
            createdAt: new Date(),
        },
        {
            client: customer2_id,
            address: "index, state, city, street, 25",
            products: [
                {
                    title:product2_id,
                    quantity: 1
                },
                {
                    title:product3_id,
                    quantity: 1
                }
            ],
            status: "pending",
            createdAt: new Date(),
        },
        {
            client: customer3_id,
            address: "index, state, city, street, 25",
            products: [
                {
                    title:product2_id,
                    quantity: 1
                },
                {
                    title:product3_id,
                    quantity: 1
                }
            ],
            status: "delivered",
            createdAt: new Date(),
        },
        {
            client: customer1_id,
            address: "index, state, city, street, 25",
            products: [
                {
                    title:product2_id,
                    quantity: 1
                },
                {
                    title:product3_id,
                    quantity: 1
                }
            ],
            status: "delivered",
            createdAt: new Date(),
        }
    ];
    if (Orders.find().count() === 0) {
        _.each(init_orders, function(doc) {
            Orders.insert(doc);
            console.log("Added client "+doc.client+" order.");
        });
    };

});