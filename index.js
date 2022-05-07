const express = require ('express');
const cors = require ('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require ('dotenv').config();

const port = process.env.PORT || 5000;


const app = express();
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h8k01.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
        const productCollection = client.db("laptopStore").collection('product') 

        app.get('/product', async (req, res) =>{
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
  
    }


    finally{

    }
}

run().catch(console.dir);

app.get('/', (req, res) =>{
    res.send('my-laptop-store-server is running')
})


app.listen(port, () =>{
    console.log("listening  the port", port)
})