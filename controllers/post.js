import Post from "../models/post";
import User from "../models/users";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const createPost = async (req, res) => {
  const { title, content, image } = req.body;
  if (!content.length) {
    return res.json({
      error: "content is required",
    });
  }
  if (!title.length) {
    return res.json({
      error: "Title is required",
    });
  }
  try {
    const post = new Post({ title, content, image, postedBy: req.user._id });
    post.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.sendstatus(400);
  }
};

export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    console.log("uploaded image url=>", result);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.log(error);
  }
};
export const postByUser = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user._id })
      //   const posts = await Post.find({})
      .populate("postedBy", "_id title content name image")
      .sort({ createdAt: -1 })
      .limit(10);
    // console.log('posts',posts)
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};
export const userPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id)
      .populate("postedBy", "_id name image")
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (req, res) => {
  // console.log("Update post", req.body);
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params._id);
    //remove item from cloudinary
    if (post.image && post.image.public_id) {
      const image = await cloudinary.uploader.destroy(post.image.public_id);
    }
    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const posts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id title content name image")
      .populate('names','_id text names')

      .sort({ createdAt: -1 })
      .limit(50);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};
export const apply = async (req, res) => {
  console.log(req.body);
  try {
    const { postId, name, email, mobile, resume, sop } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
         $push: {
          names: { name: name, postedBy: req.user._id },
          emails: { email: email, postedBy: req.user._id },
          mobiles: { mobile: mobile, postedBy: req.user._id },
          resumes: { resume: resume, postedBy: req.user._id },
          sops: { sop: sop, postedBy: req.user._id },
        },
      },
      { new: true }
    )
      .populate("postedBy", "_id name image")
      .populate("names",'_id text postedBy')
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};
