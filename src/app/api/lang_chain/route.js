import OpenAI from "openai";
import axios from "axios";
import { NextResponse } from "next/server";
import * as fs from "fs";

import { filePath } from "../get_categories/route";

export const GET = async () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");

    console.log(JSON.parse(data));

    const splitter = RecursiveJsonSplitter((max_chunk_size = 300));

    const json_chunks = splitter.split_json((json_data = data));
    console.log(json_chunks);

    texts = splitter.split_text((json_data = json_data));
    console.log(texts);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    status: 200,
    message: "Data is successfully saved",
  });
};
