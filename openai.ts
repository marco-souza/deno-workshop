import "env-loader"
import { Configuration, OpenAIApi } from "npm:openai";

const configuration = new Configuration({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

const openai = new OpenAIApi(configuration);

export async function fetchOpenAICompletion(prompt: string) {
  const response = await openai.createCompletion({
    prompt,
    model: "text-davinci-003",
    temperature: 0,
    max_tokens: 300,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return response.data.choices[0].text;
}
