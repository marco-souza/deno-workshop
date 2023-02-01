import "env-loader"

export async function fetchOpenAICompletion(prompt: string) {
  const url = "https://api.openai.com/v1/engines/davinci/completions";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
    },
    body: JSON.stringify({
      prompt,
      max_tokens: 300,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }),
  });

  const data = await res.json();
  console.log(data)
  return data.choices[0].text;
}
