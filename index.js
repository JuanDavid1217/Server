const cors = require('cors')
const express = require('express')

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://JuanDavid1217:JuanDavid%231712@cluster0.m3ei4fv.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
/*async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("fisicoculturismo").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch{
    console.log("Error")
    /*finally {
    console.log("Ya me cerre")
    // Ensures that the client will close when you finish/error
    await client.close();
  }}
}*/
//run().catch(console.dir);
const app = express();
app.use(cors());
app.options('*', cors());

const port = 8080;


app.get('/', (req, res, next) => {
  res.send('Mongo api - CreazyDave');
});

app.get('/reactionsbypublication', async (req, res)=>{
  const publication=req.query.publication
  try{
    client.connect()
    const data={"_id.publication":publication}
    const db = await client.db("fisicoculturismo").collection("reactions_summary").find(data).toArray()
    res.send(db)
  }catch(error){
    res.send({'status':2})
  }

})

app.get('/commentsbypublication', async (req, res)=>{
  const publication=req.query.publication
  try{
    client.connect()
    const data={"publication":publication}
    const db = await client.db("fisicoculturismo").collection("comments_info").find(data).toArray()
    res.send(db)
  }catch(error){
    res.send({'status':2})
  }
})

app.listen(port,  () => 
	console.log('listening on port ' + port
));