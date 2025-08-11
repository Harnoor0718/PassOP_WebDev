const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, ObjectId } = require('mongodb'); 
const bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config()

// App setup
const app = express()
const port = 3000 

// Middleware
app.use(bodyparser.json())
app.use(cors())

// MongoDB connection
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = process.env.DB_NAME;

// Connect to MongoDB
async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Connect when server starts
connectToMongo();

// Get all the passwords
app.get('/', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    } catch (error) {
        console.error('Error fetching passwords:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch passwords' });
    }
})

// Save a password
app.post('/', async (req, res) => { 
    try {
        const password = req.body;
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.insertOne(password);
        res.json({success: true, result: findResult});
    } catch (error) {
        console.error('Error saving password:', error);
        res.status(500).json({ success: false, error: 'Failed to save password' });
    }
})

// Delete a password by id
app.delete('/', async (req, res) => { 
    try {
        const password = req.body;
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.deleteOne(password);
        res.json({success: true, result: findResult});
    } catch (error) {
        console.error('Error deleting password:', error);
        res.status(500).json({ success: false, error: 'Failed to delete password' });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})