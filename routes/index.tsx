import { Head } from "$fresh/runtime.ts";
import { Handler, PageProps } from "$fresh/server.ts";
import { fetchOpenAICompletion } from "../openai.ts";

type Data = {
  prompt: string;
  result: string;
  error: string;
}

export const handler: Handler<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const prompt = url.searchParams.get("prompt") ?? "";

    try {
      const res = await fetchOpenAICompletion(prompt);
      return ctx.render({
        prompt,
        result: res,
        error: "",
      });
    } catch (error) {
      return ctx.render({
        prompt,
        result: "",
        error: error.message,
      });
    }
  },
}

export default function Home({ data }: PageProps<Data>) {
  const { prompt, error, result } = data;

  return (
    <>
      <Head>
        <title>Web AI</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Web AI</h1>

        <form>
          <input value={prompt} type="text" name="prompt" placeholder="Pergunte algo a OpenAI" />
          <button type="submit">Enviar</button>
        </form>

        <p>Resposta:</p>

        <div class="mt-4">
          {result}
        </div>

        <p class="mt-4">
          {error && <div>{error}</div>}
        </p>

      </div>
    </>
  );
}
