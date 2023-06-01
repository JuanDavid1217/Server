const cors = require('cors')
const express = require('express')

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://JuanDavid1217:JuanDavid%231712@cluster0.m3ei4fv.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const app = express();
app.use(cors());
app.options('*', cors());

const port = 8080;

app.get('/', (req, res, next) => {
  res.send('Mongo api - CreazyDave');
});
app.get('/reactionsbypublication', (req, res, next)=>{
  const publication=req.query.publication
  console.log(publication)
  try{
    client.connect();
    const data=client.db("fisicoculturismo").collection("reactions_summary").find({'publication':publication['publication']})
    res.send(data)
  }catch(error){
    res.send({'error':'hay un error'+error})
  }finally{
    conexion.close();
  }
})
app.listen(port,  () => 
	console.log('listening on port ' + port
));

