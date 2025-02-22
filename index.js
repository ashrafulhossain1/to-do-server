const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()


const port = process.env.PORT || 5000;
const app = express();

// mid

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.jkfsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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


    const userCollection = client.db("taskManagementDB").collection("users");
    const todoCollection = client.db("taskManagementDB").collection("todos");

    // Create a new user

    // get users
    app.get('/users', async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    })

    // Users Collection related apis
    app.post('/users', async (req, res) => {
      const userInfo = req.body;
      // console.log(userInfo)

      // insert email and name if user don't exist in database
      const query = { email: userInfo.email }
      const existingUser = await userCollection.findOne(query)
      if (existingUser) {
        return res.send({ message: 'user already exist', existingUser })
      }
      // new user data add in userCollection
      const newUser = {
        name: userInfo.name,
        email: userInfo?.email,
      }
      const result = await userCollection.insertOne(newUser)
      res.send(result)
    })


    //  add todo post
    app.post('/addTodo', async (req, res) => {
      const todoInfo = req.body;
      const result = await todoCollection.insertOne(todoInfo)
      res.send(result)
    })

    // todo get
    app.get('/todos/:email', async (req, res) => {
      const cursor = todoCollection.find();
      const todos = await cursor.toArray();
      res.send(todos);
    })

    // update single todo
    app.patch('/todos/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      console.log(data)
      console.log("ID",id)
      const query = { _id: new ObjectId(id) }
      const updateDoc = {
        $set: {
          title: data.title,
          description: data.description,
          category: data.category,
        },
      };
      const result = await todoCollection.updateOne(query, updateDoc)
      res.send(result)
    })

    // delete single todo
    app.delete('/todos/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id)
      const query = { _id: new ObjectId(id) }
      const result = await todoCollection.deleteOne(query)
      console.log(result
      )
      res.send(result)
    })


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send("assignment Job task server is running...");
})
app.listen(port, () => {
  console.log(`server running on PORT: ${port}`);
})
