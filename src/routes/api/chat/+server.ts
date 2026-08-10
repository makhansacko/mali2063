import type { RequestHandler } from './$types';
import { ANTHROPIC_API_KEY } from '$env/static/private';
import { getChatSystemPrompt } from '$lib/i18n/chat-system';
import type { Locale } from '$lib/i18n/types';

export const POST: RequestHandler = async ({ request }) => {
  const { messages, locale = 'fr' } = await request.json();
  const chatLocale: Locale = locale === 'en' ? 'en' : 'fr';

  const apiMessages = messages
    .filter((m: { role: string; content: string }) => m.content?.trim())
    .slice(-6)
    .map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content
    }));

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
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
    return new Response(JSON.stringify({ error: 'Chat service unavailable' }), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    },
  });
};