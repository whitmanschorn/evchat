import { api } from "./_generated/api";
import { internalMutation, type MutationCtx } from "./_generated/server";

const seedMessages = [
["Bob", "Good day, Mrs. A.", 0],
["Alice", "Why, same to you.", 100],
["Bob", "So nice to run into you.", 200],
["Alice", "That echoes my thoughts.", 300],
["Bob", "And it's a perfect day for a walk. I think I'll be walking home soon.", 400],
["Alice", "Oh, really? I guess there's nothing better for you than walking.", 500],
["Bob", "Incidentally, you're looking in very fine fettle these days, I must say.", 600],
["Alice", "Thank you very much.", 700],
] as const;

export default internalMutation({
  handler: async (ctx: MutationCtx) => {
    // If this project already has a populated database, do nothing
    const anyMessage = await ctx.db.query("messages").first();
    if (anyMessage) return;

    // If not, post each of the seed messages with the given delay
    let totalDelay = 0;
    for (const [author, body, delay] of seedMessages) {
      totalDelay += delay;
      await ctx.scheduler.runAfter(totalDelay, api.messages.send, {
        author,
        body,
      });
    }
  },
});
