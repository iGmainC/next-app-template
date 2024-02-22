import { OpenAIStream } from 'ai';
import OpenAI from 'openai';
import { ChatCompletionCreateParams } from 'openai/resources/chat/completions.mjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
function getAuthToken(request: Request) {
  return request.headers.get('Authorization');
}

// import { Configuration, OpenAIApi } from 'openai';

export async function POST(request: Request) {
  let requestData = (await request.json()) as ChatCompletionCreateParams;
  const openai = new OpenAI({
    apiKey: 'sk-Y9JDJTvwvIvQKXY7385cC7E96eAb47B9A7D71f37C136F5D3',
    baseURL: 'https://key.langcore.cn/v1',
  });
  if (requestData.stream) {
    let responseStream = new TransformStream();
    setTimeout(async () => {
      const writer = responseStream.writable.getWriter();
      try {
        const openaiRes = await openai.chat.completions.create(requestData);
        for await (const chunk of openaiRes) {
          writer.write(`data: ${JSON.stringify(chunk)}\n\n`);
        }
        writer.write('data: [DONE]\n\n');
      } finally {
        writer.close();
      }
    });
    return new Response(responseStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache, no-transform',
      },
    });
  } else {
    const openaiRes = await openai.chat.completions.create(requestData);
    return new Response(JSON.stringify(openaiRes), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
// export async function POST(request: Request) {
//   let innerKey = getAuthToken(request);

//   const openai = new OpenAI({
//     apiKey: 'sk-Y9JDJTvwvIvQKXY7385cC7E96eAb47B9A7D71f37C136F5D3',
//     baseURL: 'https://key.langcore.cn/v1',
//   });
//   // const { messages } = await request.json();
//   const resp = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     stream: true,
//     messages: [{ role: 'user', content: '你好' }],
//   });

//   const stream = OpenAIStream(resp);
//   let response = new StreamingTextResponse(stream);
//   return response;
// }
