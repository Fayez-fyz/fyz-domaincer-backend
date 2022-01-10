import express from "express";
import formidable from "express-formidable";

const router = express.Router()

//from middlewares
import { requiresSignin, canEditDeletePost, isAdmin } from "../middlewares";

import {
  createPost,
  uploadImage,
  postByUser,
  userPost,
  updatePost,
  deletePost,
  apply,
  posts,
//   getPost,
} from "../controllers/post";

router.post("/create-post", requiresSignin, isAdmin, createPost);
router.post(
  "/upload-image",
  requiresSignin,
  isAdmin,
  formidable({ maxFileSize: 10 * 1024 * 1024 }),
  uploadImage
);

router.get("/user-posts", requiresSignin, isAdmin, postByUser);
router.get("/user-post/:_id", requiresSignin, isAdmin, userPost);
router.put(
  "/update-post/:_id",
  requiresSignin,
  isAdmin,
  canEditDeletePost,
  updatePost
);
router.delete(
  "/delete-post/:_id",
  requiresSignin,
  isAdmin,
  canEditDeletePost,
  deletePost
);
router.get("/posts", posts);
router.put("/apply", requiresSignin, apply);

module.exports = router;