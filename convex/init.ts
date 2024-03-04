import { api } from "./_generated/api";
import { internalMutation, type MutationCtx } from "./_generated/server";

const seedMessages = [
  ["Alice", "Hey there!", 0],
  ["Bob", "What's up? Have a good weekend?", 1000],
  ["Alice", "Yeah! I spent most of it reading about EdgeVanta :)", 1500],
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
