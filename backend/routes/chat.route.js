import express from "express";
import Thread from "../models/Thread.model.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

// get all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });

    return res.json({ threads });
  } catch (error) {
    console.log("Error in getting all threads " + error.message);
    return res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// get thread by id
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findById(threadId);

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    return res.json(thread.messages);
  } catch (error) {
    console.log("Error in getting thread by id " + error.message);
    return res.status(500).json({ error: "Failed to fetch thread" });
  }
});

// delete thread by id
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findById(threadId);

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    await Thread.findByIdAndDelete(threadId);

    return res.status(200).json({ success: "Thread deleted successfully" });
  } catch (error) {
    console.log("Error in deleting thread by id " + error.message);
    return res.status(500).json({ error: "Failed to Delete thread" });
  }
});

// post new chat
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    const assistantReply = await getOpenAIAPIResponse(message);

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();

    await thread.save();

    return res.json({ reply: assistantReply });
  } catch (error) {
    console.log("Error in Posting new chat " + error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
