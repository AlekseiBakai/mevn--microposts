const express = require("express");
const monodb = require("mongodb");

const router = express.Router();

//  Get Posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await monodb.MongoClient.connect(
    "mongodb://bakai:abc123@ds125693.mlab.com:25693/mevn_microposts",
    {
      useNewUrlParser: true
    }
  );

  return client.db("mevn_microposts").collection("posts");
}

module.exports = router;
