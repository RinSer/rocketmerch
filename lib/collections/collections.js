// Collection to store Products data
Products = new Mongo.Collection('products');

// Collection to store Orders data
Orders = new Mongo.Collection('orders');

// Collection to store Info data
Info = new Mongo.Collection('info');

// Collections to store image files
const imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
	stores: [imageStore]
});