import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { getChatSystemPrompt } from '$lib/i18n/chat-system';
import type { Locale } from '$lib/i18n/types';

function jsonError(status: number) {
  return new Response(JSON.stringify({ error: 'Chat service unavailable' }), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const apiKey = env.ANTHROPIC_API_KEY ?? process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('Chat API: ANTHROPIC_API_KEY is not set');
      return jsonError(503);
    }

    const { messages, locale = 'fr' } = await request.json();
    const chatLocale: Locale = locale === 'en' ? 'en' : 'fr';

    const apiMessages = (Array.isArray(messages) ? messages : [])
      .filter((m: { role: string; content: string }) => m.content?.trim())
      .slice(-6)
      .map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content
      }));

    if (apiMessages.length === 0) {
      return jsonError(400);
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1000,
        stream: true,
        system: getChatSystemPrompt(chatLocale),
        messages: apiMessages
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Anthropic API error:', response.status, errorBody);
      return jsonError(503);
    }

    if (!response.body) {
      return jsonError(503);
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  } catch (err) {
    console.error('Chat handler error:', err);
    return jsonError(503);
  }
};