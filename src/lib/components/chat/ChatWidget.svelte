<script lang="ts">
  import { onMount } from 'svelte';
  import { marked } from 'marked';

  let mounted = false;
  let showButton = false;

  let isOpen = false;
  let isClosing = false;
  let messages: { role: 'user' | 'assistant'; content: string }[] = [];
  let input = '';
  let loading = false;
  let messagesContainer: HTMLElement;
  let chatInput: HTMLTextAreaElement;

  $: if (isOpen && !isClosing && chatInput) {
    setTimeout(() => chatInput.focus(), 100);
  }

  onMount(() => {
    mounted = true;
    setTimeout(() => { showButton = true; }, 2200);
  });

  function toggleChat() {
    if (isOpen) {
      isClosing = true;
      setTimeout(() => {
        isOpen = false;
        isClosing = false;
      }, 220);
    } else {
      isOpen = true;
      if (messages.length === 0) {
        messages = [{
          role: 'assistant',
          content: 'Bonjour ! Je suis SaheL\'IA. Pose-moi tes questions sur la Vision Mali 2063, la SNEDD, les projets structurants, ou Sahel Analytics.'
        }];
      }
    }
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    input = '';
    messages = [...messages, { role: 'user', content: userMessage }];
    loading = true;
    scrollToBottom();

    messages = [...messages, { role: 'assistant', content: '' }];
    const assistantIndex = messages.length - 1;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages.slice(0, -1) })
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                fullContent += parsed.delta.text;
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }

      loading = false;
      const words = fullContent.split(/(\s+)/);
      let displayed = '';

      for (const word of words) {
        displayed += word;
        messages[assistantIndex] = {
          ...messages[assistantIndex],
          content: displayed
        };
        messages = [...messages];
        scrollToBottom();

        const isSpace = /^\s+$/.test(word);
        if (!isSpace) {
          await sleep(35 + Math.random() * 20);
        }
      }

    } catch (error) {
      messages[assistantIndex] = {
        ...messages[assistantIndex],
        content: 'Une erreur est survenue. Veuillez réessayer.'
      };
      messages = [...messages];
      loading = false;
    }
  }

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function scrollToBottom() {
    setTimeout(() => {
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 50);
  }

  function renderMarkdown(content: string): string {
    return marked.parse(content) as string;
  }
</script>

{#if mounted}

  <!-- FLOATING BUTTON -->
  {#if showButton}
    <button
      class="chat-toggle"
      class:button-enter={showButton}
      on:click={toggleChat}
      aria-label="Ouvrir l'assistant"
    >
      {#if isOpen || isClosing}
        <span class="chat-toggle-icon">✕</span>
      {:else}
        <span class="chat-toggle-icon">
          <img src="/logo_sahelIA2.png" alt="SahelIA assistant" class="chat-avatar-icon"/>
        </span>
        <span class="chat-toggle-label">Demande à SaheL'IA</span>
      {/if}
    </button>
  {/if}

  <!-- CHAT PANEL -->
  {#if isOpen || isClosing}
    <div class="chat-panel" class:closing={isClosing}>

      <!-- Header -->
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-avatar">
            <img src="/logo_sahelIA2.png" alt="SahelIA assistant" class="chat-avatar-icon"/>
          </div>
          <div>
            <p class="chat-name">SaheL'IA</p>
            <p class="chat-tagline">Ton assistant pour comprendre la Vision Mali 2063</p>
          </div>
        </div>
        <button class="chat-close" on:click={toggleChat}>✕</button>
      </div>

      <!-- Messages -->
      <div class="chat-messages" bind:this={messagesContainer}>
        {#each messages as message}
          <div class="chat-message {message.role}">
            {#if message.role === 'assistant' && message.content === '' && loading}
              <div class="chat-typing">
                <span></span><span></span><span></span>
              </div>
            {:else if message.role === 'assistant'}
              <div class="markdown">{@html renderMarkdown(message.content)}</div>
            {:else}
              <p>{message.content}</p>
            {/if}
          </div>
        {/each}
      </div>

      <!-- Input -->
      <div class="chat-input-area">
        <textarea
          bind:value={input}
          bind:this={chatInput}
          on:keydown={handleKeydown}
          placeholder="Pose ta question..."
          rows="1"
          class="chat-input"
        ></textarea>
        <button
          class="chat-send"
          on:click={sendMessage}
          disabled={!input.trim() || loading}
        >
          →
        </button>
      </div>

      <p class="chat-footer">Powered by Sahel Analytics</p>

    </div>
  {/if}

{/if}

<style>
  /* --- TOGGLE BUTTON --- */
  .chat-toggle {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
    background: var(--color-blue-deep);
    color: white;
    border: none;
    padding: 0.75rem 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 20px rgba(48, 88, 140, 0.4);
    opacity: 0;
    transform: translateY(12px) scale(0.95);
  }

  .chat-toggle:hover {
    background: var(--color-night);
    box-shadow: 0 6px 24px rgba(48, 88, 140, 0.5);
  }

  .chat-toggle.button-enter {
    animation: buttonEntrance 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
  }

  @keyframes buttonEntrance {
    from {
      opacity: 0;
      transform: translateY(12px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .chat-toggle-icon {
    font-size: 1rem;
    line-height: 1;
    display: flex;
    align-items: center;
  }

  .chat-avatar-icon {
    width: 1.2rem;
    height: 1.2rem;
  }

  .chat-toggle-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  /* --- PANEL --- */
  .chat-panel {
    position: fixed;
    bottom: 5.5rem;
    right: 2rem;
    z-index: 999;
    width: 480px;
    max-height: 680px;
    background: white;
    border: 1px solid rgba(115, 101, 85, 0.15);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform-origin: bottom right;
    animation: panelOpen 0.25s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
  }

  .chat-panel.closing {
    animation: panelClose 0.22s ease-in forwards;
  }

  @keyframes panelOpen {
    from {
      opacity: 0;
      transform: translateY(16px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes panelClose {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(16px) scale(0.96);
    }
  }

  /* --- HEADER --- */
  .chat-header {
    background: var(--color-night);
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .chat-header-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .chat-avatar {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .chat-name {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 700;
    color: white;
    letter-spacing: 0.1em;
  }

  .chat-tagline {
    font-family: var(--font-mono);
    font-size: 0.58rem;
    color: white;
    opacity: 0.7;
    letter-spacing: 0.08em;
  }

  .chat-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    font-size: 0.9rem;
    padding: 0.25rem;
    transition: color 0.2s;
  }

  .chat-close:hover {
    color: white;
  }

  /* --- MESSAGES --- */
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: #f9fbfa;
    overscroll-behavior: contain;
  }

  .chat-message {
    max-width: 88%;
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    line-height: 1.6;
    animation: messageIn 0.2s ease forwards;
  }

  @keyframes messageIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .chat-message p {
    margin: 0;
    color: inherit;
  }

  .chat-message.user {
    background: var(--color-blue-deep);
    color: white;
    align-self: flex-end;
  }

  .chat-message.assistant {
    background: white;
    color: var(--color-night);
    align-self: flex-start;
    border: 1px solid rgba(115, 101, 85, 0.12);
    max-width: 95%;
  }

  /* --- MARKDOWN --- */
  .markdown :global(p) {
    margin: 0 0 0.5rem;
    line-height: 1.65;
  }

  .markdown :global(p:last-child) {
    margin-bottom: 0;
  }

  .markdown :global(strong) {
    font-weight: 700;
    color: var(--color-night);
  }

  .markdown :global(ul),
  .markdown :global(ol) {
    margin: 0.5rem 0;
    padding-left: 1.25rem;
  }

  .markdown :global(li) {
    margin-bottom: 0.3rem;
    line-height: 1.5;
  }

  .markdown :global(h1),
  .markdown :global(h2),
  .markdown :global(h3) {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--color-night);
    margin: 0.75rem 0 0.35rem;
  }

  .markdown :global(h1:first-child),
  .markdown :global(h2:first-child),
  .markdown :global(h3:first-child) {
    margin-top: 0;
  }

  .markdown :global(code) {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    background: rgba(115, 101, 85, 0.08);
    padding: 0.1rem 0.3rem;
  }

  /* --- TYPING INDICATOR --- */
  .chat-typing {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 0.25rem 0;
  }

  .chat-typing span {
    width: 6px;
    height: 6px;
    background: var(--color-brown);
    border-radius: 50%;
    opacity: 0.4;
    animation: typing 1.2s infinite;
  }

  .chat-typing span:nth-child(2) { animation-delay: 0.2s; }
  .chat-typing span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes typing {
    0%, 100% { opacity: 0.4; transform: translateY(0); }
    50% { opacity: 1; transform: translateY(-3px); }
  }

  /* --- INPUT --- */
  .chat-input-area {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-top: 1px solid rgba(115, 101, 85, 0.1);
    background: white;
    flex-shrink: 0;
  }

  .chat-input {
    flex: 1;
    border: 1px solid rgba(115, 101, 85, 0.2);
    padding: 0.6rem 0.75rem;
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: var(--color-night);
    resize: none;
    outline: none;
    line-height: 1.5;
    background: #f9fbfa;
    transition: border-color 0.2s;
  }

  .chat-input:focus {
    border-color: var(--color-blue-deep);
  }

  .chat-send {
    background: var(--color-blue-deep);
    color: white;
    border: none;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1rem;
    flex-shrink: 0;
    transition: background 0.2s;
  }

  .chat-send:hover:not(:disabled) {
    background: var(--color-night);
  }

  .chat-send:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* --- FOOTER --- */
  .chat-footer {
    font-family: var(--font-mono);
    font-size: 0.55rem;
    color: var(--color-brown);
    opacity: 0.5;
    text-align: center;
    padding: 0.5rem;
    background: white;
    border-top: 1px solid rgba(115, 101, 85, 0.08);
    flex-shrink: 0;
  }

  /* --- RESPONSIVE --- */
  /* Mobile portrait */
@media (max-width: 520px) {
  .chat-panel {
    width: calc(100vw - 2rem);
    right: 1rem;
    bottom: 5rem;
    max-height: calc(100vh - 7rem);
  }

  .chat-toggle {
    right: 1rem;
    bottom: 1rem;
  }
}

/* Mobile landscape */
@media (max-height: 500px) and (orientation: landscape) {
  .chat-panel {
    bottom: 1rem;
    max-height: calc(100vh - 2rem);
    width: 360px;
    right: 1rem;
  }

  .chat-toggle {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>