"use server";

import { getTweet } from "react-tweet/api";
import OpenAI from "openai";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function buildTweetThread(lastTweetId) {
  let thread = {
    text: "",
    tweets: {},
  };

  let currentTweetId = lastTweetId;

  while (true) {
    const tweet = await getTweet(currentTweetId);
    const { text, id_str, in_reply_to_status_id_str } = tweet;

    thread.tweets[id_str] = {
      text,
      replyTo: in_reply_to_status_id_str,
    };

    thread.text = text + thread.text;

    if (!in_reply_to_status_id_str) {
      thread.tweets[id_str] = {
        text,
        replyTo: "tweet starter",
      };
      break;
    }

    currentTweetId = in_reply_to_status_id_str;
  }

  return thread;
}

export async function createSummary(_prevState, formData) {
  const sessionId = cookies().get("sessionId")?.value;
  const threadLink = formData.get("thread-link");
  const parts = threadLink.split("/");
  const id = parts[parts.length - 1];

  const thread = await buildTweetThread(id);
  const { text, tweets } = thread;

  let threadStarterLink = null;
  for (const key in tweets) {
    if (tweets[key].replyTo === "tweet starter") {
      threadStarterLink = key;
      break;
    }
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            text: "Summarize a long Twitter thread by identifying and extracting the most important points. \n\nAnalyze the entire thread, focusing on recurring themes, key arguments, and any conclusions. Consider the intent and tone of the original poster to adequately capture the essence of the conversation.\n\n# Steps\n\n1. **Read the Thread:** Begin by reading the entire thread to understand the context and overall message.\n2. **Identify Key Points:** Look for repeated topics, notable statements, or clearly important information.\n3. **Organize Information:** Group similar ideas and themes together to form a cohesive summary.\n4. **Summarize Succinctly:** Write a concise summary that reflects the major points without unnecessary detail.\n\n# Output Format\n1. Give a title of the summary with bold and h1 in markdown format\n2. Provide the summary as a bullet point or paragraph focusing on clarity and coherence. The summary should range from 3 to 5 sentences, capturing the essence of the thread.\n3. The language in the summary you make must be the same as the language in the Twitter thread, for example, if I send a tweet post in Indonesian then you must summarize it in Indonesian.\n\n# Notes\n\n- Maintain the original meaning and intent of the posts.\n- Exclude minor details unimportant to the general message unless they are crucial to understanding key points.\n- Consider the tone and style of the original content if relevant to the message.\n- Be mindful of context-switching within tweets if they span multiple topics.\n- Use the appropriate markdown format, title use heading 1, bullet point use -\n\n",
            type: "text",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            text,
            type: "text",
          },
        ],
      },
    ],
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "text",
    },
  });

  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  const newSummary = await prisma.summary.create({
    data: {
      summary: response.choices[0].message.content,
      thread_starter_link_id: threadStarterLink,
      userId: session.userId,
    },
  });

  redirect(`/all-summaries/${newSummary.id}`);
}
