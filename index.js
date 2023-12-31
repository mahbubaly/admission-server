const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000




//middleware
const corsConfig = {
    origin: '',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DS_USER}:${process.env.DS_PASS}@cluster0.xej4se9.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const collegeCollections = client.db("CollegeCollections").collection("Colleges");
        const ReviewCollections = client.db("CollegeCollections").collection("Reviews");



        app.get('/colleges', async (req, res) => {
            const result = await collegeCollections.find().toArray();

            res.send(result);


        })



        app.get('/reviews', async (req, res) => {
            const result = await ReviewCollections.find().toArray();
            res.send(result);
        })



        app.get('/colleges/:id', async (req, res) => {
           
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await collegeCollections.findOne(query);
            res.send(result);
            
        })







        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})