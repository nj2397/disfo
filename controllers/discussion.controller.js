const Discussion = require("../models/discussion.model");

const findDiscussionById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Discussion.findById(id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: `Discussion with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: "Could not fetch this discussion", id });
  }
};

const findDiscussionsByUser = async (req, res) => {
  try {
    const { username } = req.params;
    const result = await Discussion.find({ author: username });
    if (result.length) {
      res.json(result);
    } else {
      res
        .status(404)
        .json({ message: `No discussions found for user: ${username}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not fetch discussions of this user", username });
  }
};

const getAllDiscussions = async (req, res) => {
  try {
    const discussionRes = await Discussion.find({});
    if (discussionRes.length) {
      res.json(discussionRes);
    } else {
      res.status(404).json({ message: "No Discussions found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching discussions", error });
  }
};

const createNewDiscussion = async (req, res) => {
  try {
    const { author, title, content, comments } = req.body;
    const newDiscussion = new Discussion({ author, title, content, comments });
    const result = await newDiscussion.save();
    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({
        message: "Could not create new discussion",
        title: req.body.title,
        reason: "Already Exists in DB",
      });
    } else {
      res.status(500).json({
        message: "Failed to create new user",
        title: req.body.title,
        error,
      });
    }
  }
};

const addNewComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, content } = req.body;
    const newComment = { author, content };
    const result = await Discussion.findOneAndUpdate(
      { _id: id },
      { $push: { comments: newComment } },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add comment to this discussion",
      discussion_id: id,
      error,
    });
  }
};

const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const { author } = req.body;
    const result = await Discussion.findOneAndDelete({ _id: id, author });
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete this discussion",
      discussion_id: id,
      error,
    });
  }
};

const updateDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const { author } = req.body;
    const result = await Discussion.findOneAndUpdate(
      { _id: id, author },
      req.body,
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete this discussion",
      discussion_id: id,
      error,
    });
  }
};

module.exports = {
  findDiscussionById,
  findDiscussionsByUser,
  createNewDiscussion,
  getAllDiscussions,
  addNewComment,
  deleteDiscussion,
  updateDiscussion,
};
