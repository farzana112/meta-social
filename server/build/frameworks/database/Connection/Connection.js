"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
// Connection URL
const url = 'mongodb://localhost:27017/?useNewUrlParser=true&useUnifiedTopology=true';
// Database Name
const dbName = 'Meta-Social';
// Create a new MongoClient instance
const client = new mongodb_1.MongoClient(url);
// Connect to the MongoDB server
client.connect().then(() => {
    console.log('Connected successfully to the database');
    // Access the database
    const db = client.db(dbName);
    // Perform database operations
    // ...
    // Close the MongoDB connection
    client.close();
}).catch((err) => {
    console.error('Failed to connect to the database:', err);
});
