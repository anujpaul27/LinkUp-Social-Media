require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());


function VerifyToken (req,res,next)
{
  const token = req.cookies?.token;
  if (!token)
  {
    return res.status(401).send("Do not have a access token.")
  }

  jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
    if (err)
    {
      return res.status(403).send("Forbiden User.")
    }
    req.user  = decode
    next()
  })
}

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.y4twyvs.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const UserCollection = client.db("LinkUp").collection("users");
    const PostCollection = client.db("LinkUp").collection("posts");
    const followingFollowersCollection = client
      .db("LinkUp")
      .collection("friends");

    // JWT Authentication
    app.post('/jwt',(req,res)=>{
      const {uid} = req.body;
      const payloader = {uid}
      const token = jwt.sign(payloader,process.env.JWT_SECRET,{expiresIn: '1h'})
      res.cookie('token',token,{
        httpOnly: true,
        secure: false
      })
      .send({message: 'Token Create Success.'})
    })

    // Post User
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await UserCollection.insertOne(user);
      res.send(result);
    });

    // Find Specific user with a uid
    app.get("/users/:uid", async (req, res) => {
      const uid = req.params.uid;
      const query = { uid: uid };
      const result = await UserCollection.findOne(query);
      if (result) {
        res.send(result);
      } else {
        res.send({ message: "user not found." });
      }
    });

    // Get All User
    app.get("/users",VerifyToken, async (req, res) => {
      try {
        const result = await UserCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.send({ message: "Server Error from Find all user." });
      }
    });

    // Update User Specific info
    app.patch("/users/:uid", async (req, res) => {
      try {
        const uid = req.params.uid;
        if (uid !== req.user.uid)
        {
          return res.status(403).send({message: 'Error!. Forbiden User.'})
        }
        const updateUser = req.body;
        const result = await UserCollection.updateOne(
          { uid: uid },
          { $set: updateUser },
          { upsert: true }
        );
        res.send(result);
      } catch (error) {
        res.send({ message: "Server error from update profile info" });
      }
    });

    // Post a create post
    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await PostCollection.insertOne(post);
      res.send(result);
    });

    // Get All post
    app.get(`/post`, async (req, res) => {
      const posts = await PostCollection.find().sort({ _id: -1 }).toArray();
      res.send(posts);
    });

    // Get post for specific uid
    app.get("/post/:uid", async (req, res) => {
      const uid = req.params.uid;
      const result = await PostCollection.find({ uid })
        .sort({ _id: -1 })
        .toArray();
      res.send(result);
    });

    // Post Following Followers
    app.post("/following", async (req, res) => {
      const obj = req.body;
      const result = await followingFollowersCollection.insertOne(obj);
      res.send(result);
    });

    // Update following
    app.patch("/following/:uid", async (req, res) => {
      const uid = req.params.uid;
      const obj = req.body;
      const result = await followingFollowersCollection.updateOne(
        { uid: uid }, // filter
        { $addToSet: { following: obj.FollowingUserUid } } //Update
      );
      res.send(result);
    });

    // Get Following
    app.get("/following/:uid", async (req, res) => {
      const uid = req.params.uid;
      const result = await followingFollowersCollection.findOne({ uid });
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
