<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { locale, t } from '$lib/i18n';
  import { pickLang, type SuiviAction, type TrackedProject } from '$lib/data/suivi';
  import { isOverdue } from '$lib/suivi/calc';
  import { formatIsoDate } from '$lib/suivi/format';
  import type { MessageKey } from '$lib/i18n/messages';

  export let actions: SuiviAction[];
  export let projects: TrackedProject[];
  export let short = false;

  const dispatch = createEventDispatcher<{ examine: number }>();

  const stateKeys: Record<SuiviAction['state'], MessageKey> = {
    open: 'suivi.action.open',
    progress: 'suivi.action.progress',
    done: 'suivi.action.done'
  };

  function projectFor(action: SuiviAction): TrackedProject | undefined {
    return projects.find((project) => project.id === action.projectId);
  }

  function badgeClass(action: SuiviAction): string {
    if (action.state === 'done') return 'green';
    if (isOverdue(action.due)) return 'red';
    return 'amber';
  }
</script>

{#if actions.length === 0}
  <div class="empty">{$t('suivi.noActions')}</div>
{:else}
  {#each actions as action (action.id)}
    {@const project = projectFor(action)}
    <div class="decision">
      <span class="index">{String(action.id).padStart(2, '0')}</span>
      <div class="decision-body">
        <div class="spaced">
          <h3>{pickLang(action.title, $locale)}</h3>
          <span class="badge {badgeClass(action)}">{$t(stateKeys[action.state])}</span>
        </div>
        {#if project}
          <p>{project.name} · {pickLang(action.level, $locale)}</p>
        {/if}
        <div class="meta">
          {pickLang(action.owner, $locale)} · {$t('suivi.due')}
          {formatIsoDate(action.due, $locale)}
          {#if isOverdue(action.due) && action.state !== 'done'}
            · {$t('suivi.overdue')}
          {/if}
        </div>
        {#if !short}
          <p class="muted">{pickLang(action.effect, $locale)}</p>
        {/if}
        {#if action.note}
          <p><strong>{$t('suivi.decision')} :</strong> {action.note}</p>
        {/if}
        <button class="link-btn" type="button" on:click={() => dispatch('examine', action.id)}>
          {$t('suivi.examine')}
        </button>
      </div>
    </div>
  {/each}
{/if}

<style>
  .decision-body {
    flex: 1;
  }

  .link-btn {
    margin-top: 12px;
  }
</style>
