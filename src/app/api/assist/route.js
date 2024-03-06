import OpenAI from "openai";
import { NextResponse, NextRequest } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  dangerouslyAllowBrowser: true,
});

export const POST = async (request, response) => {
  const { userMessage } = await request.json();

  // ==========  Step 1: Create a Thread
  const thread = await openai.beta.threads.create();
  //Step 2: Add a Message to a Thread
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: userMessage,
  });
  //Step 3: Run the Assistant
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: process.env.ASSISTANT_ID,
  });

  const checkStatus = async (threadId, runId) => {
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    if (runStatus.status === "completed") {
      let messages = await openai.beta.threads.messages.list(thread.id);
      const unswear = messages.data.filter((el) => el.role === "assistant");

      console.log(unswear[0].content[0].text.value);
      return unswear[0].content[0].text.value;
    } else {
      return new Error("Run is not completed");
    }
  };
  let data = null;

  data = await checkStatus(thread.id, run.id);
  console.log("sdfasd");
  return NextResponse.json({ resMess: data });
};
