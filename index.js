const express = require ('express');
const cors = require ('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;
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
        const itemCollection = client.db("laptopRemove").collection('item') 

        app.get('/product', async (req, res) =>{
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
        app.get('/inventory', async (req, res) =>{
            const query = {};
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        })

        // app.put("/service/:id", async(req, res)=>{
        //     const id = req.params.id;
        //     const data = req.body;
        //     console.log(data,id);
        //     const filter = {_id:ObjectId(id)};
        //     const options = {upset:true};
        //     const updatedoc = {
        //         $set:{
        //             ...data
        //         },
        //     };
        //     const result = await serviceCollection.updateOne(filter,updatedoc,options);
        //     res.send(result);
        // })
        // app.get('/inventory/:id', async(req, res) =>{
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)};
        //     const result = await itemCollection.findOne(query);
        //     res.send(result);
        // })
        // app.delete('/inventory/:id', async(req, res) =>{
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)};
        //     const result = await itemCollection.deleteOne(query);
        //     res.send(result);
        // })

    //    app.post("/inventory", async (req, res) => {
    //        const product = req.body;
    //        if(!product.name || !product.price){
    //            return res.send({success : false, error: "please provide all information"});

    //        }
    //        const result = await itemCollection.insertOne(product);
    //    })

  
    }
    catch (error){
        console.log(error)
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

