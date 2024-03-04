"use client"
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";


export default function MessageTerminal({ authorName }) {
  const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.messages.send);
  const likeMessage = useMutation(api.messages.like);
  const unlikeMessage = useMutation(api.messages.unlike);

  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    // Make sure scrollTo works on button click in Chrome
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [messages]);

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
      <header>
        <h1> EVChat</h1>
        <p>
          Connected as <strong>{authorName}</strong>
        </p>
      </header>
     {messages?.map((message) => {
  
  const alreadyLiked = message.likeAuthors.includes(authorName);

  return (<article
    key={message._id}
    className={`p-4 rounded-lg max-w-lg mb-2 ${message.author === authorName ? "bg-blue-500 text-white ml-auto" : "bg-gray-100"}`}
  >
    <div className="font-bold">{message.author}</div>
    <p className="mt-2">
      {message.body}
      <button
      title={message.likes > 0 && `liked by ${message.likeAuthors.join(', ')}`}
        onClick={async (e) => {
          if(!alreadyLiked){
          await likeMessage({ messageId: message._id, liker: authorName });
        } else {
          await unlikeMessage({ messageId: message._id, liker: authorName });

        }
        }}
        className="inline-flex items-center ml-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {message.likes > 0 && <span className="mr-1" >{message.likes}</span>} 
        🤍
      </button>
    </p>
  </article>)
}

     )}

      <form
  onSubmit={async (e) => {
    e.preventDefault();
    await sendMessage({ body: newMessageText, author: authorName });
    setNewMessageText("");
  }}
  className="flex items-end gap-2 p-4"
>
  <textarea
    value={newMessageText}
    onChange={(e) => setNewMessageText(e.target.value)}
    placeholder="Write a message…"
    className="flex-1 p-2 rounded-md border-2 border-gray-200 resize-none h-24 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
