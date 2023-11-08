const express = require('express')
const router = express.Router();
const Post = require('../Models/PostModel')
const {checkAuth} = require("../Middlewares/AuthMiddleware")
const {authorize, userVerification} = require("../Middlewares/AuthMiddleware");
const { ObjectId } =  require("mongodb");


//Get all posts
router.get('',checkAuth, (req,res)=> {
try
{
    //get posts
    Post.find().then((posts)=>{
        res.send(posts).status(200)
     });
} 
catch (error) 
{
    console.error(error); //catch error if failed
}
});

//Get post by id
router.get("/get/:id", checkAuth, async (req, res) => {
    let query = {_id: new ObjectId(req.params.id)};
    let result = await Post.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

//create post
router.post('', checkAuth, async (req, res) =>{
try
{
    // Destructure request body
    const { caption, createdAt } = req.body;


    // Create post
    const post = await Post.create({ caption, createdAt });

    // Return response
    res.status(201).json({
        message: 'Post Created:',
        Post_Info: post   
    });
} 
catch (error) 
{
    console.error(error); //catch error if failed
}
});

//delete post by id
router.delete('/:id', checkAuth, async (req, res)=>{
try
{  
    //Delete post based on post id
   const deleted = await Post.findOneAndDelete({_id: req.params.id})

    if(deleted)
    {
        res.status(200).json({message: "Post Deleted"});
    }
    else
    {
        res.status(200).json({message: "Post Not Found"});
    }

} 
catch (error) 
{
    console.error(error); //catch error if failed
}
});

//Edit post by id
router.patch("/:id", checkAuth, async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates =  {
      $set: {
        caption: req.body.caption,
      }
    };
  
    let result = await Post.updateOne(query, updates);
    res.send(result).status(200);
  });

module.exports = router
