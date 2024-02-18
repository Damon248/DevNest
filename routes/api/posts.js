const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
const User = require("../../models/User");

// @route POST api/posts
// @desc Create a post
// @access Private

router.post(
  "/",
  [auth, [check("text", "Text is required!").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error!");
    }
  }
);

// @route GET api/posts
// @desc Get all posts
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error!");
  }
});

// @route DELETE api/posts/:id
// @desc Delete post
// @access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check for post owner
    if (post.user.toString() != req.user.id) {
      return res.status(401).json({ notAuthorized: "User not authorized" });
    }
    if (!post) {
      return res.status(404).json({ msg: "No post with this ID" });
    }
    // Remove the post
    await post.deleteOne();
    res.json({ msg: "Post removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error!");
  }
});

// @route PUT api/posts/like/:id
// @desc Like a post
// @access Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has been already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post has already been liked!" });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// @route PUT api/posts/unlike/:id
// @desc Unlike a post
// @access Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if the post hasn't been liked yet
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has been not liked yet!" });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");
  }
});

// @route POST api/comment/:id
// @desc Create a comment
// @access Private

router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required!").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error!");
    }
  }
);

// @route POST api/comment/:id/:comment_id
// @desc Delete a comment
// @access Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  // pull out a comment
  const comment = post.comments.find(
    (comment) => comment.id === req.params.comment_id
  );

  // make sure comment exists
  if (!comment) {
    return res.status(404).json({ msg: "Comment does not exist!" });
  }

  // check user
  if (comment.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "User is not authorized!" });
  }

  // Get remove index
  const removeIndex = post.comments
    .map((comment) => comment.user.toString())
    .indexOf(req.user.id);

  post.comments.splice(removeIndex, 1);
  await post.save();
  res.json(post.comments);
});

module.exports = router;
