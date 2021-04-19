// import fs from "fs";
import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import { s3 } from "../middlewares";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: searchingBy, searchingBy, videos });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
  } = req;
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments"); // mongoose schema 에서 다른 model 을 참조하는 항목은 populate를 해야 id 값이 아닌 data 자체가 넘어감
    // console.log(video);
    if (user) {
      console.log(user.id);
      const commentUsers = await Comment.find({ creator: user.id }).populate(
        "creator"
      );
      console.log(commentUsers);
      // for (let i = 0; i < commentUser.comments.length; i++) {
      //   const comment = commentUser.comments[i];
      //   console.log(typeof comment.creator);
      //   console.log(typeof user.id);
      // }
      res.render("videoDetail", {
        pageTitle: video.title,
        video,
        commentUsers,
      });
    } else {
      res.render("videoDetail", { pageTitle: video.title, video });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      req.flash("success", "Video edited");
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Can't edit video");
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description }); // findOneAndUpadate(찾을항목, 바꿀항목)
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const currentPost = await Video.findById(id);
    // const regex = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/;
    const filePath = await currentPost.fileUrl.split("/video/")[1];

    const delFile = {
      Bucket: "healty-pharm-tube/video",
      Key: filePath,
    };
    await s3
      .deleteObject(delFile, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log("The File has been removed", data);
        }
      })
      .promise();

    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      const { fileUrl } = await Video.findOneAndDelete({ _id: id });
      req.flash("success", "Video deleted");
      console.log(fileUrl);
      // (() => {
      //   try {
      //     fs.unlinkSync(fileUrl);
      //     console.log("File is deleted!!");
      //   } catch (error) {
      //     console.log(error);
      //   }
      // })();
    }
  } catch (error) {
    req.flash("error", "Can't delete video");
    console.log(error);
  }
  res.redirect(routes.home);
};

// ------------------------------------- API -----------------------------------------//

// Register Video View
export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200); // rendering 없이 database 접근 후 status code 만 전송
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    // const commentUser = await User.findById(user.id);
    // console.log(commentUser);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
    // commentUser.comments.push(newComment.id);
    // commentUser.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Delete Comment
export const postDeletePost = async (req, res) => {
  const {
    body: { comment },
  } = req;
  try {
    await Comment.findOneAndRemove({ text: comment });
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
