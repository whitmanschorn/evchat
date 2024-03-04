import { query, mutation } from "./_generated/server";
import { api } from "./_generated/api";

import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    // Grab the most recent messages.
    const messages = await ctx.db.query("messages").order("desc").take(10);

    // Use Promise.all to handle asynchronous likes fetching for each message.
    const updatedMessages = await Promise.all(
      messages.map(async (message) => {
        const likes = await ctx.db
          .query("likes")
          .withIndex("byMessageId", (q) => q.eq("messageId", message._id))
          .collect();

        // Tally up the total count of likes
        const likesCount = likes.length;
        const likeAuthors = likes.map((item) => item.liker);
        return {
          ...message,
          likes: likesCount, // Include the likes count
          likeAuthors,
          body: message.body.replaceAll(":)", "😀"), // Replace :) with 😀
        };
      }),
    );

    // Reverse the list to maintain chronological order before returning.
    return updatedMessages.reverse();
  },
});

export const send = mutation({
  args: { body: v.string(), author: v.string() },
  handler: async (ctx, { body, author }) => {
    // Send a new message.
    await ctx.db.insert("messages", { body, author });
  },
});

export const like = mutation({
  args: { liker: v.string(), messageId: v.id("messages") },
  handler: async (ctx, { liker, messageId }) => {
    // Send a new message.
    await ctx.db.insert("likes", { liker, messageId });
  },
});

export const unlike = mutation({
  args: { liker: v.string(), messageId: v.id("messages") },
  handler: async (ctx, { liker, messageId }) => {
    // find the like by this user
    const originalLike = await ctx.db
      .query("likes")
      .withIndex("byMessageId", (q) => q.eq("messageId", messageId))
      .filter((q) => q.eq(q.field("liker"), liker))
      .first();

    if (originalLike) {
      const likeId = originalLike._id;
      console.log("unliking", likeId, originalLike);
      await ctx.db.delete(likeId);
    }
  },
});
