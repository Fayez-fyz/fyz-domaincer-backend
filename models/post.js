import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: {},
      required: true,
    },
    content: {
      type: {},
      required: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      url: String,
      public_id: String,
    },
    // likes: [{ type: ObjectId, ref: "User" }],
    // apply: [
    //   {
    //     names:
    //       {
    //         text: String,
    //         created: { type: Date, default: Date.now },
    //         postedBy: {
    //           type: ObjectId,
    //           ref: "User",
    //         },
    //       },
        
    //     emails:
    //       {
    //         text: String,
    //         created: { type: Date, default: Date.now },
    //         postedBy: {
    //           type: ObjectId,
    //           ref: "User",
    //         },
    //       },
        
    //     mobiles:
    //       {
    //         text: String,
    //         created: { type: Date, default: Date.now },
    //         postedBy: {
    //           type: ObjectId,
    //           ref: "User",
    //         },
    //       },
        
    //     resumes:
    //       {
    //         text: String,
    //         created: { type: Date, default: Date.now },
    //         postedBy: {
    //           type: ObjectId,
    //           ref: "User",
    //         },
    //       },
        
    //     sops:
    //       {
    //         text: String,
    //         created: { type: Date, default: Date.now },
    //         postedBy: {
    //           type: ObjectId,
    //           ref: "User",
    //         },
    //       },
        
    //   },
    // ],
    
    names: [
      {
        name: String,
        created: { type: Date, default: Date.now },
        postedBy: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    emails: [
        {
          email: String,
          created: { type: Date, default: Date.now },
          postedBy: {
            type: ObjectId,
            ref: "User",
          },
        },
      ],
      mobiles: [
        {
            mobile: String,
          created: { type: Date, default: Date.now },
          postedBy: {
            type: ObjectId,
            ref: "User",
          },
        },
      ],
      resumes: [
        {
            resume: String,
          created: { type: Date, default: Date.now },
          postedBy: {
            type: ObjectId,
            ref: "User",
          },
        },
      ],
      sops: [
        {
          sop: String,
          created: { type: Date, default: Date.now },
          postedBy: {
            type: ObjectId,
            ref: "User",
          },
        },
      ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
