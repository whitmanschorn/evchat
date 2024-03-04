"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState, useRef } from "react";
import { faker } from "@faker-js/faker";
import Link from "next/link";

export default function MessageTerminal({ authorName }) {
  const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.messages.send);
  const likeMessage = useMutation(api.messages.like);
  const unlikeMessage = useMutation(api.messages.unlike);
  const chatEndRef = useRef(null);

  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }, 0);
  }, [messages]);

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
      <header>
        <Link href="/">
          <h1 className="text-2xl">EVChat</h1>
        </Link>
        <p>
          Connected as <strong>{authorName}</strong>
        </p>
      </header>
      <div
        ref={chatEndRef}
        className="h-[70vh] overflow-auto rounded-lg border border-gray-200 mt-2 bg-gray-300 p-10"
      >
        {messages?.map((message) => {
          const alreadyLiked = message.likeAuthors.includes(authorName);

          return (
            <article
              key={message._id}
              className={`p-4 rounded-lg max-w-lg mb-2 ${message.author === authorName ? "bg-blue-500 text-white ml-auto" : "bg-gray-100"}`}
            >
              <div className="font-bold">{message.author}</div>
              <p className="mt-2">
                {message.body}
                <button
                  title={
                    message.likes > 0 &&
                    `liked by ${message.likeAuthors.join(", ")}`
                  }
                  onClick={async (e) => {
                    if (!alreadyLiked) {
                      await likeMessage({
                        messageId: message._id,
                        liker: authorName,
                      });
                    } else {
                      await unlikeMessage({
                        messageId: message._id,
                        liker: authorName,
                      });
                    }
                  }}
                  className={`inline-flex items-center ml-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${message.likes > 0 ? "opacity-100" : "opacity-30 group-hover:opacity-100"}`}
                >
                  {message.likes > 0 && (
                    <span className="mr-1">{message.likes}</span>
                  )}
                  🤍
                </button>
              </p>
            </article>
          );
        })}
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await sendMessage({ body: newMessageText, author: authorName });
          setNewMessageText("");
        }}
        className="flex items-end gap-2 p-4 h-24"
      >
        <textarea
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          placeholder="Write a message…"
          className="flex-1 p-2 rounded-md border-2 border-gray-200 resize-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          rows="1"
        ></textarea>
        <button
          type="submit"
          disabled={!newMessageText}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </main>
  );
}
